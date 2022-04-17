
import { deleteItemById, getItemById } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
 <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${item.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${item.brand}</li>
                    <li><span>Model:</span>${item.model}</li>
                    <li><span>Year:</span>${item.year}</li>
                    <li><span>Price:</span>${item.price}$</li>
                </ul>

                <p class="description-para">${item.description}</p>
                ${isOwner
        ? html`
                 <div class="listings-buttons">
                    <a href="/edit/${item._id}" class="button-list">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
                </div>`
        : nothing}
               
            </div>
        </section>
        `;

export async function detailsPage(ctx) {

    const id = ctx.params.id;
    const item = await getItemById(id);
    const userData = await getUserData();

    const isOwner = userData && item._ownerId == userData._id;

    ctx.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {

            await deleteItemById(id);
            ctx.page.redirect('/catalog');

        }
    }
}
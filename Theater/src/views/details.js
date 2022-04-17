
import { deleteItemById, getItemById } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${item.title}</h1>
                    <div>
                        <img src=${item.imageUrl}/>
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${item.description}</p>
                    <h4>Date: ${item.date}</h4>
                    <h4>Author: ${item.author}</h4>
                    <div class="buttons">
                        ${isOwner
                        ? html`
                        <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${item._id}">Edit</a>` 
                        : nothing}
                    </div>
                    <p class="likes">Likes: 0</p>
                </div>
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
            ctx.page.redirect('/');

        }
    }
}
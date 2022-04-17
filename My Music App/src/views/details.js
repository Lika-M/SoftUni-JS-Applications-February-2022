
import { deleteItemById, getItemById } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
  <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${item.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${item.name}</h1>
                        <h3>Artist: ${item.artist}</h3>
                        <h4>Genre: ${item.genre}</h4>
                        <h4>Price: $${item.price}</h4>
                        <h4>Date: ${item.releaseDate}</h4>
                        <p>${item.description}</p>
                    </div>
                    <!-- Only for registered user and creator of the album-->
                    ${isOwner
                    ? html` 
                    <div class="actionBtn">
                        <a href="/edit/${item._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>`
                    : nothing}
                   
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
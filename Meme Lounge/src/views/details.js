import { deleteItemById, getItemById } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html } from "../lib.js";

const detailsTemplate = (item, onDelete,  isOwner) => html`
<section id="meme-details">
    <h1>Meme Title: ${item.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${item.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${item.description}</p>
            ${isOwner ? html`
            <a class="button warning" href=${`/edit/${item._id}`}>Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>
            ` : null}
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {

    const id = ctx.params.id
    const item = await getItemById(id);
    const userData = await getUserData();

    if(userData){
        const isOwner = userData._id == item._ownerId;
        ctx.render(detailsTemplate(item, onDelete, isOwner));
    } else {
        ctx.render(detailsTemplate(item, onDelete));

    }


    function onDelete(ev) {
        ev.preventDefault();

        const choice = confirm('Are you sure?');

        if (choice) {
            deleteItemById(id);
            ctx.page.redirect('/')
        }

    }
}







import { deleteItemById, getItemById } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (item, isOwner, onDelete, user) => html`
       <section id="details-page" class="details">
            <div class="book-information">
                <h3>${item.title}</h3>
                <p class="type">Type: ${item.type}</p>
                <p class="img"><img src=${item.imageUrl}></p>
                <div class="actions">
 <!-- Edit/Delete buttons ( Only for creator of this book )  -->

                    ${isOwner
        ? html`<a class="button" href="/edit/${item._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
        : nothing}
                   
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    ${user && !isOwner
        ? html`<a class="button" href="/likes">Like</a>`
        : nothing}   
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>    
                         
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${item.description}</p>
            </div>
        </section>
        `;

export async function detailsPage(ctx) {

    const id = ctx.params.id;
    const item = await getItemById(id);
    const userData = await getUserData();

    const isOwner = userData && item._ownerId == userData._id;

    ctx.render(detailsTemplate(item, isOwner, onDelete, userData));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {

            await deleteItemById(id);
            ctx.page.redirect('/catalog');

        }
    }
}
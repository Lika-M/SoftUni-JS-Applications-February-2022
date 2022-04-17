
import { deleteItemById, getItemById } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${item.imageUrl} />
                    <h1>${item.title}</h1>
                    <span class="levels">MaxLevel: ${item.maxLevel}</span>
                    <p class="type">${item.category}</p>
                </div>

                <p class="text">
                   ${item.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        <li class="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li class="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                    <p class="no-comment">No comments.</p>
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${isOwner
        ? html`  
                <div class="buttons">
                    <a href="/edit/${item._id}" class="button">Edit</a>
                    <a href="javascript:void(0)" @click=${onDelete} class="button">Delete</a>
                </div>`
        : nothing}
              
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            <article class="create-comment">
                <label>Add new comment:</label>
                <form class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>

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
import { getMyItems } from '../api/data.js';
import { getUserData } from '../api/users.js';
import { html } from '../lib.js'

const profileTemplate = (items, userData) => html`
 <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            ${items.length > 0
        ? html`
            <ul class="my-books-list">
               ${items.map(itemTemplate)}
            </ul>`
        : html`
               <p class="no-books">No books in database!</p>`}
         
        </section>
    `;

const itemTemplate = (item) => html`
    <li li class="otherBooks" >
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li >
    `;

export async function profilePage(ctx) {
    const userData = await getUserData();
    const myItems = await getMyItems(userData._id);

    ctx.render(profileTemplate(myItems, userData));

}
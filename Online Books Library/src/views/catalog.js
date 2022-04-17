import { getAll } from "../api/data.js";
import { html } from "../lib.js"

const catalogTemplate = (items) => html`
 <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            ${items.length > 0
        ? html`
            <ul class="other-books-list">
               ${items.map(itemTemplate)}
            </ul>`
        : html`
               <p class="no-books">No books in database!</p>
               `}
            
            <!-- Display paragraph: If there are no books in the database -->
            
        </section>
`;

const itemTemplate = (item) => html`
 <li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>
`;
export async function catalogPage(ctx) {

    const items = await getAll();
    ctx.render(catalogTemplate(items))
}
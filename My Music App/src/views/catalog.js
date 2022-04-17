import { getAll } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html, nothing } from "../lib.js"

const catalogTemplate = (items, isUser) => html`
  <section id="catalogPage">
            <h1>All Albums</h1>
            <!--No albums in catalog-->

        ${items.length > 0
        ? items.map(i => itemTemplate(i, isUser))
        : html` <p>No Albums in Catalog!</p>`}
           
    </section>
`;

const itemTemplate = (item, isUser) => html`
<div class="card-box">
                <img src=${item.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${item.name}</p>
                        <p class="artist">Artist: ${item.artist}</p>
                        <p class="genre">Genre: ${item.genre}</p>
                        <p class="price">Price: $${item.price}</p>
                        <p class="date">Release Date: ${item.releaseDate}</p>
                    </div>

                    ${isUser
        ? html`
                     <div class="btn-group">
                        <a href="/details/${item._id}" id="details">Details</a>
                    </div>`
        : nothing}
                   
                </div>
            </div>
`;
export async function catalogPage(ctx) {

    const items = await getAll();
    const user = await getUserData();
    if(user){
        ctx.render(catalogTemplate(items, true));
    } else {
        ctx.render(catalogTemplate(items, false));
    }
}
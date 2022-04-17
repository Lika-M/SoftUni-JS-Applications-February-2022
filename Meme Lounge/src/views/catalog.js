import { getAll } from "../api/data.js";
import { html } from "../lib.js";


const catalogTemplate = (cards) => html`
  <section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : If there are no memes in database -->
    ${cards.length > 0
    ? cards.map(memeCard)
    : html` <p class="no-memes">No memes in database.</p>`}		
    </div>
</section>
`
const memeCard = (card) => html`
  <div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${card.title}</p>
                            <img class="meme-image" alt="meme-img" src=${card.imageUrl}>
                        </div>
                        <div id="data-buttons">
                            <a class="button" href=${`/details/${card._id}`}>Details</a>
                        </div>
                    </div>
                </div>
`;


export async function catalogPage(ctx){
    const memes = await getAll();
    ctx.render(catalogTemplate(memes))
   
}
import { getHomeItems } from "../api/data.js";
import { html } from "../lib.js"

const homeTemplate = (items) => html`
   <section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>

    <!-- Display div: with information about every game (if any) -->

    ${items.length > 0
        ? items.map(itemTemplate)
        : html`  

        <!-- Display paragraph: If there is no games  -->

    <p class="no-articles">No games yet</p>`}
   
</div>
</section>
`;

const itemTemplate = (item) => html`
  <div class="game">
        <div class="image-wrap">
            <img src=${item.imageUrl}>
        </div>
        <h3>${item.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>
`;

export async function homePage(ctx) {

    const items = await getHomeItems();
    ctx.render(homeTemplate(items));
}
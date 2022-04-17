import { getMyItems } from "../api/data.js";
import { getUserData } from "../api/users.js";
import { html } from "../lib.js";

const profileTemplate = (userItems, userData) => html`
 <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src=${`/images/${userData.gender}`}.png>
                <div class="user-content">
                    <p>Username: ${userData.userName}</p>
                    <p>Email: ${userData.email}</p>
                    <p>My memes count: ${userItems.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${userItems.length > 0
        ? userItems.map(itemTemplate)
        : html`<p p class="no-memes" > No memes in database.</p> `}
            </div>
        </section>

`;
const itemTemplate = (item) => html`
<div class="user-meme">
    <p class="user-meme-title">${item.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
    <a class="button" href=${`/details/${item._id}`}>Details</a>
</div>`


export async function profilePage(ctx) {
    const userData = await getUserData();
    console.log(userData);
    const id = userData._id;
    const userItems = await getMyItems(id); 

    ctx.render(profileTemplate(userItems, userData));
}
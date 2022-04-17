import { editItem, getItemById,  } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (onEdit, item) => html`
<section id="editPage">
            <form @submit=${onEdit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value=${item.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${item.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                    .value=${item.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description" .value=${item.description}></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    .value=${item.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
        `;


export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(editTemplate(onEdit, item));

    async function onEdit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const title = formData.get('title').trim();
        const date = formData.get('date').trim();
        const author = formData.get('author').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();

        if (title == '' || date == '' || author == ''
            || imageUrl == '' || description == '') {
            throw alert('All fields are required!')
        }
        await editItem(id,{
            title,
            date,
            author,
            imageUrl,
            description
          });
        
        ev.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }
}
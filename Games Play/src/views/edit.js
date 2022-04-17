import { editItem, getItemById, } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (onEdit, item) => html`
  <section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value=${item.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value=${item.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value=${item.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value=${item.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${item.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
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
        const category = formData.get('category').trim();
        const maxLevel = formData.get('maxLevel').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const summary = formData.get('summary').trim();

        if (title == '' || category == '' || maxLevel == ''
            || imageUrl == '' || summary == '') {
            return alert('All fields are required!')
        }
        await editItem(id, {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        });

        ev.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }
}
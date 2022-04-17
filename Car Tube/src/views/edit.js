import { editItem, getItemById,  } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (onEdit, item) => html`
  <section id="edit-listing">
            <div class="container">

                <form @submit=${onEdit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
        `;


export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(editTemplate(onEdit, item));

    async function onEdit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = formData.get('year').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const price = formData.get('price').trim();

        if (brand == '' || model == '' || description == ''
          || year ==''  || imageUrl == '' || price == '') {
            throw alert('All fields are required!')
        }

        await editItem(id,{
            brand,
            model,
            description,
            year: Number(year),
            imageUrl,
            price: Number(price)
          });
        
        ev.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }
}
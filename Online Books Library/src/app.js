import { getUserData, logout } from './api/users.js';
import { render } from './lib.js';
import { page } from './lib.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage)
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/profile', profilePage); 
page('/logout', onLogout)

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('#site-content'));
    ctx.updateUserNav = updateUserNav;
    next();
}

async function updateUserNav() {
    const user = getUserData();
    if (user) {
        Array.from(document.querySelectorAll('#user')).forEach(x => {
            x.style.display = 'inline-block';
        });
        Array.from(document.querySelectorAll('#guest')).forEach(x => {
            x.style.display = 'none';
        });
        document.querySelector('#user span').textContent = `Welcome, ${user.email}`;
    } else {
        Array.from(document.querySelectorAll('#user')).forEach(x => {
            x.style.display = 'none';
        });
        Array.from(document.querySelectorAll('#guest')).forEach(x => {
            x.style.display = 'inline-block';
        });
    }
}

    //logout
function onLogout(ctx){
    logout();
    updateUserNav();

    ctx.page.redirect('/catalog')
}
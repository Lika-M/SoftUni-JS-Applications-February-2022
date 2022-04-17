import { getUserData, logout } from './api/users.js';
import { render } from './lib.js';
import { page } from './lib.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

// test requests
// import * as api from './api/data.js'
// import * as api from './api/users.js'
// window.api = api;

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage );
page('/login', loginPage);
page('/register', registerPage);
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
    const user = await getUserData();
    if (user) {
        Array.from(document.querySelectorAll('#profile')).forEach(x => {
            x.style.display = 'block';
        });
        Array.from(document.querySelectorAll('#guest')).forEach(x => {
            x.style.display = 'none';
        });
        document.querySelector('#profile a').textContent = `Welcome ${user.username}`;
    } else {
        Array.from(document.querySelectorAll('#profile')).forEach(x => {
            x.style.display = 'none';
        });
        Array.from(document.querySelectorAll('#guest')).forEach(x => {
            x.style.display = 'block';
        });
    }
}

    //logout
function onLogout(ctx){
    logout();
    updateUserNav();

    ctx.page.redirect('/')
}
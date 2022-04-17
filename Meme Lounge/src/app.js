import { page } from "./lib.js";
import { createPage } from "./views/create.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { catalogPage } from "./views/catalog.js";
import { detailsPage } from "./views/details.js";
import { render } from "./lib.js";
import { profilePage } from "./views/profile.js";
import { registerPage } from "./views/register.js";
import { editPage } from "./views/edit.js";
import { getUserData, logout } from "./api/users.js";

page(decorateContext);
page("/", homePage);
page("/catalog", catalogPage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/details/:id", detailsPage);
page("/profile", profilePage);

updateUserNav()
page.start();


function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, document.querySelector('main'));
  ctx.updateUserNav = updateUserNav;
  next();
}


function updateUserNav() {
  const userData = getUserData();

  if (userData) {
    document.querySelector('.user').style.display = 'block';
    document.querySelector('.guest').style.display = 'none';
    document.querySelector('.user span').textContent = `Welcome, ${userData.email}`
  } else {
    document.querySelector('.user').style.display = 'none';
    document.querySelector('.guest').style.display = 'block';
  }
}
document.getElementById('logout').addEventListener('click', onLogout);

function onLogout() {
  logout();
  updateUserNav()
  page.redirect('/')
}

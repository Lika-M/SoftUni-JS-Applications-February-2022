import { login } from "../api/users.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit) => html`
 <section id="login">
            <form @submit=${onSubmit} id="login-form">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>
`;

export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

   async function onSubmit(ev){
        ev.preventDefault();
        
        const formData = new FormData(ev.target);
        const email = formData.get('email')
        const password = formData.get('password')
        
        if( email == '' || password == ''){
            ctx.page.redirect
            return alert('All field are required!')
        } else {
           await login(email, password);
            ctx.updateUserNav();
            ctx.page.redirect('/catalog')
        }
    
    }
}

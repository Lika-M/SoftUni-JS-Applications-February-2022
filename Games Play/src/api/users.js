import { get, post } from './api.js';

const endpoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout'
}

function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    localStorage.removeItem('userData');
}

//  register
async function register(email, password) {
    const result = await post(endpoints.register, { email, password});
    const userData = {
        _id: result._id,
        email: result.email,
        password: result.password,
        token: result.accessToken
    }
    setUserData(userData);
    return result;
}
//  login
async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    const userData = {
        _id: result._id,
        email: result.email,
        password: result.password,
        token: result.accessToken
    }
    setUserData(userData);
    return result;
}
//  logout
async function logout() {
    get(endpoints.logout);
    clearUserData();
}



export { login, logout, register, getUserData, setUserData, clearUserData, get }
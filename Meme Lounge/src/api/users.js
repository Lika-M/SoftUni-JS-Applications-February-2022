import { get, post } from './api.js';

const endpoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout'
}
//  register
async function register(userName, email, password, gender) {
    const result = await post(endpoints.register, { userName, email, password, gender });
    const userData = {
        _id: result._id,
        userName: result.username,
        email: result.email,
        gender: result.gender,
        token: result.accessToken
    }
    setUserData(userData);
    return result;
}
//  login
async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    debugger
    const userData = {
        _id: result._id,
        userName: result.username,
        email: result.email,
        gender: result.gender,
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

function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    localStorage.removeItem('userData');
}

export { login, logout, register, getUserData, setUserData, clearUserData, get }
import * as api from './api.js';
import * as users from './users.js';

export const login = users.login;
export const logout = users.logout;
export const register = users.register;

const endpoints = {
    home: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    // all: '/data/games?sortBy=_createdOn%20desc', 
    myItems: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    itemById: '/data/theaters/',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
}

async function getHomeItems(){
    return api.get(endpoints.home)
}

// async function getAll(){
//     return api.get(endpoints.all)
// }

async function getItemById(id){
    return api.get(endpoints.itemById + id);
}

async function getMyItems(userId){
    return api.get(endpoints.myItems(userId))
}

async function createItem(data){
    return api.post(endpoints.create, data);
}

async function editItem(id, data){
return api.put(endpoints.edit + id, data);
}

async function deleteItemById(id){
    return api.delete(endpoints.itemById + id);
}

export {
    getHomeItems,
    // getAll,
    getItemById,
    createItem,
    editItem,
    deleteItemById,
    getMyItems
}


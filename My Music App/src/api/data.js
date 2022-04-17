import * as api from './api.js';
import * as users from './users.js';

export const login = users.login;
export const logout = users.logout;
export const register = users.register;

const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc&distinct=name', 
    create: '/data/albums',
    itemById: '/data/albums/',
    edit: '/data/albums/',
    delete: '/data/albums/',
}

async function getAll(){
    return api.get(endpoints.all)
}

async function getItemById(id){
    return api.get(endpoints.itemById + id);
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
    getAll,
    getItemById,
    createItem,
    editItem,
    deleteItemById,
}


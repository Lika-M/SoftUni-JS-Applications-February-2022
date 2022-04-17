const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message); 
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {}
    };
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}

async function get(url) {
    return request(url, createOptions());
}

async function post(url, data) {
    return request(url, createOptions('POST', data));
}

async function put(url, data) {
    return request(url, createOptions('PUT', data))
}
async function del(url) {
    return request(url, createOptions('DELETE'))
}

export {
    get,
    post,
    put,
    del as delete
}



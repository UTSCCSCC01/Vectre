const config = require('../config')
const clientID = config.imgur.clientID
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

function upload(body) {
    if(!body.data) {
        throw {
            success: false, 
            message: "No data in request body"
        }
    }
    const { data } = body;
    const apiURL = 'https://api.imgur.com/3/image';
    return fetch(apiURL, {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': 'Client-ID ' + clientID
        }
    })
        .then(response => response.json())

}

function retrieve(body) {
    if(!body.imageURL) {
        throw {
            success: false,
            message: "No image URL in request body"
        }
    }
    const imgHash = getHash(body.imageURL);
    const apiURL = 'https://api.imgur.com/3/image/' + imgHash;
    return fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID ' + clientID
        }
    })
        .then(response => response.json())

}

function getHash(imageURL) {
    return imageURL.slice(20).replace(/\.[^/.]+$/, "");
}

module.exports = {
    upload,
    retrieve
};
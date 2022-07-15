const config = require('../config')
const clientID = config.imgur.clientID

function upload(imageData) {
    const apiURL = 'https://api.imgur.com/3/image';
    imageData = cleanImageData(imageData);
    return fetch(apiURL, {
        method: 'POST',
        body: imageData,
        headers: {
            'Authorization': 'Client-ID ' + clientID
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

function retrieve(body) {
    if (!body.imageURL) {
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
        .catch(error => console.log(error))
}

function getHash(imageURL) {
    return imageURL.slice(20).replace(/\.[^/.]+$/, "");
}

function cleanImageData(imageData) {
    const pngHeader = "data:image/png;base64,";
    const jpegHeader = "data:image/jpeg;base64,";

    if (imageData.startsWith(pngHeader)) {
        imageData = imageData.replace(pngHeader, "");
    } else if (imageData.startsWith(jpegHeader)) {
        imageData = imageData.replace(jpegHeader, "");
    } else {
        imageData = null;
    }

    return imageData;
}

module.exports = {
    upload,
    retrieve
};
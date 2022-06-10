var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');
const dbUtils = require('../utils/neo4j/dbUtils');
const {authenticateToken} = require("../utils/auth");
const { rest } = require('lodash');


// GET /users
router.get('/', (req, res, next) => {
    User.getAll(dbUtils.getSession(req))
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{wallet_address}
router.get('/:wallet_address', (req, res) => {
    User.getByWalletAddress(dbUtils.getSession(req), req.params.wallet_address)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/register
router.post('/register', (req, res) => {
    User.register(dbUtils.getSession(req), req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/login/nonce
router.post('/login/nonce', (req, res) => {
    User.getNonce(dbUtils.getSession(req), req.body.wallet_address)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{wallet_address/post
router.get('/:user_id/post', (req, res, next) => {
    const author = req.params.user_id;
    if (!author) throw {message: 'Invalid user id', status: 400, success: false};

    Post.getUserPosts(dbUtils.getSession(req), author)
    .then((result) => res.send(result))
    .catch((error) => res.send(error))


});
// POST /users/{wallet_address}/post
router.post('/:user_id/post', (req, res, next) => {
    const { author, text, imageURL, edited, timestamp } = req.body;

    console.log(req.body);

    if(!author || !text || !imageURL || !timestamp)
        throw {message: 'Invalid post properties', status: 400, success: false};

    res.send(Post.createUserPost(dbUtils.getSession(req), req))

})

// POST /users/login
router.post('/login', (req, res) => {
    const setTokenInCookie = (token) => { res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true })}
    User.login(dbUtils.getSession(req), req.body.wallet_address, req.body.signed_nonce, setTokenInCookie)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

module.exports = router;
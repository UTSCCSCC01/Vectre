var express = require('express');
var router = express.Router();

const User = require('../models/user'),
    Post = require('../models/post'),
    Notification = require('../models/notification');
const dbUtils = require('../utils/neo4j/dbUtils');
const { authenticateToken, storeWalletAddressFromToken } = require("../utils/auth");

// GET /users
router.get('/', (req, res, next) => {
    User.getAll(dbUtils.getSession(req))
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/funds
router.get('/funds', authenticateToken, (req, res) => {
    if (req.walletAddress) {
        User.getFunds(req.walletAddress)
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    } else {
        res.status(403).send({
            success: false,
            message: "You do not have access to get this User's wallet funds."
        })
    }
})

// GET /users/{walletAddress}
router.get('/:walletAddress', (req, res) => {
    User.getByWalletAddress(dbUtils.getSession(req), req.params.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/search/{searchVal}
router.get('/search/:searchVal', (req, res) => {
    User.search(dbUtils.getSession(req), req.params.searchVal)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{walletAddress}/nft
router.get('/:walletAddress/nft', (req, res) => {
    User.getNFT(req.params.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})
// GET /users/{walletAddress}/dashboard
router.get('/:walletAddress/dashboard', (req, res) => {
    User.getDashboard(dbUtils.getSession(req), req.params.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{walletAddress}/notifications
router.get('/:walletAddress/notifications', authenticateToken, (req, res, next) => {
    if (req.walletAddress === req.params.walletAddress) {
        Notification.getUserNotifications(dbUtils.getSession(req), req.params.walletAddress)
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    } else {
        res.status(403).send({
            success: false,
            message: "You do not have access to get this User's notifications"
        })
    }
});

// POST /users/register
router.post('/register', (req, res) => {
    const setTokenInCookie = (token) => { res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }) } // Expires in 7 days
    User.register(dbUtils.getSession(req), req.body, setTokenInCookie)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/login/nonce
router.post('/login/nonce', (req, res) => {
    User.getNonce(dbUtils.getSession(req), req.body.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{walletAddress}/posts
router.get('/:walletAddress/posts', storeWalletAddressFromToken, (req, res, next) => {
    // req.walletAddress is the walletAddress from the token
    // req.params.walletAddress is the walletAddress of another user of the profile the user (from token) is looking at
    Post.getPostsByUser(dbUtils.getSession(req), req.walletAddress, req.params.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});

// POST /users/login
router.post('/login', (req, res) => {
    const setTokenInCookie = (token) => { res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }) } // Expires in 7 days
    User.login(dbUtils.getSession(req), req.body.walletAddress, req.body.signedNonce, setTokenInCookie)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/updateDashboard
router.post('/:walletAddress/updateDashboard', (req, res) => {
    User.updateDashboard(dbUtils.getSession(req), req.params.walletAddress, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/login/currentUser
router.get('/login/currentUser', authenticateToken, (req, res) => {
    User.getByWalletAddress(dbUtils.getSession(req), req.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// PUT /users/{walletAddress}/update
router.put('/:walletAddress/update', authenticateToken, (req, res) => {
    if (req.walletAddress === req.params.walletAddress) {
        User.updateProfile(dbUtils.getSession(req), req.params.walletAddress, req.body)
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    } else {
        res.status(403).send({
            success: false,
            message: "You do not have access to update this User"
        })
    }
})

// DELETE /users/{walletAddress}/delete
router.delete('/:walletAddress/delete', authenticateToken, (req, res) => {
    if (req.walletAddress === req.params.walletAddress) {
        User.delete(dbUtils.getSession(req), req.walletAddress, req.params.walletAddress)
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    } else {
        res.status(403).send({
            success: false,
            message: "You do not have access to delete this User"
        })
    }
})

// GET /users/{walletAddress}/following
router.get('/:walletAddress/following', (req, res, next) => {
    User.getFollowing(dbUtils.getSession(req), req.params.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});
// GET /users/{walletAddress}/followers
router.get('/:walletAddress/followers', (req, res, next) => {
    User.getFollowers(dbUtils.getSession(req), req.params.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});
// POST /users/{walletAddressToFollow}/follow
router.post('/:walletAddressToFollow/follow', authenticateToken, (req, res, next) => {
    User.follow(dbUtils.getSession(req), req.walletAddress, req.params.walletAddressToFollow)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});
// POST /users/{walletAddressToUnfollow}/unfollow
router.post('/:walletAddressToUnfollow/unfollow', authenticateToken, (req, res, next) => {
    User.unfollow(dbUtils.getSession(req), req.walletAddress, req.params.walletAddressToUnfollow)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});

module.exports = router;
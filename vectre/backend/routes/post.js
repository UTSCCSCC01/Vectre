var express = require('express');
var router = express.Router();

const dbUtils = require('../utils/neo4j/dbUtils');
const Post = require('../models/post');
const { authenticateToken, storeWalletAddressFromToken } = require("../utils/auth");
const { rest } = require('lodash');

// POST /posts/create
router.post('/create', authenticateToken, (req, res, next) => {
    Post.createUserPost(dbUtils.getSession(req), req.walletAddress, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/{postID}/comment
router.post('/:postID/comment', authenticateToken, (req, res, next) => {
    Post.createUserComment(dbUtils.getSession(req), req.walletAddress, req.params.postID, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/{postID}/update
router.post('/:postID/update', authenticateToken, (req, res, next) => {
    Post.update(dbUtils.getSession(req), req.walletAddress, req.params.postID, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /posts/{postID}
router.get('/:postID', storeWalletAddressFromToken, (req, res, next) => {
    Post.getPostByID(dbUtils.getSession(req), req.walletAddress, req.params.postID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /posts/{postID}/comments
router.get('/:postID/comments', storeWalletAddressFromToken, (req, res, next) => {
    Post.getCommentsByPost(dbUtils.getSession(req), req.walletAddress, req.params.postID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /posts/{postID}/checkLike
router.get('/:postID/checkLike', authenticateToken, (req, res, next) => {
    Post.checkIfAlreadyLiked(dbUtils.getSession(req), req.params.postID, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/{postID}/like
router.post('/:postID/like', authenticateToken, (req, res, next) => {
    Post.likePost(dbUtils.getSession(req), req.params.postID, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/{postID}/unlike
router.post('/:postID/unlike', authenticateToken, (req, res, next) => {
    Post.unlikePost(dbUtils.getSession(req), req.params.postID, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /posts/{postID}/likes
router.get('/:postID/likes', authenticateToken, (req, res, next) => {
    Post.getLikesOnPost(dbUtils.getSession(req), req.params.postID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

module.exports = router;

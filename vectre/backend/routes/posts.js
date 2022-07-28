var express = require('express');
var router = express.Router();

const dbUtils = require('../utils/neo4j/dbUtils');
const Post = require('../models/post');
const { authenticateToken, storeWalletAddressFromToken } = require("../utils/auth");
const { upload } = require('../utils/images');
const { FEED_SORT } = require("../models/neo4j/post");

// Posts
// POST /posts/search
router.post('/search', storeWalletAddressFromToken, (req, res, next) => {
    Post.searchPosts(dbUtils.getSession(req), req.body, req.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})
// POST /posts/feed
router.post('/feed', storeWalletAddressFromToken, (req, res, next) => {
    const start = req.body.start ? req.body.start : 0,
        size = req.body.size ? req.body.size : 10,
        sortType = req.body.sort ? req.body.sort : FEED_SORT.TYPES.TIMESTAMP,
        sortOrder = req.body.order ? req.body.order : FEED_SORT.ORDER.DESC
    Post.getUserFeed(dbUtils.getSession(req), req.walletAddress, start, size, sortType, sortOrder)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/create
router.post('/create', authenticateToken, (req, res, next) => {
    if (req.body.imageData) {
        upload(req.body.imageData).then((result) => {
            if (!result.data.link) {
                throw {
                    success: false,
                    message: "Invalid image data"
                }
            }
            Post.createPost(dbUtils.getSession(req), req.walletAddress, req.body, result.data.link)
                .then((result) => res.send(result))
                .catch((error) => res.send(error))
        })
            .catch((error) => res.send("Image upload failed"));
    }
    else {
        Post.createPost(dbUtils.getSession(req), req.walletAddress, req.body, "")
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    }
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

// Post interactions (like/comment):
// Comment
// POST /posts/create/{postID}/comment
router.post('/create/:postID/comment', authenticateToken, (req, res, next) => {
    Post.createComment(dbUtils.getSession(req), req.walletAddress, req.params.postID, req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})
// GET /posts/{postID}/comments
router.get('/:postID/comments', storeWalletAddressFromToken, (req, res, next) => {
    Post.getCommentsByPost(dbUtils.getSession(req), req.walletAddress, req.params.postID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// Like
// POST /posts/{postID}/like
router.post('/:postID/like', authenticateToken, (req, res, next) => {
    Post.likePost(dbUtils.getSession(req), req.params.postID, req.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})
// POST /posts/{postID}/unlike
router.post('/:postID/unlike', authenticateToken, (req, res, next) => {
    Post.unlikePost(dbUtils.getSession(req), req.params.postID, req.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})
// GET /posts/{postID}/checkLike
router.get('/:postID/checkLike', authenticateToken, (req, res, next) => {
    Post.checkIfAlreadyLiked(dbUtils.getSession(req), req.params.postID, req.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})
// GET /posts/{postID}/likes
router.get('/:postID/likes', (req, res, next) => {
    Post.getLikesOnPost(dbUtils.getSession(req), req.params.postID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

module.exports = router;

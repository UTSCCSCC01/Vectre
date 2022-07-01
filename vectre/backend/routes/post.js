var express = require('express');
var router = express.Router();

const dbUtils = require('../utils/neo4j/dbUtils');
const Post = require('../models/post');
const { authenticateToken } = require("../utils/auth");
const { rest } = require('lodash');

// POST /posts/create
router.post('/create', authenticateToken, (req, res, next) => {
    Post.createUserPost(dbUtils.getSession(req), req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/{postID}/update
router.post('/:postID/update', authenticateToken, (req, res, next) => {
    if (req.walletAddress === req.body.author) {
        Post.update(dbUtils.getSession(req), req.params.postID, req.body)
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    } else {
        res.status(403).send({
            success: false,
            message: "You do not have access to update this Post"
        })
    }
})

// GET /posts/:walletAddress/feed
router.get('/:walletAddress/feed', authenticateToken, (req, res, next) => {
    const walletAddress = req.params.walletAddress
    const start = req.body.start? req.body.start : 0;
    const size = req.body.size? req.body.size : 10;
    Post.getUserFeed(dbUtils.getSession(req), walletAddress, start, size)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})


module.exports = router;

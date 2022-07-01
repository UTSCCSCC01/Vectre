var express = require('express');
var router = express.Router();

const dbUtils = require('../utils/neo4j/dbUtils');
const Post = require('../models/post');
const {authenticateToken} = require("../utils/auth");
const { rest } = require('lodash');

// POST /posts/create
router.post('/create', authenticateToken, (req, res, next) => {
    Post.createUserPost(dbUtils.getSession(req), req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /posts/{postID}/update
router.post('/:postID/update', authenticateToken, (req, res, next) => {
    if (req.wallet_address === req.body.author) {
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

// POST /posts/repost
router.post('/repost', authenticateToken, (req, res, next) => {
    Post.repostPost(dbUtils.getSession(req), req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

module.exports = router;

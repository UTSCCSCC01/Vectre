var express = require('express');
var router = express.Router();

const dbUtils = require('../neo4j/dbUtils');
const Post = require('../models/post');
const { rest } = require('lodash');


/* GET */

/* POST */

router.post('/update', (req, res, next) => {
    const { author, text, imageURL, edited, timestamp } = req.body;

    
    if(!author || !text || !imageURL || !timestamp)
        throw {message: 'Invalid post properties', status: 400, success: false};
    
    res.send(Post.updateUserPost(dbUtils.getSession(req), req))

})
/* PUT */


/* DELETE */


module.exports = router;

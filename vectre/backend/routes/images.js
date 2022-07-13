var express = require('express');
var router = express.Router();

const imgUtils = require('../utils/images');
const { authenticateToken } = require("../utils/auth");

// POST /images/upload
router.post('/upload', (req, res, next) => {
    imgUtils.upload(req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /images/retrieve
router.get('/retrieve', (req, res, next) => {
    imgUtils.retrieve(req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})


module.exports = router;

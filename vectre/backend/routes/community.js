var express = require('express');
var router = express.Router();

const Community = require('../models/community')
const dbUtils = require('../utils/neo4j/dbUtils');

// Temp
// POST /community/create
router.post('/create', (req, res, next) => {
    Community.createCommunity(dbUtils.getSession(req), req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/update
router.post('/:communityID/update', (req, res, next) => {
    Community.updateCommunity(dbUtils.getSession(req), req.params.communityID, req.body)
        .then(result => {
            console.log(req.body)
            res.send(result)
        })
        .catch(error => res.send(error))
})

// GET /community/get
router.get('/:communityID', (req, res, next) => {
    Community.getCommunity(dbUtils.getSession(req), req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

module.exports = router
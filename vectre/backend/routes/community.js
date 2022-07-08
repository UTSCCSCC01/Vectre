var express = require('express');
var router = express.Router();

const Community = require('../models/community')
const dbUtils = require('../utils/neo4j/dbUtils');

// Temp

// POST /community/userCreate       -- should go into user instead.
router.post('/:walletAddress/userCreate', (req, res, nex) => {
    Community.userCreate(dbUtils.getSession(req), req.params.walletAddress, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/update
router.post('/:communityID/update', (req, res, next) => {
    Community.update(dbUtils.getSession(req), req.params.communityID, req.body)
        .then(result => {
            res.send(result)
        })
        .catch(error => res.send(error))
})

// GET /community/get
router.get('/:communityID', (req, res, next) => {
    Community.get(dbUtils.getSession(req), req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

module.exports = router
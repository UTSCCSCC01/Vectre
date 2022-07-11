var express = require('express');
var router = express.Router();

const Community = require('../models/community')
const dbUtils = require('../utils/neo4j/dbUtils');

// Temp

// POST /community/:walletAddress/userCreate       -- should go into user instead.
router.post('/:walletAddress/userCreate', (req, res, nex) => {
    Community.userCreate(dbUtils.getSession(req), req.params.walletAddress, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/:communityID/userUpdate -- should go into user instead.
router.post('/:communityID/userUpdate', (req, res, next) => {
    const wallet = '0101'
    Community.userUpdate(dbUtils.getSession(req), wallet, req.params.communityID, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/join/:communityID
router.post('/:walletAddress/joins/:communityID', (req, res, next) => {
    Community.addMember(dbUtils.getSession(req), req.params.walletAddress, req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/:communityID/promote/:walletAddress
router.post('/:communityID/promote/:walletAddress', (req, res, next) => {
    
    Community.promoteMember(dbUtils.getSession(req), req.params.walletAddress, req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/:communityID/demote/:walletAddress
router.post('/:communityID/demote/:walletAddress', (req, res, next) => {
    Community.demoteModerator(dbUtils.getSession(req), req.params.walletAddress, req.params.communityID)
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(error => res.send(error))
})

// GET /community/getAll
router.get('/getAll', (req, res, next) => {
    Community.getAll(dbUtils.getSession(req))
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// GET /community/get/:communityID
router.get('/get/:communityID', (req, res, next) => {
    Community.get(dbUtils.getSession(req), req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// GET /community/getMembers/:communityID
router.get('/getMembers/:communityID', (req, res, next) => {
    Community.getRole(dbUtils.getSession(req), req.params.communityID, "member")
        .then(result => res.send(result))
        .catch(error => res.send(error))
})


module.exports = router
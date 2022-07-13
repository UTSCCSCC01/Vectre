var express = require('express');
var router = express.Router();

const Community = require('../models/community');
const { authenticateToken } = require('../utils/auth');
const dbUtils = require('../utils/neo4j/dbUtils');

// Temp

// POST /community/create
router.post('/create', authenticateToken, (req, res, nex) => {
    Community.userCreate(dbUtils.getSession(req), req.walletAddress, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/:communityID/update
router.post('/:communityID/update', authenticateToken, (req, res, next) => {
    Community.userUpdate(dbUtils.getSession(req), req.walletAddress, req.params.communityID, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/:communityID/join
router.post('/:communityID/join', authenticateToken, (req, res, next) => {
    Community.addMember(dbUtils.getSession(req), req.walletAddress, req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /community/:communityID/leave
router.post('/:communityID/leave', authenticateToken, (req, res, next) => {
    Community.removeMember(dbUtils.getSession(req), req.walletAddress, req.params.communityID)
        .then(result => { res.send(result) })
        .catch(error => res.send(error))
})

// GET /community/getAll
router.get('/getAll', (req, res, next) => {
    Community.getAll(dbUtils.getSession(req))
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// GET /community/:communityID
router.get('/:communityID', (req, res, next) => {
    Community.get(dbUtils.getSession(req), req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// In consideration
// GET /community/:communityID/:role
router.get('/:communityID/:role', (req, res, next) => {
    Community.getRole(dbUtils.getSession(req), req.params.communityID, req.params.role)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

module.exports = router
var express = require('express');
var router = express.Router();

const Community = require('../models/community');
const { authenticateToken } = require('../utils/auth');
const dbUtils = require('../utils/neo4j/dbUtils');

// Main
// POST /communities/create
router.post('/create', authenticateToken, (req, res, nex) => {
    Community.communityCreate(dbUtils.getSession(req), req.walletAddress, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /communities/:communityID/update
router.post('/:communityID/update', authenticateToken, (req, res, next) => {
    Community.communityUpdate(dbUtils.getSession(req), req.walletAddress, req.params.communityID, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /communities/:communityID/join
router.post('/:communityID/join', authenticateToken, (req, res, next) => {
    Community.addMember(dbUtils.getSession(req), req.walletAddress, req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /communities/:communityID/leave
router.post('/:communityID/leave', authenticateToken, (req, res, next) => {
    Community.removeMember(dbUtils.getSession(req), req.walletAddress, req.params.communityID)
        .then(result => { res.send(result) })
        .catch(error => res.send(error))
})

// GET /communities/getAll
router.get('/getAll', (req, res, next) => {
    Community.getAll(dbUtils.getSession(req))
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// GET /communities/:communityID
router.get('/:communityID', (req, res, next) => {
    Community.get(dbUtils.getSession(req), req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// GET /communities/:communityID/members/:walletAddress/roles
router.get("/:communityID/members/:walletAddress/roles", (req, res, next) => {
    Community.getRolesOfUsers(dbUtils.getSession(req), req.params.walletAddress, req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// In consideration
// GET /communities/:communityID/members
router.get('/:communityID/members', (req, res, next) => {
    Community.getUsersByRole(dbUtils.getSession(req), req.params.communityID, "member")
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

module.exports = router
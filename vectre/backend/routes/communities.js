var express = require('express');
var router = express.Router();

const Community = require('../models/community');
const { ROLES } = require("../models/neo4j/community");
const { authenticateToken } = require('../utils/auth');
const dbUtils = require('../utils/neo4j/dbUtils');

// POST /communities/feed
router.post('/:communityID/feed', authenticateToken, (req, res, next) => {
    const start = req.body.start ? req.body.start : 0,
        size = req.body.size ? req.body.size : 10,
        sortType = req.body.sort ? req.body.sort : "timestamp",
        sortOrder = req.body.order ? req.body.order : "desc"
    Community.getCommunityFeed(dbUtils.getSession(req), req.params.communityID, start, size, sortType, sortOrder)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /communities
router.get('/', (req, res, next) => {
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

// GET /users/search/{searchVal}
router.get('/search/:searchVal', (req, res) => {
    Community.search(dbUtils.getSession(req), req.params.searchVal)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

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

// GET /communities/:communityID/members/:walletAddress/roles
router.get("/:communityID/members/:walletAddress/roles", (req, res, next) => {
    Community.getRolesOfUsers(dbUtils.getSession(req), req.params.walletAddress, req.params.communityID)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// In consideration
// GET /communities/:communityID/members
router.get('/:communityID/members', (req, res, next) => {
    Community.getUsersByRole(dbUtils.getSession(req), req.params.communityID, ROLES.MEMBER.type)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

module.exports = router
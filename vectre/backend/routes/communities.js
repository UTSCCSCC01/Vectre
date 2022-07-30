var express = require('express');
var router = express.Router();

const Community = require('../models/community'),
    CommunityModerator = require('../models/communitymoderator')
const { ROLES, MODERATOR_ACTIONS } = require("../models/neo4j/community");
const { authenticateToken, storeWalletAddressFromToken } = require('../utils/auth');
const dbUtils = require('../utils/neo4j/dbUtils');
const { FEED_SORT } = require("../models/neo4j/post");

// POST /communities/feed
router.post('/:communityID/feed', storeWalletAddressFromToken, (req, res, next) => {
    const start = req.body.start ? req.body.start : 0,
        size = req.body.size ? req.body.size : 10,
        sortType = req.body.sort ? req.body.sort : FEED_SORT.TYPES.TIMESTAMP,
        sortOrder = req.body.order ? req.body.order : FEED_SORT.ORDER.DESC
    Community.getCommunityFeed(dbUtils.getSession(req), req.params.communityID, req.walletAddress, start, size, sortType, sortOrder)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /communities
router.get('/', (req, res, next) => {
    Community.getAll(dbUtils.getSession(req))
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// GET /communities/trending
router.get('/trending', storeWalletAddressFromToken, (req, res, next) => {
    Community.getTrending(dbUtils.getSession(req), req.walletAddress,0, 5)
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
router.get('/search/:searchVal', storeWalletAddressFromToken, (req, res) => {
    Community.search(dbUtils.getSession(req), req.params.searchVal, req.walletAddress)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /communities/create
router.post('/create', authenticateToken, (req, res, nex) => {
    Community.communityCreate(dbUtils.getSession(req), req.walletAddress, req.body)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// PUT /communities/:communityID/update
router.put('/:communityID/update', authenticateToken, (req, res, next) => {
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

// POST /communities/:communityID/promote/:walletAddress
router.post("/:communityID/promote/:walletAddress", authenticateToken, (req, res, next) => {
    CommunityModerator.moderationAction(dbUtils.getSession(req), req.params.communityID , req.walletAddress, req.params.walletAddress, MODERATOR_ACTIONS.PROMOTE)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /communities/:communityID/ban/:walletAddress
router.post("/:communityID/ban/:walletAddress", authenticateToken, (req, res, next) => {
    CommunityModerator.moderationAction(dbUtils.getSession(req), req.params.communityID , req.walletAddress, req.params.walletAddress, MODERATOR_ACTIONS.BAN)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /communities/:communityID/unban/:walletAddress
router.post("/:communityID/unban/:walletAddress", authenticateToken, (req, res, next) => {
    CommunityModerator.moderationAction(dbUtils.getSession(req), req.params.communityID , req.walletAddress, req.params.walletAddress, MODERATOR_ACTIONS.UNBAN)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

// POST /communities/:communityID/delete/:postID
router.post('/:communityID/delete/:postID', authenticateToken, (req, res, next) => {
    CommunityModerator.deletePost(dbUtils.getSession(req), req.params.communityID, req.walletAddress, req.params.postID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// In consideration
// GET /communities/:communityID/members
router.get('/:communityID/members', (req, res, next) => {
    Community.getUsersByRole(dbUtils.getSession(req), req.params.communityID, ROLES.MEMBER.type)
        .then(result => res.send(result))
        .catch(error => res.send(error))
})

module.exports = router
var express = require('express');
var router = express.Router();

const dbUtils = require('../utils/neo4j/dbUtils');
const Notification = require('../models/notification');
const { authenticateToken } = require("../utils/auth");

// POST /notifications/{notificationID}/read
router.post('/:notificationID/read', authenticateToken, (req, res, next) => {
    Notification.read(dbUtils.getSession(req), req.walletAddress, req.params.notificationID)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})


module.exports = router;

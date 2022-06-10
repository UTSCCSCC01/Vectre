var express = require('express');
var router = express.Router();

const User = require('../models/user');
const dbUtils = require('../utils/neo4j/dbUtils');
const {authenticateToken} = require("../utils/auth");

// GET /users
router.get('/', (req, res, next) => {
    User.getAll(dbUtils.getSession(req))
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{wallet_address}
router.get('/:wallet_address', (req, res) => {
    User.getByWalletAddress(dbUtils.getSession(req), req.params.wallet_address)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/register
router.post('/register', (req, res) => {
    User.register(dbUtils.getSession(req), req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/login/nonce
router.post('/login/nonce', (req, res) => {
    User.getNonce(dbUtils.getSession(req), req.body.wallet_address)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{wallet_address}/dashboard
router.get('/:wallet_address/dashboard', (req, res) => {
    const query =  `MATCH (user:User {wallet_address: "${req.params.wallet_address}" }) RETURN user.dashboard`;
    const session = dbUtils.getSession(req);

    session.run(query)
        .then((result) => {
            res.send(result.records);
        })
        .catch((error) => {
            console.error(error);
            res.send("Failed to get dashboard. Error: " + error);
        });
});

// POST /users/updateDashboard
router.post('/updateDashboard', (req, res) => {
    const query = `MATCH (user:User {wallet_address:"${req.body.wallet_address}"}) SET user.dashboard = "${req.body.dashboard}" RETURN user`;
    const session = dbUtils.getSession(req);

    session.run(query)
        .then((result) => {
            res.send(result.records);
        })
        .catch((error) => {
            console.error(error);
            res.send("Failed to update dashboard. Error: " + error);
        })
 });

// POST /users/login
router.post('/login', (req, res) => {
    const setTokenInCookie = (token) => { res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true })}
    User.login(dbUtils.getSession(req), req.body.wallet_address, req.body.signed_nonce, setTokenInCookie)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

module.exports = router;
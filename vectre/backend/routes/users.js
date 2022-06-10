var express = require('express');
var router = express.Router();

const dbUtils = require('../neo4j/dbUtils');
const User = require('../models/neo4j/user');
const { getUser, createUser, updateProfile } = require('../models/user');

/* GET */
router.get('/', (req, res, next) => {
    const query = "MATCH (user:User) RETURN user";
    const session = dbUtils.getSession(req);
    const users = []

    session.run(query)
        .then((results) => {
            results.records.forEach((record) => {
                users.push(new User(record.get('user')))
            });
            res.send(users);
        })
        .catch((error) => {
            console.error(error);
            res.send("Failed to get users. Error: " + error);
        });
});

/* POST */
router.post('/createUser', (req, res) => {
    const session = dbUtils.getSession(req);
    createUser(session, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
});

/* POST */
router.post('/getUser', (req, res) => {
    const session = dbUtils.getSession(req);
    getUser(session, req.body.wallet_address)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
});

/* PUT */
router.put('/', (req, res) => {
    res.send('Got a PUT request')
    console.log(req.body)
});

/* DELETE */
router.delete('/', (req, res) => {
    res.send('Got a DELETE request')
    console.log(req.body)
});

/* PUT /users/{wallet_address}/update */
router.put('/:wallet_address/update', (req, res) => {
    const session = dbUtils.getSession(req);
    const wallet_address = req.params.wallet_address;
    const updateInfo = req.body;
    updateProfile(session, wallet_address, updateInfo)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        })
})

module.exports = router;

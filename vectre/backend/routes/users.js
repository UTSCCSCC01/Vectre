var express = require('express');
var router = express.Router();

const dbUtils = require('../neo4j/dbUtils');
const User = require('../models/neo4j/user');
const Users = require('../models/users');

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
router.post('/create', (req, res) => {
    const query = `CREATE (user:User {id: '${req.body.id}', name: '${req.body.name}', wallet_address: '${req.body.wallet_address}'})`
    const session = dbUtils.getSession(req);

    session.run(query)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.error(error);
            res.send("Failed to create user. Error: " + error);
        });
});

/* PUT */
router.put('/', (req, res) => {
    res.send('Got a PUT request')
    console.log(req.body)
});

/* DELETE */
router.delete('/delete', (req, res) => {
    if (!req.body.wallet_address)
        res.send({success: false, message: "Invalid wallet address"})
    else {
        Users.deleteUser(dbUtils.getSession(req), req.body.wallet_address)
            .then(response => res.send({success: true, message: response}))
            .catch((error) => {
                console.error(error)
                res.send({success: false, message: "Failed to delete user"})
            })
    }
})

module.exports = router;

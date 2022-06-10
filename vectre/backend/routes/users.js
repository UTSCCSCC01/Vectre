var express = require('express');
var router = express.Router();

const dbUtils = require('../neo4j/dbUtils');
const User = require('../models/neo4j/user');

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

module.exports = router;

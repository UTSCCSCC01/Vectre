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

/* POST */
router.post('/getUser', (req, res) => {
    const query = `MATCH (user:User {wallet_address:"${req.body.wallet_address}"}) RETURN user;`
    const session = dbUtils.getSession(req);
    session.run(query)
        .then((results) => {
            let response_data = {}
            results.records.forEach((record) => {
                response_data = {
                    success: true,
                    message: "User wallet_address already exists.",
                    user_data: new User(record.get('user'))
                }
            });
            if (Object.keys(response_data).length === 0) {
                response_data = {
                    success: false,
                    message: "User wallet_address doesn't exist. Please register your account.",
                    user_data: null
                }
            }
            res.send(response_data);
        })
        .catch((error) => {
            console.error(error);
            const response_data = {
                success: false,
                message: "User wallet_address doesn't exist. Please register your account.",
                user_data: null
            }
            res.send(response_data);
        });
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

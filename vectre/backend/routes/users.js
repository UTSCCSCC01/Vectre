var express = require('express');
var router = express.Router();

const dbUtils = require('../neo4j/dbUtils');

/* GET */
router.get('/', (req, res, next) => {
    const query = "MATCH (n:User) RETURN n";
    const session = dbUtils.getSession(req);
    const users = [];

    session.run(query)
        .then((result) => {
            result.records.forEach((record) => {
                users.push(record._fields);
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
    const query = `CREATE (n:User {name: '${req.body.name}', walletId: '${req.body.wallet_address}'})`
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
router.delete('/', (req, res) => {
    res.send('Got a DELETE request')
    console.log(req.body)
});

module.exports = router;

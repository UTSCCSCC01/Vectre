var express = require('express');
var router = express.Router();

const dbUtils = require('../neo4j/dbUtils');

/* GET */
router.get('/', (req, res, next) => {
    const query = `MATCH (p:Person) RETURN p`;
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
            res.send("get request failed. Error: ", error);
        });
});

/* POST */
router.post('/', (req, res) => {
    res.send('Got a POST request')
    console.log(req.body)
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

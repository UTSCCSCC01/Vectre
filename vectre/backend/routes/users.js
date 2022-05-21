var express = require('express');
var router = express.Router();

/* GET */
router.get('/', (req, res, next) => {
  res.send('Got a GET request')
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

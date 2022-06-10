const config = require('../config');
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, config.jwt_secret_token, (error, wallet_address) => {
            if (error) return res.sendStatus(403) // Invalid token
            req.wallet_address = wallet_address
            next()
        })
    } else { // No token
        res.sendStatus(401)
    }
}

module.exports = {
    authenticateToken
}
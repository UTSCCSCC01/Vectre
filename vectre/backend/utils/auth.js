const config = require('../config');
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, config.jwtSecretToken, (error, walletAddress) => {
            if (error) // Invalid token
                return res.status(403).send({
                    success: false,
                    message: "Invalid token"
                })
            req.walletAddress = walletAddress
            next()
        })
    } else { // No token
        return res.status(401).send({
            success: false,
            message: "You are not logged in"
        })
    }
}

const storeWalletAddressFromToken = (req, res, next) => {
    req.walletAddress = null
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, config.jwtSecretToken, (error, walletAddress) => {
            if (!error) req.walletAddress = walletAddress
        })
    }
    next()
}

module.exports = {
    authenticateToken,
    storeWalletAddressFromToken
}
module.exports = function validateAuthorization(req, res, next) {
    const authHeader = req.headers["authorization"]
    if (authHeader) next() // User provided authorization, continue to function to validate
    else res.sendStatus(401)
}
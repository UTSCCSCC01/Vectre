const _ = require('lodash')
const User = require('./neo4j/user')
const jwt = require('jsonwebtoken')
const config = require('../config');

const getAll = (session) => { // Returns all Users
    const query = "MATCH (user:User) RETURN user";
    return session.run(query)
        .then((results) => {
            let users = []
            results.records.forEach((record) => {
                users.push(new User(record.get('user')))
            })
            return {success: true, users: users}
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get Users"
            }
        });
}

const getByWalletAddress = (session, wallet_address) => { // Return the first User node w/ wallet_address
    const query = `MATCH (user: User {wallet_address : '${wallet_address}'}) RETURN user`
    return session.run(query)
        .then((results) => {
            if (_.isEmpty(results.records)) {
                throw {
                    success: false,
                    message: `User with wallet address ${wallet_address} does not exist`
                }
            } else {
                return {
                    success: true,
                    user: new User(results.records[0].get('user'))
                }
            }
        }).catch((error) => {
            throw {
                success: false,
                message: "Failed to get User",
                error: error.message
            }
        })
}

const register = (session, body) => { // Creates User from body data
    const query = `CREATE (user:User {name: '${body.name}', username: '${body.username}', wallet_address: '${body.wallet_address}', bio: '${body.bio}', nonce: '${generateNonce()}'});`
    return session.run(query)
        .then((results) => {
            return {
                success: true,
                // user: new User(results.records[0].get('user'))
                message: "Created User"
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to create User",
                error: error.message
            }
        })
}

function generateNonce() {
    return Math.floor(Math.random() * 1000000);
}
const getNonce = (session, wallet_address) => { // Login User & get JWT authentication
    return getByWalletAddress(session, wallet_address)
        .then((response) => {
            if (response.success) {
                return {
                    success: true,
                    nonce: response.user.nonce,
                }
            } else {
                return response
            }
        })
        .catch((error) => {
            return error
        })
}
const login = (session, wallet_address, signed_nonce) => { // Login User & get JWT authentication
    return getByWalletAddress(session, wallet_address)
        .then((response) => {
            if (response.success) {
                // TODO: Validate signed_nonce. Then update nonce

                const accessToken = jwt.sign(wallet_address, config.jwt_secret_token)
                return {
                    success: true,
                    authorization_token: accessToken
                }
            } else {
                return response
            }
        })
        .catch((error) => {
            return response
        })
}

const update = (session, wallet, newUser) => {
    /* Update the user profile of the wallet owner using newUser.
     * newUser must be a user object similar to how neo4j stores user.
    */
    let userString = JSON.stringify(newUser)
    let unquoteString = userString.replace(/"([^"]+)":/g, '$1:')
    const modify = `MATCH (u: User {wallet_address: \"${wallet}\"}) SET u = ${unquoteString} RETURN u`

    return session
        .run(modify)
        .then(results => {
            if (_.isEmpty(results.records)) {
                return { success: false }
            }
            return { success: true }
        })
}

module.exports = {
    getAll,
    getByWalletAddress,
    register,
    getNonce,
    login,
    update,
}
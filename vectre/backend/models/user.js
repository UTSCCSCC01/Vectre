const _ = require('lodash')
const User = require('./neo4j/user')
const config = require('../config');
const jwt = require('jsonwebtoken')
const ethUtil = require('ethereumjs-util')

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
function validateSignedNonce(wallet_address, nonce, signed_message) {
    const message = `Hi from Vectre! Sign this message to prove you have access to this wallet in order to log in.\n\nUnique ID: ${nonce}`

    // Elliptic curve signature verification
    const msgHex = ethUtil.bufferToHex(Buffer.from(message))
    const msgBuffer = ethUtil.toBuffer(msgHex)
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer)
    const signatureBuffer = ethUtil.toBuffer(signed_message)
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer)
    const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
    )
    const addressBuffer= ethUtil.publicToAddress(publicKey)
    const address = ethUtil.bufferToHex(addressBuffer)

    return address.toLowerCase() === wallet_address.toLowerCase()
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
        .catch((error) => { return error })
}
const login = (session, wallet_address, signed_nonce) => { // Login User & get JWT authentication
    return getByWalletAddress(session, wallet_address)
        .then((response) => {
            if (response.success) {
                // Validate signed_nonce. Then update nonce
                return getNonce(session, wallet_address)
                    .then((response) => {
                        if (response.success) {
                            if(validateSignedNonce(wallet_address, response.nonce, signed_nonce)) {
                                const accessToken = jwt.sign(wallet_address, config.jwt_secret_token)

                                // TODO: Regenerate nonce

                                return {
                                    success: true,
                                    authorization_token: accessToken
                                }
                            } else {
                                throw {
                                    success: false,
                                    message: "Signature validation was invalid"
                                }
                            }
                        } else {
                            return response
                        }
                    })
                    .catch((error) => { return error })
            } else {
                return response
            }
        })
        .catch((error) => { return error })
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
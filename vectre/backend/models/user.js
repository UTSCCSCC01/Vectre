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
            return { success: true, users: users }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get Users"
            }
        });
}

const getByWalletAddress = (session, walletAddress) => {
    /**
     * RReturn the first User node w/ walletAddress
     *
     * @param neo4j session
     * @param wallet address of the user for searching
     * @returns an object with a boolean field 'success', field 'user' that holds the user object, and field 'message'.
     */
    const query = `MATCH (user: User {walletAddress : '${walletAddress}'}) RETURN user`
    return session.run(query)
        .then((results) => {
            if (_.isEmpty(results.records)) {
                throw {
                    success: false,
                    message: `User with wallet address ${walletAddress} does not exist`
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
    const bio = body.bio ? body.bio : ""
    const query = `CREATE (user:User {name: '${body.name}', username: '${body.username}', walletAddress: '${body.walletAddress}', bio: '${bio}', nonce: '${generateNonce()}'});`
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
function validateSignedNonce(walletAddress, nonce, signedMessage) {
    const message = `Hi from Vectre! Sign this message to prove you have access to this wallet in order to log in.\n\nUnique ID: ${nonce}`

    // Elliptic curve signature verification
    const msgHex = ethUtil.bufferToHex(Buffer.from(message))
    const msgBuffer = ethUtil.toBuffer(msgHex)
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer)
    const signatureBuffer = ethUtil.toBuffer(signedMessage)
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer)
    const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
    )
    const addressBuffer = ethUtil.publicToAddress(publicKey)
    const address = ethUtil.bufferToHex(addressBuffer)

    return address.toLowerCase() === walletAddress.toLowerCase()
}
const getNonce = (session, walletAddress) => { // Login User & get JWT authentication
    return getByWalletAddress(session, walletAddress)
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
const login = (session, walletAddress, signedNonce, setTokenInCookie) => { // Login User & get JWT authentication
    return getByWalletAddress(session, walletAddress)
        .then((response) => {
            if (response.success) {
                // Validate signedNonce. Then update nonce
                return getNonce(session, walletAddress)
                    .then((response) => {
                        if (response.success) {
                            if (validateSignedNonce(walletAddress, response.nonce, signedNonce)) {
                                const accessToken = jwt.sign(walletAddress, config.jwtSecretToken)

                                // TODO: Regenerate nonce
                                setTokenInCookie(accessToken)

                                return {
                                    success: true,
                                    authorizationToken: accessToken
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

const updateUser = function (session, wallet, filter, newUser) {
    /**
     * Update the user object with matching `wallet` on Neo4j using fields from
     * `newUser` after being filtered by `filter`.
     *
     * @param neo4j session.
     * @param wallet address of the user.
     * @param array containing string of keys to modify on Neo4j.
     * @param object containing new information, should contain keys in `filter`.
     * @returns an object with a boolean field 'success' and field 'message'.
     */

    // Apply filter to newUser
    const filteredUser = Object.fromEntries(Object.entries(newUser).
        filter(([key, value]) => filter.includes(key)))

    // Check for existence of required fields.
    for (let filterName of filter) {
        if (!(filterName in newUser)) throw { success: false, message: `Missing field ${f}.` }
        if (typeof filterName !== 'string') throw { success: false, message: `Field ${f} is not String.` }
    }

    // Check for non empty fields
    const nonEmpty = ["username", "name"]
    for (let f of nonEmpty) {
        if ((f in newUser) && newUser[f] == "") {
            throw { success: false, message: `Field ${f} is empty.` }
        }
    }

    const userString = JSON.stringify(filteredUser).replace(/"([^"]+)":/g, '$1:')
    const query = `MATCH (u: User { walletAddress : \"${wallet}\"})
        SET u += ${userString}
        RETURN u`

    // Apply changes to Neo4j
    return session.run(query)
        .then(results => {
            if (_.isEmpty(results.records)) {
                return {
                    success: false,
                    message: "Edit failed, wallet does not exist."
                }
            }
            return {
                success: true,
                message: "Edit success."
            }
        }).catch(error => { throw error })
}

const updateProfile = function (session, wallet, newProf) {
    /**
     * Update the user profile of the wallet owner using newProf object.
     *
     * @param neo4j session.
     * @param wallet address of the user.
     * @param object containing new profile, must include following fields: name, username, bio.
     * @returns an object with a boolean field 'success' and field 'message' if success is false.
     */
    const searchUsernameQuery = `MATCH (u: User) 
        WHERE u.username = \"${newProf.username}\" 
        AND (NOT u.walletAddress = \"${wallet}\") RETURN u`;
    return session.run(searchUsernameQuery)
        .then(existence => {
            if (!_.isEmpty(existence.records)) { // Check for existing username
                return { success: false, message: "Username already exists." }
            } else {
                const profileFilter = ["name", "username", "bio"]
                return updateUser(session, wallet, profileFilter, newProf)
                    .then(response => { return response })
                    .catch(error => { throw error })
            }
        })
        .catch(error => {
            throw {
                success: false,
                error: error.message,
                message: "Error while editing. Please try again."
            }
        })
}

const deleteUser = (session, walletAddress) => {
    const query = `MATCH (user:User {walletAddress: '${walletAddress}'}) DETACH DELETE user`
    return session.run(query)
        .then((results) => {
            return {
                success: true,
                message: "Deleted User"
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to delete User",
                error: error.message
            }
        })
}

module.exports = {
    getAll,
    getByWalletAddress,
    register,
    getNonce,
    login,
    updateProfile,
    delete: deleteUser,
}
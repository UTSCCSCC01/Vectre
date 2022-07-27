const _ = require('lodash')
const User = require('./neo4j/user')
const Community = require('./neo4j/community')
const Notification = require('../models/notification');
const config = require('../config');
const jwt = require('jsonwebtoken')
const ethUtil = require('ethereumjs-util');
const imgUtils = require('../utils/images')

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
                message: "Failed to get users",
                error: error.message
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
    const query = `MATCH (user: User {walletAddress : $walletAddress}) RETURN user`
    return session.run(query, {
        walletAddress: walletAddress
    })
        .then((results) => {
            if (_.isEmpty(results.records)) {
                throw {
                    success: false,
                    message: `User does not exist`
                }
            } else {
                let user = new User(results.records[0].get('user'))

                return getFollowing(session, walletAddress)
                    .then((followingResult) => {
                        user.following = followingResult.following
                        return getFollowers(session, walletAddress)
                            .then((followerResult) => {
                                user.followers = followerResult.followers
                                return getCommunitiesByUser(session, walletAddress)
                                    .then((communitiesResult) => {
                                        user.communities = communitiesResult.communities
                                        return {
                                            success: true,
                                            user: user
                                        }
                                    })
                            })
                    })
            }
        }).catch((error) => {
            throw {
                success: false,
                message: "Failed to get user",
                error: error.message
            }
        })
}

const search = (session, searchVal) => {
    const regex = `(?i).*${searchVal}.*`
    const query = [
        `MATCH (user: User)`,
        `WHERE user.username =~ $regex OR user.name =~ $regex`,
        searchVal.toLowerCase().startsWith("0x") ? `OR user.walletAddress =~ $regex` : "", // only search wallet if starts w/ 0x
        `OPTIONAL MATCH (user)<-[f:FOLLOWS]-(follower: User)`,
        `RETURN user, count(f) as followerCount`
    ].join('\n');
    return session.run(query, {
        regex: regex
    })
        .then((results) => {
            let users = []
            results.records.forEach((record) => {
                let user = new User(record.get('user'))
                user.followerCount = record.get("followerCount").low

                users.push(user)
            })
            return {
                success: true,
                users: users
            }
        }).catch((error) => {
            throw {
                success: false,
                message: "Failed to search users",
                error: error.message
            }
        })
}

const register = (session, body, setTokenInCookie) => { // Creates User from body data
    if (!(/^[0-9a-zA-Z_.-]+$/.test(body.username))) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "Username can only contain letters, numbers, dashes, underscores, or periods"
            })
        })
    } else if (body.username.length > 32) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "Username must be less than 32 characters"
            })
        })
    } else if (body.name.length > 32) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "Name must be less than 32 characters"
            })
        })
    } else if (body.bio.length > 500) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "Bio must be less than 500 characters"
            })
        })
    } else {
        const query = `CREATE (user:User {name: $name, username: $username, walletAddress: $walletAddress, bio: $bio, nonce: $nonce});`
        return session.run(query, {
            name: body.name,
            username: body.username,
            walletAddress: body.walletAddress,
            bio: body.bio ? body.bio : "",
            nonce: generateNonce()
        })
            .then((results) => {
                const accessToken = jwt.sign(body.walletAddress, config.jwtSecretToken)
                setTokenInCookie(accessToken)

                return {
                    success: true,
                    message: "Created user"
                }
            })
            .catch((error) => {
                if (error.message.includes("already exists with label `User` and property `username`")) {
                    throw {
                        success: false,
                        message: "Username already in use"
                    }
                }
                throw {
                    success: false,
                    message: "Failed to create user",
                    error: error.message
                }
            })
    }
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
                                setTokenInCookie(accessToken)

                                // Regenerate nonce
                                const regenerateNonceQuery = `MATCH (u: User {walletAddress: $walletAddress}) SET u.nonce = $nonce`
                                session.run(regenerateNonceQuery, {
                                    walletAddress: walletAddress,
                                    nonce: generateNonce()
                                })

                                return {
                                    success: true,
                                    message: "Successfully logged in"
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

const updateUser = function (session, walletAddress, filter, newUser) {
    /**
     * Update the user object with matching `walletAddress` on Neo4j using fields from
     * `newUser` after being filtered by `filter`.
     *
     * @param neo4j session.
     * @param walletAddress address of the user.
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
        if ((f in newUser)) {
            if (newUser[f] == "") {
                throw { success: false, message: `Field ${f} is empty.` }
            }

            if (f === "username") {
                let username = newUser[f]
                if (!(/^[0-9a-zA-Z_.-]+$/.test(username))) {
                    throw {
                        success: false,
                        message: "Username can only contain letters, numbers, dashes, underscores, or periods"
                    }
                } else if (username.length > 32) {
                    throw {
                        success: false,
                        message: "Username must be less than 32 characters"
                    }
                }
            } else if (f === "name") {
                let name = newUser[f]
                if (name.length > 32) {
                    throw {
                        success: false,
                        message: "Name must be less than 32 characters"
                    }
                }
            }
        }
    }

    if (newUser["bio"] != "" && newUser["bio"].length > 500) {
        throw {
            success: false,
            message: "Bio must be less than 500 characters"
        }
    }

    const query = `MATCH (u: User {walletAddress: $walletAddress})
        SET u += $filteredUser
        RETURN u`

    // Apply changes to Neo4j
    return session.run(query, {
        walletAddress: walletAddress,
        filteredUser: filteredUser
    })
        .then(results => {
            if (_.isEmpty(results.records)) {
                return {
                    success: false,
                    message: "Edit failed, wallet does not exist"
                }
            }
            return {
                success: true,
                message: "Edit success"
            }
        })
        .catch(error => {
            console.log(error)
            throw {
                success: false,
                message: "Failed to update user",
                error: error.message
            }
        })
}

const updateProfile = function (session, walletAddress, newProf, profilePicLink, bannerLink) {
    /**
     * Update the user profile of the wallet owner using newProf object.
     *
     * @param neo4j session.
     * @param walletAddress address of the user.
     * @param object containing new profile, must include following fields: name, username, bio.
     * @returns an object with a boolean field 'success' and field 'message' if success is false.
     */
    const searchUsernameQuery = `MATCH (u: User) 
        WHERE u.username = $newUsername 
        AND (NOT u.walletAddress = $walletAddress) RETURN u`;
    return session.run(searchUsernameQuery, {
        newUsername: newProf.username,
        walletAddress: walletAddress
    })
        .then(existence => {
            if (!_.isEmpty(existence.records)) { // Check for existing username
                return { success: false, message: "Username already exists." }
            } else {
                let profileFilter = ["name", "username", "bio"]
                if (profilePicLink != "") {
                    newProf.profilePic = profilePicLink;
                    profileFilter.push("profilePic")
                }
                if (bannerLink != "") {
                    newProf.banner = bannerLink;
                    profileFilter.push("banner")
                }
                return updateUser(session, walletAddress, profileFilter, newProf)
                    .then(response => { return response })
                    .catch(error => { throw error })
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: "Could not update user",
                error: error.message,
            }
        })
}

const deleteUser = (session, walletAddress) => {
    const query = `MATCH (user:User {walletAddress: $walletAddress}) DETACH DELETE user`
    return session.run(query, {
        walletAddress: walletAddress
    })
        .then((results) => {
            return {
                success: true,
                message: "Deleted user"
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to delete user",
                error: error.message
            }
        })
}

const getFollowing = (session, walletAddress) => { // Returns list of Users followed by User w/ walletAddress
    const query = `MATCH (u: User)-[r:FOLLOWS]->(followed: User) WHERE u.walletAddress=$walletAddress RETURN followed`;
    return session.run(query, {
        walletAddress: walletAddress
    })
        .then((results) => {
            let users = []
            results.records.forEach((record) => {
                users.push(new User(record.get('followed')))
            })
            return {
                success: true,
                following: users
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get followed users",
                error: error.message
            }
        });
}
const getFollowers = (session, walletAddress) => { // Returns list of Users following User w/ walletAddress
    const query = `MATCH (u: User)<-[r:FOLLOWS]-(following: User) WHERE u.walletAddress=$walletAddress RETURN following`;
    return session.run(query, {
        walletAddress: walletAddress
    })
        .then((results) => {
            let users = []
            results.records.forEach((record) => {
                users.push(new User(record.get('following')))
            })
            return {
                success: true,
                followers: users
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get following users",
                error: error.message
            }
        })
}
const followUser = (session, walletAddress, walletAddressToFollow) => {
    if (walletAddress !== walletAddressToFollow) {
        const query = `MATCH (a:User), (b:User)
        WHERE a.walletAddress=$walletAddress AND b.walletAddress=$walletAddressToFollow
        CREATE (a)-[r:FOLLOWS]->(b)`;

        const queryExist = `MATCH (a:User{walletAddress: $walletAddress})-[r:FOLLOWS]->(b:User{walletAddress: $walletAddressToFollow}) RETURN r`;

        return session.run(queryExist, {
            walletAddress: walletAddress,
            walletAddressToFollow: walletAddressToFollow,
        })
            .then((exist) => {
                if (!_.isEmpty(exist.records)) {
                    throw {
                        success: false,
                        message: "You already follow this user"
                    }
                } else {
                    return session.run(query, {
                        walletAddress: walletAddress,
                        walletAddressToFollow: walletAddressToFollow,
                    })
                        .then((result) => {
                            return Notification.create(session, "follow", walletAddressToFollow, walletAddress, null)
                                .then((result2) => {
                                    return {
                                        success: true,
                                        message: "Successfully followed user",
                                    }
                                })
                        })
                }
            })
            .catch((error) => {
                throw {
                    success: false,
                    message: "Failed to follow user",
                    error: error.message
                }
            })
    } else {
        throw {
            success: false,
            message: "Cannot follow yourself"
        }
    }
}
const unfollowUser = (session, walletAddress, walletAddressToUnfollow) => {
    if (walletAddress !== walletAddressToUnfollow) {
        const query = `MATCH (a:User{walletAddress: $walletAddress})-[r:FOLLOWS]->(b:User{walletAddress: $walletAddressToUnfollow}) DELETE r`;

        const queryExist = `MATCH (a:User{walletAddress: $walletAddress})-[r:FOLLOWS]->(b:User{walletAddress: $walletAddressToUnfollow}) RETURN r`;

        return session.run(queryExist, {
            walletAddress: walletAddress,
            walletAddressToUnfollow: walletAddressToUnfollow,
        })
            .then((exist) => {
                if (_.isEmpty(exist.records)) {
                    throw {
                        success: false,
                        message: "You do not follow this user"
                    }
                } else {
                    return session.run(query, {
                        walletAddress: walletAddress,
                        walletAddressToUnfollow: walletAddressToUnfollow,
                    })
                        .then((results) => {
                            return {
                                success: true,
                                message: "Successfully unfollowed user"
                            }
                        })
                }
            })
            .catch((error) => {
                throw {
                    success: false,
                    message: "Failed to unfollow user",
                    error: error.message
                }
            })
    } else {
        throw {
            success: false,
            message: "Cannot unfollow yourself"
        }
    }
}

const getNFT = (walletAddress) => { // Gets all NFTs of a User using OpenSea API.
    return fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=20&include_orders=false`)
        .then(res => {
            if (res.status !== 200) {
                throw {
                    success: false,
                    message: "Failed to retrieve NFTs"
                }
            }
            return res.json()
        })
        .then(json => {
            if (_.isEmpty(json.assets)) {
                return { // User has no NFTs
                    success: true,
                    nft: [],
                    message: "User has no NFTs"
                }
            }

            var asset_list = [];
            for (let i = 0; i < json.assets.length; i++) {
                var jsonObj = {
                    tokenID: json.assets[i].id,
                    name: json.assets[i].asset_contract.name, //change 'asset_contract.name' -> 'name' once OpenSea Mainnet API is received.
                    imageURL: json.assets[i].image_url,
                    contractAddress: json.assets[i].asset_contract.address,
                }
                asset_list.push(jsonObj);
            }

            return {
                success: true,
                nft: asset_list,
                message: `Successfully retrieved user's NFTs`
            }
        }).catch((error) => {
            throw {
                success: false,
                message: "Failed to get user's NFTs",
                error: error.message
            }
        })
}

const getFunds = (walletAddress) => { // Gets the wallet funds of a User using Etherscan API.
    return fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${config.etherscanToken}`)
        .then(res => {
            if (res.status !== 200) {
                throw {
                    success: false,
                    message: "Failed to retrieve wallet funds."
                }
            }
            return res.json()
        })
        .then(json => {
            if (json.status == 0) {
                return { // failed EtherscanAPI call
                    success: false,
                    error: json.message,
                    message: json.message,
                }
            }
            var walletFunds = json.result / Math.pow(10, 18);
            if (walletFunds !== 0) {
                walletFunds = walletFunds.toFixed(3);
            }
            return {
                success: true,
                funds: walletFunds,
                message: `Successfully retrieved user's wallet funds`
            }
        }).catch((error) => {
            throw {
                success: false,
                message: "Failed to get user's wallet funds",
                error: error.message
            }
        })
}

const updateDashboard = (session, walletAddress, body) => {  // Sets the NFTs in the dashboard of a User.
    const query = `MATCH (user:User {walletAddress: $walletAddress}) SET user.dashboard = $dashboard RETURN user`;
    return session.run(query, {
        walletAddress: walletAddress,
        dashboard: body.dashboard
    })
        .then((results) => {
            if (_.isEmpty(results.records)) {
                throw {
                    success: false,
                    message: `User with wallet address ${walletAddress} does not exist`
                }
            } else {
                return {
                    success: true,
                    user: new User(results.records[0].get('user')),
                    message: `Successfully updated dashboard!`
                }
            }
        }).catch((error) => {
            throw {
                success: false,
                message: "Failed to update Dashboard.",
                error: error.message
            }
        })
}

const getCommunitiesByUser = function (session, walletAddress) {
    const query = [
        'MATCH (:User{walletAddress:$walletAddress})-[:JOINS]->(community:Community)',
        'RETURN community'
    ].join("\n")

    return session.run(query, { walletAddress: walletAddress })
        .then(result => {
            if (_.isEmpty(result.records)) {
                return {
                    success: true,
                    communities: []
                }
            } else {
                let communities = []
                result.records.forEach(record => {
                    communities.push(new Community(record.get('community')))
                })
                return {
                    success: true,
                    communities: communities
                }
            }
        }).catch(error => {
            throw {
                success: false,
                message: "Failed to retrieve communities that the user is a member of.",
                error: error.message
            }
        })
}

module.exports = {
    getAll,
    getByWalletAddress,
    search,
    register,
    getNonce,
    login,
    updateUser,
    updateProfile,
    delete: deleteUser,
    getFollowing,
    getFollowers,
    follow: followUser,
    unfollow: unfollowUser,
    getNFT,
    updateDashboard,
    getCommunitiesByUser,
    getFunds,
}
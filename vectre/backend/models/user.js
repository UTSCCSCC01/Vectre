const _ = require('lodash')
const User = require('./neo4j/user')

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

const create = (session, body) => { // Creates User from body data
    const query = `CREATE (user:User {name: '${body.name}', username: '${body.username}', wallet_address: '${body.wallet_address}', bio: '${body.bio}'});`
    return session.run(query)
        .then((results) => {
            return {
                success: true,
                user: new User(results.records[0].get('user'))
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
    getAll: getAll,
    getByWalletAddress: getByWalletAddress,
    register: create,
    update: update
}
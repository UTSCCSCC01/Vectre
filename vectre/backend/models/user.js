const _ = require('lodash')
const User = require('./neo4j/user')

// use auto commit transaction for simplicity.

const createUser = function (res, session, body) {
    /* Creates the user with the following information from body
    */
    const query = `CREATE (user:User {name: '${body.name}', username: '${body.username}', wallet_address: '${body.wallet_address}', bio: '${body.bio}'});`

    session.run(query)
        .then((results) => {
            res.send({
                success: true,
                message: "User created sucessfully.",
            });
        })
        .catch((error) => {
            res.send({
                success: false,
                message: "Failed to create user",
                error: error.message
            });
        });
}

const getUser = function (res, session, wallet) {
    /* Return the first user object with matching wallet.
    */
    const findQuery = `MATCH (user: User {wallet_address : '${wallet}'}) RETURN user`
    session.run(findQuery)
        .then((results) => {
            if (_.isEmpty(results.records)) {
                res.send({ success: false, user_data: null, message: "User wallet_address doesn't exist. Please register your account." })
            }
            else {
                res.send({ success: true, message: "User wallet_address already exists.", user_data: new User(results.records[0].get('user')) })
            }
        }).catch((error) => {
            res.send({ success: false, error: error.message, user_data: null, message: "Error while searching. Please try again." })
        })
}

const updateUser = function (session, wallet, newUser) {
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
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser
}
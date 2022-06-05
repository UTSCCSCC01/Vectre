const _ = require('lodash')
const User = require('./neo4j/user')

// use auto commit transaction for simplicity.

const getUser = function (session, wallet) {
    /* Return the first user object with matching wallet.
    */
    const findQuery = `MATCH (u: User {wallet_address : \"${wallet}\"}) RETURN u`
    
    return session
        .run(findQuery)
        .then(results => {
            if (_.isEmpty(results.records)) {
                return { success: false, user: null, message: "User does not exist"}
            }
            else {
                return { success: true, user: new User(results.records[0].get('u')) }
            }
        }).catch((error) => {
            console.log(error)
            return { success: false, error: true, user: null, message: "Error while searching"}
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
                return {success: false}
            }
            return {success: true}
        })
}

module.exports = {
    getUser : getUser,
    updateUser : updateUser
}
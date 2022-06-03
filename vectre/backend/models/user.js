const _ = require('lodash')
const User = require('./neo4j/user')

// use auto commit transaction for simplicity.

const getUser = function (session, wallet) {
    /* Return the user object of the wallet owner.
    */
    const findQuery = `MATCH (u:User { wallet_address: ${wallet} }) RETURN u`
    
    session
        .run(findQuery)
        .then(results => {
            if (_.isEmpty(results.records)) {
                return { success: false, user: null, message: "User does not exist"}
            }
            else {
                return { success: true, user: new User(results.records[0]) }
            }
        })
}

const updateUser = function (session, wallet, newUser) {
    /* Update the user profile of the wallet owner using newUser.
     * newUser must be a user object.
    */
    const query = `MATCH (u:User { wallet_address: ${wallet} }) SET u = ${newUser} RETURN u`
    
    session
        .run(query)
        .then(results => {
            if (_.isEmpty(results.records)) {
                console.log("Edit user data failed.")
            }
        })
}

module.exports = {
    getUser : getUser,
    updateUser : updateUser
}
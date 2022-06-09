const _ = require('lodash')
const User = require('./neo4j/user')

// use auto commit transaction for simplicity.

const createUser = function (session, body) {
    /* Creates the user with the following information from body
    */
    const query = `CREATE (user:User {name: '${body.name}', username: '${body.username}', wallet_address: '${body.wallet_address}', bio: '${body.bio}'});`

    return session.run(query)
        .then((results) => {
            return {
                success: true,
                message: "User created sucessfully.",
            };
        })
        .catch((error) => {
            return {
                success: false,
                message: "Failed to create user",
                error: error.message
            };
        });
}

const getUser = function (session, wallet) {
    /**
     * Return the first user object with matching wallet.
     * 
     * @param neo4j session
     * @param wallet address of the user for searching
     * @returns an object with a boolean field 'success', field 'user' that holds the user object, and field 'message'.
     */

    const findQuery = `MATCH (user: User {wallet_address : \"${wallet}\"}) RETURN user`
    
    return session
        .run(findQuery)
        .then(results => {
            if (_.isEmpty(results.records)) {
                return { success: false, user_data: null, message: "User wallet_address doesn't exist. Please register your account." }
            }
            else {
                return { success: true, message: "User wallet_address already exists.", user_data: new User(results.records[0].get('user')) }
            }
        }).catch((error) => {
            return { success: false, error: error.message, user_data: null, message: "Error while searching. Please try again." }
        })
}

const updateUser = function (session, wallet, filter, newUser) {
    /**
     * Update the user object with matching `wallet` on Neo4j using fields from 
     * `newUser` after being filtered by `filter`.
     * 
     * @param neo4j session.
     * @param wallet address of the user.
     * @param array containing string of keys to modify on Neo4j.
     * @param object containing new information, must contain keys in `filter`.
     * @returns an object with a boolean field 'success' and field 'message'.
     */

    // Apply filter to newUser
    const filteredUser = Object.fromEntries(Object.entries(newUser).
        filter(([key, value]) => filter.includes(key)))

    const userString = JSON.stringify(filteredUser).replace(/"([^"]+)":/g, '$1:')
    const query = `MATCH (u: User { wallet_address : \"${wallet}\"})
        SET u += ${userString}
        RETURN u`
    
    // Apply changes to Neo4j
    return session
        .run(query)
        .then(results => {
            if (_.isEmpty(results.records)) {
                return {success: false, message : "Edit failed, wallet does not exist."}
            }
            return {success: true, message : "Edit success."}
        }).catch(error => {
            return { success: false, error: error.message, message: "Error while editing. Please try again." }
        })
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
        AND (NOT u.wallet_address = \"${wallet}\") RETURN u`;

    const modify = `MATCH (u: User {wallet_address: \"${wallet}\"})
        SET u.name = \"${newProf.name}\", u.username = \"${newProf.username}\", u.bio = \"${newProf.bio}\"
        RETURN u`;
    
    return session
        .run(searchUsernameQuery)       
        .then(existence => {
            if ( !_.isEmpty(existence.records)) { // Check for existing username
                return {success: false, message: "Username already exists."}
            } else {
                const profileFilter = ["name", "username", "bio", "nonce"]
                return updateUser(session, wallet, profileFilter, newProf)
            }
        })
}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    updateProfile: updateProfile
}
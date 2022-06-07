const _ = require('lodash')
const User = require('./neo4j/user')

// use auto commit transaction for simplicity.

const getUser = function (session, wallet) {
    /**
     * Return the first user object with matching wallet.
     * 
     * @param neo4j session
     * @param wallet address of the user for searching
     * @returns an object with a boolean field 'success', field 'user' that holds the user object, and field 'message' if success is false.
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
            return { success: false, user: null, message: "Error while searching"}
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
                return session
                    .run(modify)
                    .then(results => {
                        if (_.isEmpty(results.records)) {
                            return {success: false, message : "Edit failed."}
                        }
                        return {success: true}
                    })
            }
        })
}

module.exports = {
    getUser : getUser,
    updateProfile : updateProfile,
}
const _ = require('lodash')
const Community = require('./neo4j/community')

///////////////////////////// NEO4j methods ////////////////////////////////////
const create = function(session, ownerWalletAddress, newCommunity) {
    const query = [
        'MATCH (o: User {walletAddress: $owner})',
        'CREATE (c: Community {communityID: $communityID, name: $name, bio: $bio, memberCount: 0, profilePic: $profilePic, banner: $banner})',
        'SET c.memberCount = c.memberCount + 1',
        'CREATE (o)-[:JOINS]->(c)',
        'CREATE (o)-[:MODERATES]->(c)',
        'CREATE (o)-[link: OWNS]->(c)',
        'RETURN link'
    ].join("\n")

    return session.run(query, {
        owner: ownerWalletAddress,
        communityID: newCommunity.communityID,
        name: newCommunity.name,
        bio: newCommunity.bio,
        profilePic: newCommunity.profilePic ? newCommunity.profilePic : null,
        banner: newCommunity.banner ? newCommunity.banner : null,
    })
    .then(result => {
        if (_.isEmpty(result.records)){
            return { 
                success: false,
                message: "User does not exist."
            }
        } else {
            return {
                success: true,
                message: "Successfully created a community.",
                communityID: newCommunity.communityID
            }
        }
    }).catch(error => {
        if (error.message.includes('already exists with label `Community` and property `communityID`')) {
            return {
                success: false,
                message: "Community already exists."
            }
        }
        throw error
    }) 
}

const update = function(session, communityID, updated) {
    const query = 'MATCH (c: Community {communityID: $communityID}) SET c = $updated RETURN c'
    return session.run(query, {
        communityID: communityID,
        updated: updated
    }).then(result => {
        if (_.isEmpty(result.records)){     // in userUpdate, there is already a check for this.
            throw {
                message: 'Community does not exist',
            }
        }
        return {
            success: true,
            message: 'Successfully updated community',
            communityID: communityID
        }
    })
}

const get = function(session, communityID) {
    const query = 'MATCH (c: Community {communityID: $communityID} ) RETURN c'
    return session.run(query, {
        communityID: communityID
    }).then(result => {
        if (_.isEmpty(result.records)){
            return {
                success: false,
                message: "Community does not exist"
            }
        }
        else {
            let community = new Community(result.records[0].get('c'))
            return {
                success: true,
                community: community
            }
        }   
    }).catch(error => {
        throw {
            success: false,
            message: "Failed to fetch community",
            error: error.message
        }
    })
}

const getAll = function(session) {
    const query = 'MATCH (c: Community) RETURN c'
    return session.run(query)
    .then(result => {
        let communities = []
        result.records.forEach(record => {
            communities.push(new Community(record.get('c')))
        })
        return {
            success: true,
            communities: communities
        }
    })
    .catch(error => {
        throw {
            success: false,
            message: "Failed to fetch all communities",
            error: error.message
        }
    })
}

const isEditor = function(session, walletAddress, communityID) {
    const queries = [
        'MATCH (u: User {walletAddress: $walletAddress}) MATCH (c: Community {communityID: $communityID}) RETURN u, c',
        'MATCH (u: User {walletAddress: $walletAddress})-[mod_link: MODERATES]->(c: Community {communityID: $communityID}) RETURN mod_link'
    ]
    const format = {
        walletAddress: walletAddress,
        communityID: communityID
    }

    return session.run(queries[0], format)
    .then(existence => {
        if (_.isEmpty(existence.records)) {
            throw {
                message: "User or Community does not exist."
            }
        } else {
            return session.run(queries[1], format)
            .then(result => {
                return !(_.isEmpty(result.records))
            })
        }
    })
}

////////////////////////////////////////////////////////////////////////////////\

const communityValidate = function(community) {
    if (!(/^[0-9a-zA-Z_.-]+$/.test(community.communityID))) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "communityID can only contain letters, numbers, dashes, underscores, or periods"
            })
        })
    } else if (community.communityID.length > 32) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "communityID must be less than 32 characters"
            })
        })
    } else if (community.name.length > 32) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "Name must be less than 32 characters"
            })
        })
    } else if (community.bio.length > 500) {
        return new Promise((resolve) => {
            resolve({
                success: false,
                message: "Bio must be less than 500 characters"
            })
        })
    } else {
        return new Promise((resolve) => {
            resolve({ success: true})
        })
    }
}

const userCreate = function(session, ownerWalletAddress, body) {
    return communityValidate(body)
        .then(validateResult => {
            if (validateResult.success) {
                return create(session, ownerWalletAddress, body)
            } else {
                return validateResult
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: "Failed to create Community",
                error: error.message
            }
        })
}

const userUpdate = function(session, walletAddress, communityID, body) {
    return communityValidate(body)
    .then(validateResult => {
        if (validateResult.success) {
            return isEditor(session, walletAddress, communityID)
            .then(editable => {
                if (editable) {
                    return update(session, communityID, body)
                } else {
                    return { 
                        success: false,
                        message: "User does not have the permission to edit this community"
                    }
                }
            })
        } else {
            return validateResult
        }
    })
    .catch(error => {
        if (error.message = "User or Community does not exist.") {
            return {
                success: false,
                message: error.message
            }
        }
        throw {
            success: false,
            message: "Failed to edit the community",
            error: error.message
        }
    })
}

module.exports = {
    get,
    getAll,
    userCreate,
    userUpdate,
}
const _ = require('lodash')
const community = require('./neo4j/community')
const Community = require('./neo4j/community')
const User = require('./neo4j/user')

///////////////////////////// NEO4j methods ////////////////////////////////////
const create = function(session, ownerWalletAddress, newCommunity) {
    const query = [
        'MATCH (o: User {walletAddress: $owner})',
        'CREATE (c: Community {communityID: $communityID, name: $name, bio: $bio, memberCount: 0, profilePic: $profilePic, banner: $banner})',
        'SET c.memberCount = c.memberCount + 1',
        'CREATE (o)-[:JOINS]->(c)',
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
            throw { message: "User does not exist." }
        } else {
            return {
                success: true,
                message: "Successfully created a community.",
                communityID: newCommunity.communityID
            }
        }
    }).catch(error => {
        if (error.message.includes('already exists with label `Community` and property `communityID`')) {
            throw {
                success: false,
                message: "Community already exists."
            }
        }
        throw {
            success: false,
            message: "Failed to create community.",
            error: error.message
        }
    }) 
}

const update = function(session, communityID, updated) {
    const query = 'MATCH (c: Community {communityID: $communityID}) SET c = $updated RETURN c'
    return session.run(query, {
        communityID: communityID,
        updated: updated
    }).then(result => {
        if (_.isEmpty(result.records)){
            throw {
                message: 'Community does not exist',
            }
        }
        return {
            success: true,
            message: 'Successfully updated community',
            communityID: communityID
        }
    }).catch(error => {
        throw {
            success: false,
            message: "Failed to update community",
            error: error
        }
    })
}

const get = function(session, communityID) {
    const query = 'MATCH (c: Community {communityID: $communityID} ) RETURN c'
    return session.run(query, {
        communityID: communityID
    }).then(result => {
        if (_.isEmpty(result.records)){
            throw {
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
                .then(createResult => {
                    if (createResult.success) {
                        return createResult
                    }
                })
                .catch(error => {
                    throw error
                })
            } else {
                return validateResult
            }
        })
        .catch(error => {
            throw error
        })
}

module.exports = {
    update,
    get,
    userCreate
}
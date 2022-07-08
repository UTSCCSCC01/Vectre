const _ = require('lodash')
const Community = require('./neo4j/community')
const User = require('./neo4j/user')

// Temp
const createCommunity = function(session, newCommunity) {
    const query = 'CREATE (c: Community {communityID: $communityID, name: $name, bio: $bio, link: $link, memberCount: 0, NFTgroup: $NFTgroup})'
    return session.run(query, {
        communityID: newCommunity.communityID,
        name: newCommunity.name,
        bio: newCommunity.bio,
        link: newCommunity.link,
        NFTgroup: newCommunity.NFTgroup
    }).then(result => {
        return {
            success: true,
            message: "Successfully created a community",
            communityID: newCommunity.communityID
        }
    }).catch(error => {
        throw {
            success: false,
            message: "Failed to create community",
            error: error
        }
    }) 
}

const updateCommunity = function(session, communityID, updated) {
    const query = 'MATCH (c: Community {communityID: $communityID}) SET c = $updated'
    return session.run(query, {
        communityID: communityID,
        updated: updated
    }).then(result => {
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

const getCommunity = function(session, communityID) {
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
            error: error
        }
    })
}

module.exports = {
    createCommunity,
    updateCommunity,
    getCommunity
}
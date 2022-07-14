const _ = require('lodash')
const Community = require('./neo4j/community')
const User = require('./neo4j/user')

// Neo4j role links
const ROLE_LINKS = {
    member: "JOINS",
    moderator: "MODERATES",
    owner: "OWNS"
}

// helper functions
const filterBody = function (body) {
    if (_.isEmpty(body)) return body

    filter = ["communityID", "name", "bio", "profilePic", "banner", "discordLink", "instagramLink", "twitterLink", "websiteLink", "ethLink"]
    return Object.fromEntries(Object.entries(body).
        filter(([key, value]) => filter.includes(key)))
}

const communityValidate = function (community) {
    const required = ["communityID", "name", "bio"]

    if (_.isEmpty(community)) {
        return new Promise(resolve => {
            throw {
                message: "Provided body is empty."
            }
        })
    }

    for (let r of required) {
        if (!(r in community)) {
            return new Promise(resolve => {
                resolve({
                    success: false,
                    message: `Community misses field ${r}.`
                })
            })
        }
        if (typeof community[r] !== 'string') {
            return new Promise(resolve => {
                resolve({
                    success: false,
                    message: `Community field ${r} is not String.`
                })
            })
        }
    }

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
            resolve({ success: true })
        })
    }
}

///////////////////////////// NEO4j methods ////////////////////////////////////
const create = function (session, ownerWalletAddress, newCommunity) {
    const query = [
        'MATCH (o: User {walletAddress: $owner})',
        'CREATE (c: Community $format)',
        'SET c.memberCount = toInteger(1)',
        'CREATE (o)-[:JOINS]->(c)',
        'CREATE (o)-[:MODERATES]->(c)',
        'CREATE (o)-[link: OWNS]->(c)',
        'RETURN link'
    ].join("\n")

    const communityFormat = {
        communityID: newCommunity.communityID,
        name: newCommunity.name,
        bio: newCommunity.bio,
        profilePic: newCommunity.profilePic ? newCommunity.profilePic : null,
        banner: newCommunity.banner ? newCommunity.banner : null,
        discordLink: newCommunity.discordLink ? newCommunity.discordLink : null,
        instagramLink: newCommunity.instagramLink ? newCommunity.instagramLink : null,
        twitterLink: newCommunity.twitterLink ? newCommunity.twitterLink : null,
        websiteLink: newCommunity.websiteLink ? newCommunity.websiteLink : null,
        ethLink: newCommunity.ethLink ? newCommunity.ethLink : null,
    }

    return session.run(query, {
        owner: ownerWalletAddress,
        format: communityFormat
    })
        .then(result => {
            if (_.isEmpty(result.records)) {
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

const update = function (session, communityID, updated) {
    const query = [
        'MATCH (c: Community {communityID: $communityID})',
        'SET c += $updated RETURN c'
    ].join("\n")

    return session.run(query, {
        communityID: communityID,
        updated: updated
    }).then(result => {
        if (_.isEmpty(result.records)) {     // in userUpdate, there is already a check for this.
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

const get = function (session, communityID) {
    const query = 'MATCH (c: Community {communityID: $communityID} ) RETURN c'
    return session.run(query, {
        communityID: communityID
    }).then(result => {
        if (_.isEmpty(result.records)) {
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

const getAll = function (session) {
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

const isRole = function (session, walletAddress, communityID, role) {
    const queries = [
        'MATCH (u: User {walletAddress: $walletAddress}) MATCH (c: Community {communityID: $communityID}) RETURN u, c',
        `MATCH (u: User {walletAddress: $walletAddress})-[link: ${ROLE_LINKS[role]}]->(c: Community {communityID: $communityID}) RETURN link`
    ]
    const format = {
        walletAddress: walletAddress,
        communityID: communityID,
    }

    return session.run(queries[0], format)
        .then(existence => {
            if (_.isEmpty(existence.records)) {
                return {
                    success: false,
                    message: "User or Community does not exist."
                }
            } else {
                return session.run(queries[1], format)
                    .then(result => {
                        return {
                            success: true,
                            result: !(_.isEmpty(result.records))
                        }
                    })
            }
        })
}

const getUsersByRole = function (session, communityID, role) {
    const queries = [
        'MATCH (c: Community {communityID: $communityID}) RETURN c',
        `MATCH (u: User)-[:${ROLE_LINKS[role]}]->(c: Community {communityID: $communityID}) RETURN u`
    ]

    return session.run(queries[0], { communityID: communityID })
        .then(existence => {
            if (_.isEmpty(existence.records)) {
                return {
                    success: false,
                    message: "Community does not exist"
                }
            } else {
                return session.run(queries[1], { communityID: communityID })
                    .then(result => {
                        let users = []
                        result.records.forEach(record => {
                            users.push(new User(record.get('u')))
                        })
                        let returnObject = {
                            success: true
                        }
                        returnObject[role] = users
                        return returnObject
                    })
            }
        }).catch(error => {
            throw {
                success: false,
                message: `Failed to get all ${role}s of Community`,
                error: error.message
            }
        })
}

const addMember = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress})',
        'MATCH (c: Community {communityID: $communityID})',
        'MERGE (u)-[:JOINS]->(c)',
        'SET c.memberCount = toInteger(c.memberCount + 1)'
    ].join('\n')

    return isRole(session, walletAddress, communityID, "member")
        .then(alreadyMember => {
            if (alreadyMember.success) {
                if (alreadyMember.result) {
                    return {
                        success: false,
                        message: "User is already a member of Community."
                    }
                } else {
                    return session.run(query, {
                        walletAddress: walletAddress,
                        communityID: communityID
                    }).then(result => {
                        return {
                            success: true,
                            message: "Successfully joined community"
                        }
                    })
                }
            } else {    // User or Community does not exist.
                return alreadyMember
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: "Failed to add User to Community",
                error: error.message
            }
        })
}

const promoteMember = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress} )',
        'MATCH (c: Community {communityID: $communityID})',
        'MERGE (u)-[:MODERATES]->(c)'
    ].join("\n")

    return isRole(session, walletAddress, communityID, "member")
        .then(memberCheck => {
            if (memberCheck.success) {
                if (memberCheck.result) {
                    return isRole(session, walletAddress, communityID, "moderator")
                        .then(moderatorCheck => {
                            if (moderatorCheck.result) {
                                // Member is already a moderator
                                return {
                                    success: false,
                                    message: "User is already a Moderator of Community."
                                }
                            } else {
                                // Run query to promote member.
                                return session.run(query, {
                                    walletAddress: walletAddress,
                                    communityID: communityID
                                }).then(result => {
                                    return {
                                        success: true,
                                        message: "Successfully promote User to Moderator of Community"
                                    }
                                })
                            }
                        })
                } else {
                    return {
                        success: false,
                        message: "User is not a Member of Community."
                    }
                }
            } else {
                return member
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: "Failed to promote User to Moderator of Community",
                error: error.message
            }
        })
}

const demoteModerator = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress})-[link:MODERATES]->(c: Community {communityID: $communityID})',
        'DELETE link'
    ].join("\n")

    return isRole(session, walletAddress, communityID, "moderator")
        .then(moderatorCheck => {
            if (moderatorCheck.success) {
                if (moderatorCheck.result) {
                    // demote the moderator
                    return session.run(query, {
                        walletAddress: walletAddress,
                        communityID: communityID
                    }).then(result => {
                        return {
                            success: true,
                            message: "Successfully demote User to Member of Community"
                        }
                    })
                } else {
                    // user is not a moderator, thus, may not be a member
                    return {
                        success: false,
                        message: "User is not a Moderator of Community"
                    }
                }
            } else {
                // User or Community does not exist
                return moderatorCheck
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: "Failed to demote User to Member of Community",
                error: error.message
            }
        })
}

const removeMember = function (session, walletAddress, communityID) {
    const queries = [
        [
            'MATCH (u: User {walletAddress: $walletAddress})-[mod_link:MODERATES]->(c: Community {communityID: $communityID})',
            'MATCH (u: User {walletAddress: $walletAddress})-[mem_link:JOINS]->(c: Community {communityID: $communityID})',
            'SET c.memberCount = toInteger(c.memberCount - 1)',
            'DELETE mod_link, mem_link'
        ].join("\n"),
        [
            'MATCH (u: User {walletAddress: $walletAddress})-[mem_link:JOINS]->(c: Community {communityID: $communityID})',
            'SET c.memberCount = toInteger(c.memberCount - 1)',
            'DELETE mem_link'
        ].join("\n")
    ]

    const format = {
        walletAddress: walletAddress,
        communityID: communityID
    }

    const successReturn = {
        success: true,
        message: "Successfully remove User from Community"
    }

    return isRole(session, walletAddress, communityID, "moderator")
        .then(moderatorCheck => {
            if (moderatorCheck.success) {
                if (moderatorCheck.result) {
                    // User is a moderator, use query 0 and 1 to remove
                    return session.run(queries[0], format)
                        .then(result => { return successReturn })

                } else {
                    // Check if User is a member
                    return isRole(session, walletAddress, communityID, "member")
                        .then(memberCheck => {
                            if (memberCheck.result) {
                                // User is a member, use query 1 to remove
                                return session.run(queries[1], format)
                                    .then(result => { return successReturn })

                            } else {
                                // User is not a Member of community
                                return {
                                    success: false,
                                    message: "User is not a Member of Community"
                                }
                            }
                        })
                }
            } else {
                // User or Community does not exist
                return moderatorCheck
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: "Failed to remove User from Community",
                error: error.message
            }
        })
}

const getRolesOfUsers = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress})-[r]->(c: Community {communityID: $communityID})',
        'RETURN type(r)'
    ].join("\n")

    const LINK_ROLES = {
        "JOINS": "member",
        "MODERATES": "moderator",
        "OWNS": "owner"
    }

    return isRole(session, walletAddress, communityID, "member")
        .then(memberCheck => {
            if (memberCheck.success) {
                if (memberCheck.result) {
                    // do query to find all roles
                    return session.run(query, {
                        walletAddress: walletAddress,
                        communityID: communityID
                    })
                        .then(result => {
                            let roles = []
                            result.records.forEach(record => {
                                roles.push(LINK_ROLES[record.get('type(r)')])
                            })
                            return {
                                success: true,
                                roles: roles
                            }
                        })

                } else {
                    // User is not a member of Community
                    return {
                        success: false,
                        message: "User is not a Member of Community"
                    }
                }
            } else {
                // User or Community does not exist
                return memberCheck
            }
        }).catch(error => {
            throw {
                success: false,
                message: "Failed to get all roles of User in Community",
                error: error.message
            }
        })
}

////////////////////////////////////////////////////////////////////////////////

const communityCreate = function (session, ownerWalletAddress, body) {
    let filtered = filterBody(body)
    return communityValidate(filtered)
        .then(validateResult => {
            if (validateResult.success) {
                return create(session, ownerWalletAddress, filtered)
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

const communityUpdate = function (session, walletAddress, communityID, body) {
    let filtered = filterBody(body)
    return communityValidate(filtered)
        .then(validateResult => {
            if (validateResult.success) {
                return isRole(session, walletAddress, communityID, "moderator")
                    .then(moderator => {
                        if (moderator.success) {
                            if (moderator.result) {
                                return update(session, communityID, filtered)
                            } else {
                                return {
                                    success: false,
                                    message: "User does not have the permission to edit this community"
                                }
                            }
                        } else {
                            return moderator
                        }
                    })
            } else {
                return validateResult
            }
        })
        .catch(error => {
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
    communityCreate,
    communityUpdate,
    getUsersByRole,
    addMember,
    removeMember,
    getRolesOfUsers
}
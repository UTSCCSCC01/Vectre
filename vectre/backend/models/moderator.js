const Community = require("./community")
const Post = require("./post")
const { MOD, ROLES } = require('./neo4j/community')

const promoteMember = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress} )',
        'MATCH (c: Community {communityID: $communityID})',
        'MERGE (u)-[:MODERATES]->(c)'
    ].join("\n")

    return Community.isRole(session, walletAddress, communityID, ROLES.MEMBER.type)
        .then(memberCheck => {
            if (memberCheck.success) {
                if (memberCheck.result) {
                    return Community.isRole(session, walletAddress, communityID, ROLES.MODERATOR.type)
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
                return memberCheck
            }
        })
}

const demoteModerator = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress})-[link:MODERATES]->(c: Community {communityID: $communityID})',
        'DELETE link'
    ].join("\n")

    return Community.isRole(session, walletAddress, communityID, ROLES.MODERATOR.type)
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
                            message: "Successfully demoted User to Member of Community"
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

const banMember = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress}), (c: Community {communityID: $communityID})',
        `CREATE (u)-[:BANNED_FROM]->(c)`
    ].join("\n")
    
    return Community.isRole(session, walletAddress, communityID, ROLES.BANNED.type)
    .then(bannedResult => {
        if (!bannedResult.success) {
            return bannedResult
        }
        if (bannedResult.result) {
            return {
                success: false,
                message: "User is already banned from Community."
            }
        }
        // Delete posts from User in Community
        return Post.removeCommunityPostsFromUser(session, communityID, walletAddress)
        .then(deleteResult => {
            // Ban user
            return session.run(query, {
                walletAddress: walletAddress,
                communityID: communityID
            })
            .then(result => {
                return {
                    success: true,
                    message: "Successfully banned User from Community."
                }
            })
        })
    })
}

const unbanMember = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (:User {walletAddress: $walletAddress})-[l:BANNED_FROM]->(c: Community {communityID: $communityID})',
        'DELETE l'
    ].join("\n")
    
    return Community.isRole(session, walletAddress, communityCreate, ROLES.BANNED.type)
    .then(bannedResult => {
        if (!bannedResult.success) {
            return bannedResult
        }
        if (!bannedResult.result) {
            return {
                success: false,
                message: "User is not banned from Community."
            }
        } 
        return session.run(query, {
            walletAddress: walletAddress,
            communityID: communityID
        })
        .then(result => {
            return {
                success: true,
                message: "Successfully unbanned User from Community."
            }
        })
    })
}

const moderatesMember = function(session, communityID, calledBy, member, mode) {
    return Community.isRole(session, calledBy, communityID, ROLES.MODERATOR.type)
    .then(moderatorCheck => {
        if (!moderatorCheck.success) {
            return moderatorCheck
        }
        if (!moderatorCheck.result) {
            return {
                success: false,
                message: `User does not have the permission to ${mode} Member.`
            }    
        }
        switch (mode) {
            case MOD.PROMOTE:
                return promoteMember(session, member, communityID);
            case MOD.BAN:
                return banMember(session, member, communityID);
            case MOD.UNBAN:
                return unbanMember(session, member, communityID);
            default:
                throw {
                    message: "Unknown moderator mode."
                }
        }
    })
    .catch(error => {
        throw {
            success: false,
            message: `Failed to ${mode} Member.`,
            error: error.message
        }
    })
}

const deletesPost = function(session, communityID, calledBy, postID) {
    return Community.isRole(session, calledBy, communityID, ROLES.MODERATOR.type)
    .then(moderatorCheck => {
        if (!moderatorCheck.success) {
            return moderatorCheck
        }
        if (!moderatorCheck.result) {
            return {
                success: false,
                message: `User does not have the permission to delete Post.`
            }    
        }
        return Post.getPostByID(session, null, postID)
        .then(postCheck => {
            if (postCheck.post.community !== communityID) {
                return {
                    success: false,
                    message: "Post is not from Community."
                }
            }
            return Post.deletePostsByID(session, [postID])
            .then(result => {
                return {
                    success: true,
                    message: "Successfully deleted Post."
                }
            })
        })
    })
    .catch(error => {
        throw {
            success: false,
            message: `Failed to delete Post.`,
            error: error.mesage
        }
    })
}

module.exports =  {
    moderatesMember,
    deletesPost
}
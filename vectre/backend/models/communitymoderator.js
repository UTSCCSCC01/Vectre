const Community = require("./community")
const Post = require("./post")
const { MODERATOR_ACTIONS, ROLES } = require('./neo4j/community')

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
                                throw {
                                    success: false,
                                    message: "User is already a Moderator of Community."
                                }
                            } else {
                                // Run query to promote member.
                                return session.run(query, {
                                    walletAddress: walletAddress,
                                    communityID: communityID
                                })
                                    .then(result => {
                                        return {
                                            success: true,
                                            message: "Successfully promoted User to Moderator of Community"
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
    return Community.isRole(session, walletAddress, communityID, ROLES.MODERATOR.type)
        .then(moderatorCheck => {
            if (!moderatorCheck.success) return moderatorCheck // User or Community does not exist

            if (moderatorCheck.result) {
                // Demote the moderator
                const query = [
                        'MATCH (u: User {walletAddress: $walletAddress})-[link:MODERATES]->(c: Community {communityID: $communityID})',
                        'DELETE link'
                    ].join("\n")
                return session.run(query, {
                    walletAddress: walletAddress,
                    communityID: communityID
                })
                    .then(result => {
                        return {
                            success: true,
                            message: "Successfully demoted User to Member of Community"
                        }
                    })
            } else {
                // User is not a moderator, thus, may not be a member
                throw {
                    success: false,
                    message: "User is not a Moderator of Community"
                }
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
    return Community.isRole(session, walletAddress, communityID, ROLES.BANNED.type)
        .then(bannedResult => {
            if (!bannedResult.success) return bannedResult
            else if (bannedResult.result) {
                throw {
                    success: false,
                    message: "User is already banned from Community."
                }
            }
            // Delete posts from User in Community
            return Post.removeCommunityPostsFromUser(session, communityID, walletAddress)
                .then(deleteResult => {
                    // Ban user
                    const query = [
                        'MATCH (u: User {walletAddress: $walletAddress}), (c: Community {communityID: $communityID})',
                        `CREATE (u)-[:BANNED_FROM]->(c)`
                    ].join("\n")
                    return session.run(query, {
                        walletAddress: walletAddress,
                        communityID: communityID
                    })
                        .then(result => {
                            return {
                                success: true,
                                message: "Successfully banned User from Community"
                            }
                        })
                })
        })
        .catch(error => {
            throw {
                success: false,
                message: `Failed to ban User`,
                error: error.message
            }
        })
}

const unbanMember = function (session, walletAddress, communityID) {
    const query = [
        'MATCH (:User {walletAddress: $walletAddress})-[l:BANNED_FROM]->(c: Community {communityID: $communityID})',
        'DELETE l'
    ].join("\n")
    
    return Community.isRole(session, walletAddress, communityCreate, ROLES.BANNED.type)
        .then(bannedResult => {
            if (!bannedResult.success) return bannedResult
            else if (!bannedResult.result) {
                throw {
                    success: false,
                    message: "User is not banned from Community"
                }
            }
            return session.run(query, {
                walletAddress: walletAddress,
                communityID: communityID
            })
                .then(result => {
                    return {
                        success: true,
                        message: "Successfully unbanned User from Community"
                    }
                })
        })
        .catch(error => {
            throw {
                success: false,
                message: `Failed to unban User`,
                error: error.message
            }
        })
}

const moderationAction = function(session, communityID, calledBy, member, action) {
    return Community.isRole(session, calledBy, communityID, ROLES.MODERATOR.type)
        .then(moderatorCheck => {
            if (!moderatorCheck.success) return moderatorCheck
            else if (!moderatorCheck.result) {
                throw {
                    success: false,
                    message: `User does not have the permission to ${action} Member.`
                }
            }
            switch (action) {
                case MODERATOR_ACTIONS.PROMOTE:
                    return promoteMember(session, member, communityID);
                case MODERATOR_ACTIONS.BAN:
                    return banMember(session, member, communityID);
                case MODERATOR_ACTIONS.UNBAN:
                    return unbanMember(session, member, communityID);
                default:
                    throw {
                        message: "Invalid moderator action"
                    }
            }
        })
        .catch(error => {
            throw {
                success: false,
                message: `Failed to ${action} Member`,
                error: error.message
            }
        })
}

const deletePost = function(session, communityID, calledBy, postID) {
    return Community.isRole(session, calledBy, communityID, ROLES.MODERATOR.type)
        .then(moderatorCheck => {
            if (!moderatorCheck.success) return moderatorCheck
            else if (!moderatorCheck.result) {
                throw {
                    success: false,
                    message: `User does not have the permission to delete Post`
                }
            }
            return Post.getPostByID(session, null, postID)
                .then(postCheck => {
                    if (postCheck.post.community !== communityID) {
                        throw {
                            success: false,
                            message: "Post is not from Community"
                        }
                    }
                    return Post.deletePostsByID(session, [postID])
                        .then(result => {
                            return {
                                success: true,
                                message: "Successfully deleted Post"
                            }
                        })
                })
        })
        .catch(error => {
            throw {
                success: false,
                message: `Failed to delete Post`,
                error: error.mesage
            }
        })
}

module.exports =  {
    moderationAction,
    deletePost
}
const _ = require('lodash');
const Post = require('./neo4j/post')
const User = require('./neo4j/user')
const { nano } = require('../utils/Utils')

const createUserPost = function (session, authorWalletAddress, body) {
    if (!body.text) {
        throw {
            success: false,
            message: 'Post must contain text field'
        }
    }
    const postID = nano()
    const date = new Date().toISOString()
    const imageString = body.imageURL ? `, imageURL: '${body.imageURL}'` : ""; // imageURL is optional on a post

    if (body.repostPostID) { // Repost
        return getPostByID(session, null, body.repostPostID) // Note: walletAddress here is null means alreadyLiked will not show for
            .then((result) => {
                if (result.success) {
                    if (result.post.repostPostID) { // Prevent repost of repost
                        throw {
                            success: false,
                            message: "Cannot create repost of repost"
                        }
                    }
                    const query = [
                        `CREATE (p:Post {postID: '${postID}', repostPostID: '${body.repostPostID}', text: '${body.text}', author: '${authorWalletAddress}', edited: false, timestamp: '${date}', likes: 0, parent: null ${imageString}})`,
                        `WITH (p)`,
                        `MATCH (u:User {walletAddress: '${authorWalletAddress}'}), (repost:Post {postID: '${body.repostPostID}'})`,
                        `CREATE (u)-[r:POSTED]->(p)`
                    ].join('\n');

                    return session.run(query)
                        .then((result2) => {
                            return {
                                success: true,
                                message: "Successfully created repost"
                            }
                        })
                        .catch((error) => {
                            throw {
                                success: false,
                                message: "Failed to create repost",
                                error: error
                            }
                        });
                } else {
                    throw {
                        success: false,
                        message: result.message
                    }
                }
            })
            .catch((error) => {
                throw {
                    success: false,
                    message: "Failed to create repost",
                    error: error
                }
            });
    } else {
        const query = [
            `CREATE (p:Post {postID: '${postID}', text: '${body.text}', author: '${authorWalletAddress}', edited: false, timestamp: '${date}', likes: 0, parent: null ${imageString}})`,
            `WITH (p)`,
            `MATCH (u:User)`,
            `WHERE u.walletAddress = '${authorWalletAddress}'`,
            `CREATE (u)-[r:POSTED]->(p)`
        ].join('\n');

        return session.run(query)
            .then((result) => {
                return {
                    success: true,
                    message: "Successfully created post"
                }
            })
            .catch((error) => {
                throw {
                    success: false,
                    message: "Failed to create post",
                    error: error
                }
            });
    }
};

const createUserComment = function (session, authorWalletAddress, postID, body) {
    if (!body.text) {
        throw {
            success: false,
            message: 'Invalid comment properties'
        }
    }
    const commentPostID = nano()
    const date = new Date().toISOString()
    const query = [
        `CREATE (p:Post {postID: '${commentPostID}', text: '${body.text}', author: '${authorWalletAddress}', edited: false, timestamp: '${date}', parent: '${postID}', likes: 0})`,
        `WITH (p)`,
        `MATCH (u:User), (parent:Post)`,
        `WHERE u.walletAddress = '${authorWalletAddress}' AND parent.postID = '${postID}'`,
        `CREATE (u)-[r:POSTED]->(p), (p)-[r2:COMMENTED_ON]->(parent)`
    ].join('\n');

    return session.run(query)
        .then((result) => {
            return {
                success: true,
                message: "Successfully created Comment"
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to create Comment",
                error: error
            }
        });
};

const update = function (session, walletAddress, postID, body) {
    if (!body.text) {
        throw {
            success: false,
            message: 'Post must contain a text field'
        }
    }
    const date = new Date().toISOString()
    const imageString = body.imageURL ? `, p.imageURL = '${body.imageURL}'` : ""; // imageURL is optional on a post
    const query = [
        `MATCH (p:Post {postID: '${postID}'})`,
        `SET p.text = '${body.text}' ${imageString}, p.edited = true, p.timestamp = '${date}'`,
        `RETURN p`
    ].join('\n');

    return session.run(query)
        .then((result) => {
            if (_.isEmpty(result.records)) {
                throw {
                    success: false,
                    message: "Post does not exist"
                }
            } else if (new Post(result.records[0].get('p')).author !== walletAddress) {
                throw {
                    success: false,
                    message: "You do not have access to update this Post"
                }
            } else {
                return {
                    success: true,
                    message: "Successfully updated post"
                };
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to update Post",
                error: error.message
            }
        });
}

const getPostsByUser = function (session, walletAddress) {
    const query = [
        `MATCH (:User {walletAddress:'${walletAddress}'})-[:POSTED]->(post:Post)`,
        `RETURN DISTINCT post`,
        `ORDER BY post.timestamp DESC`
    ].join('\n');

    return session.run(query)
        .then((results) => {
            let posts = []
            results.records.forEach((record) => {
                posts.push(new Post(record.get('post')))
            })
            return {
                success: true,
                posts: posts
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get posts"
            }
        });
}

const getCommentsByPost = function (session, walletAddress, postID) {
    const query = [
        `MATCH (:Post {postID:'${postID}'})<-[:COMMENTED_ON]-(comment:Post)<-[:POSTED]-(author:User)`,
        `OPTIONAL MATCH (user:User{walletAddress:"${walletAddress}"})-[l:LIKED]->(comment)`,
        `WHERE comment.author = author.walletAddress`,
        `RETURN DISTINCT author, comment, count(l) AS likes`,
        `ORDER BY comment.timestamp DESC`
    ].join('\n');

    return session.run(query)
        .then((results) => {
            let comments = []
            results.records.forEach((record) => {
                let commentRecord = new Post(record.get('comment'))
                commentRecord.author = new User(record.get('author'))
                commentRecord.alreadyLiked = record.get('likes').low > 0 ? true : false;
                comments.push(commentRecord)
            })
            return {
                success: true,
                comments: comments
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get comments"
            }
        });
}

const getPostByID = function (session, walletAddress, postID) {
    const query = [
        `MATCH (author:User)-[:POSTED]->(post:Post {postID:'${postID}'})`,
        `OPTIONAL MATCH (repost:Post)`,
        `WHERE repost.postID = post.repostPostID`,
        `OPTIONAL MATCH (repostAuthor:User)`,
        `WHERE repostAuthor.walletAddress = repost.author`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `WHERE post.author = author.walletAddress`,
        `RETURN DISTINCT author, post, count(c) AS comment, repost, repostAuthor`
    ].join('\n');

    return session.run(query)
        .then((result) => {
            let queryRecord = result.records[0]
            var post = new Post(queryRecord.get('post'))
            post.author = new User(queryRecord.get('author'))
            post.comment = String(queryRecord.get("comment").low);
            post.community = "notarealcommunity" // TOOD: Unhardcode this value
            if (post.repostPostID) {
                post.repostPost = new Post(queryRecord.get('repost'))
                post.repostPost.author = new User(queryRecord.get('repostAuthor'))
            }

            if (walletAddress !== null) {
                return checkIfAlreadyLiked(session, postID, walletAddress)
                    .then((result2) => {
                        if (result2.alreadyLiked) {
                            post.alreadyLiked = true;
                            console.log(post)
                            return {
                                success: true,
                                post: post
                            }
                        }
                        post.alreadyLiked = false;
                        console.log(post)
                        return {
                            success: true,
                            post: post
                        }
                    })
                    .catch((error) => {
                        throw {
                            success: false,
                            message: "Failed to check if post was already liked",
                            error: error
                        }
                    })
            }
            post.alreadyLiked = false;
            return {
                success: true,
                post: post
            }
        })
        .catch((error) => {
            console.log(error)
            throw {
                success: false,
                message: "Failed to get posts",
                error: error
            }
        });
}

// returns true if there is already a like
const checkIfAlreadyLiked = function (session, postID, walletAddress) {
    const query = [
        `MATCH (u:User {walletAddress: '${walletAddress}'})-[r:LIKED]->(p:Post{postID:'${postID}'})`,
        `RETURN r`
    ].join('\n');

    return session.run(query)
        .then((result) => {
            return {
                success: true,
                alreadyLiked: !_.isEmpty(result.records)
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to check if post was already liked",
                error: error
            }
        });
}

const likePost = function (session, postID, walletAddress) {
    const query = [
        `MATCH (p:Post)`,
        `WHERE p.postID = '${postID}'`,
        `SET p.likes = p.likes + 1`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.walletAddress = '${walletAddress}'`,
        `MERGE (u)-[r:LIKED]->(p)`
    ].join('\n');

    return checkIfAlreadyLiked(session, postID, walletAddress)
        .then((result) => {
            if (!result.alreadyLiked) {
                return session.run(query)
                    .then((result2) => {
                        return {
                            success: true,
                            message: "Successfully liked post"
                        }
                    })
            } else {
                throw {
                    success: false,
                    message: "Post was already liked",
                }
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to like post",
                error: error
            }
        })
};

const unlikePost = function (session, postID, walletAddress) {
    const query = [
        `MATCH (u:User {walletAddress: '${walletAddress}'})-[r:LIKED]->(p: Post {postID: '${postID}'})`,
        `SET p.likes = p.likes - 1`,
        `DELETE r`
    ].join('\n');

    return checkIfAlreadyLiked(session, postID, walletAddress)
        .then((result) => {
            if (result.alreadyLiked) {
                return session.run(query)
                    .then((result) => {
                        return {
                            success: true,
                            message: "Successfully unliked post"
                        }
                    })
            } else {
                throw {
                    success: false,
                    message: "Post was already unliked",
                }
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to unlike post",
                error: error
            }
        })
};

const getLikesOnPost = function (session, postID) {
    const query = [
        `MATCH (u:User )-[likes:LIKED]->(post:Post {postID : '${postID}'})`,
        `RETURN count(likes) as likes`
    ].join('\n');

    return session.run(query)
        .then((results) => {
            let users = []
            results.records.forEach((record) => {
                users.push(new User(record.get('u')))
            })
            return {
                success: true,
                users: users
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get likes"
            }
        });
}

module.exports = {
    createUserPost,
    createUserComment,
    getPostsByUser,
    update,
    getPostByID,
    getCommentsByPost,
    likePost,
    unlikePost,
    getLikesOnPost,
    checkIfAlreadyLiked
};
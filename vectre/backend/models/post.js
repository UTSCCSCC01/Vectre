const _ = require('lodash');
const Post = require('./neo4j/post')
const User = require('./neo4j/user')
const { nano } = require('../utils/Utils')
const Notification = require("../models/notification")

const createUserPost = function (session, authorWalletAddress, body) {
    if (!body.text) {
        throw {
            success: false,
            message: 'Post must contain text field'
        }
    }
    const postID = nano()
    const timestamp = new Date().toISOString()

    if (body.repostPostID) { // Repost
        return getPostByID(session, null, body.repostPostID)
            .then((result) => {
                if (result.success) {
                    if (result.post.repostPostID) { // Prevent repost of repost
                        throw {
                            success: false,
                            message: "Cannot create repost of repost"
                        }
                    }
                    const query = [
                        `CREATE (p:Post {postID: $postID, repostPostID: $repostPostID, text: $text, imageURL: $imageURL, author: $author, timestamp: $timestamp, likes: 0, edited: false, parent: null})`,
                        `WITH (p)`,
                        `MATCH (u:User {walletAddress: $author}), (repost:Post {postID: $repostPostID})`,
                        `CREATE (u)-[r:POSTED]->(p)`
                    ].join('\n');

                    return session.run(query, {
                        postID: postID,
                        repostPostID: body.repostPostID,
                        text: body.text,
                        imageURL: body.imageURL ? body.imageURL : null, // optional
                        author: authorWalletAddress,
                        timestamp: timestamp
                    })
                        .then((result2) => {
                            return {
                                success: true,
                                message: "Successfully created repost",
                                newPostID: postID
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
            `CREATE (p:Post {postID: $postID, text: $text, imageURL: $imageURL, author: $author, timestamp: $timestamp, likes: 0, edited: false, parent: null})`,
            `WITH (p)`,
            `MATCH (u:User)`,
            `WHERE u.walletAddress = $author`,
            `CREATE (u)-[r:POSTED]->(p)`
        ].join('\n');

        return session.run(query, {
            postID: postID,
            text: body.text,
            imageURL: body.imageURL ? body.imageURL : null, // optional
            author: authorWalletAddress,
            timestamp: timestamp
        })
            .then((result) => {
                return {
                    success: true,
                    message: "Successfully created post",
                    newPostID: postID
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
    const timestamp = new Date().toISOString()
    const query = [
        `CREATE (p:Post {postID: $commentPostID, text: $text, author: $authorWalletAddress, timestamp: $timestamp, likes: 0, edited: false, parent: $parentPostID})`,
        `WITH (p)`,
        `MATCH (u:User), (parent:Post)`,
        `WHERE u.walletAddress = $authorWalletAddress AND parent.postID = $parentPostID`,
        `CREATE (u)-[r:POSTED]->(p), (p)-[r2:COMMENTED_ON]->(parent)`,
        `RETURN parent`
    ].join('\n');

    return session.run(query, {
        commentPostID: commentPostID,
        parentPostID: postID,
        text: body.text,
        authorWalletAddress: authorWalletAddress,
        timestamp: timestamp
    })
        .then((result) => {
            var parentAuthor = new Post(result.records[0].get('parent')).author
            return Notification.create(session, "comment", parentAuthor, authorWalletAddress, commentPostID)
                .then((result2) => {
                    return {
                        success: true,
                        message: "Successfully created comment"
                    }
                })
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to create comment",
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
    const timestamp = new Date().toISOString()
    const query = [
        `MATCH (p:Post {postID: $postID})`,
        `SET p.text=$text, p.imageURL=$imageURL, p.edited=true, p.timestamp = $timestamp`,
        `RETURN p`
    ].join('\n');

    return session.run(query, {
        postID: postID,
        text: body.text,
        imageURL: body.imageURL ? body.imageURL : null, // optional
        timestamp: timestamp
    })
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

const getPostsByUser = function (session, walletAddress, profileWalletAddress) {
    const query = [
        `MATCH (author:User{walletAddress:$profileWalletAddress})-[:POSTED]->(post:Post)`,
        `WHERE post.parent IS NULL`,
        `OPTIONAL MATCH (repost:Post)`,
        `WHERE repost.postID = post.repostPostID`,
        `OPTIONAL MATCH (repostAuthor:User)`,
        `WHERE repostAuthor.walletAddress = repost.author`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `WHERE post.author = author.walletAddress`,
        `OPTIONAL MATCH (user:User{walletAddress:$walletAddress})-[l:LIKED]->(post)`,
        `RETURN DISTINCT author, post, count(c) AS comment, count(l) AS likes, repost, repostAuthor`,
        `ORDER BY post.timestamp DESC`
    ].join('\n');

    return session.run(query, {
        profileWalletAddress: profileWalletAddress,
        walletAddress: walletAddress
    })
        .then((results) => {
            let posts = []
            results.records.forEach((record) => {
                postRecord = new Post(record.get('post'))
                postRecord.author = new User(record.get('author'))
                postRecord.comment = String(record.get('comment').low);
                postRecord.alreadyLiked = record.get('likes').low > 0;
                postRecord.community = "notarealcommunity" // TOOD: Unhardcode this value
                if (postRecord.repostPostID) {
                    postRecord.repostPost = new Post(record.get('repost'))
                    postRecord.repostPost.author = new User(record.get('repostAuthor'))
                }
                posts.push(postRecord)
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
        `MATCH (:Post {postID: $postID})<-[:COMMENTED_ON]-(comment:Post)<-[:POSTED]-(author:User)`,
        `OPTIONAL MATCH (user:User{walletAddress: $walletAddress})-[l:LIKED]->(comment)`,
        `WHERE comment.author = author.walletAddress`,
        `RETURN DISTINCT author, comment, count(l) AS likes`,
        `ORDER BY comment.timestamp DESC`
    ].join('\n');

    return session.run(query, {
        walletAddress: walletAddress,
        postID: postID
    })
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
        `MATCH (author:User)-[:POSTED]->(post:Post {postID: $postID})`,
        `OPTIONAL MATCH (repost:Post)`,
        `WHERE repost.postID = post.repostPostID`,
        `OPTIONAL MATCH (repostAuthor:User)`,
        `WHERE repostAuthor.walletAddress = repost.author`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `WHERE post.author = author.walletAddress`,
        `RETURN DISTINCT author, post, count(c) AS comment, repost, repostAuthor`
    ].join('\n');

    return session.run(query, {
        postID: postID
    })
        .then((result) => {
            let queryRecord = result.records[0]
            var post = new Post(queryRecord.get('post'))
            post.author = new User(queryRecord.get('author'))
            post.comment = String(queryRecord.get("comment").low);
            post.community = "notarealcommunity" // TODO: Unhardcode this value
            if (post.repostPostID) {
                post.repostPost = new Post(queryRecord.get('repost'))
                post.repostPost.author = new User(queryRecord.get('repostAuthor'))
            }

            if (walletAddress !== null) {
                return checkIfAlreadyLiked(session, postID, walletAddress)
                    .then((result2) => {
                        if (result2.alreadyLiked) {
                            post.alreadyLiked = true;
                            return {
                                success: true,
                                post: post
                            }
                        }
                        post.alreadyLiked = false;
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
        `MATCH (u:User {walletAddress: $walletAddress})-[r:LIKED]->(p:Post{postID: $postID})`,
        `RETURN r`
    ].join('\n');

    return session.run(query, {
        walletAddress: walletAddress,
        postID: postID
    })
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
        `WHERE p.postID=$postID`,
        `SET p.likes = p.likes + 1`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.walletAddress=$walletAddress`,
        `MERGE (u)-[r:LIKED]->(p)`,
        `RETURN p`
    ].join('\n');

    return checkIfAlreadyLiked(session, postID, walletAddress)
        .then((result) => {
            if (!result.alreadyLiked) {
                return session.run(query, {
                    walletAddress: walletAddress,
                    postID: postID
                })
                    .then((result2) => {
                        var postAuthor = new Post(result2.records[0].get('p')).author
                        return Notification.create(session, "like", postAuthor, walletAddress, postID)
                            .then((result3) => {
                                return {
                                    success: true,
                                    message: "Successfully liked post",
                                }
                            })
                    })
            }
            return {
                success: false,
                message: "Post was already liked",
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
        `MATCH (u:User {walletAddress: $walletAddress})-[r:LIKED]->(p: Post {postID: $postID})`,
        `SET p.likes = p.likes - 1`,
        `DELETE r`
    ].join('\n');

    return checkIfAlreadyLiked(session, postID, walletAddress)
        .then((result) => {
            if (result.alreadyLiked) {
                return session.run(query, {
                    walletAddress: walletAddress,
                    postID: postID
                })
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
        `MATCH (u:User)-[likes:LIKED]->(post:Post {postID : $postID})`,
        `RETURN count(likes) as likes`
    ].join('\n');

    return session.run(query, {
        postID: postID
    })
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

const getUserFeed = function (session, walletAddress, start, size) {
    if (start < 0) {
        throw {
            success: false,
            message: "Start index must be non-negative"
        }
    } else if (size < 0) {
        throw {
            success: false,
            message: "Size must be non-negative"
        }
    }

    const query = [
        `MATCH (currentUser: User {walletAddress: $walletAddress})-[:FOLLOWS]->(followedUser:User)-[:POSTED]->(post: Post)`,
        `WHERE post.parent IS NULL`, // Prevent comments in feed
        `OPTIONAL MATCH (currentUser)-[l:LIKED]->(post)`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `OPTIONAL MATCH (repost:Post)`,
        `WHERE repost.postID = post.repostPostID`,
        `OPTIONAL MATCH (repostAuthor:User)`,
        `WHERE repostAuthor.walletAddress = repost.author`,
        `RETURN DISTINCT currentUser, followedUser, post, repost, repostAuthor, count(l) AS likes, count(c) AS comment`,
        `ORDER BY post.timestamp DESC`,
        `SKIP toInteger($start)`,
        `LIMIT toInteger($size)`
    ].join('\n');

    return session.run(query, {
        walletAddress: walletAddress,
        start: start,
        size: size
    })
        .then((results) => {
            let posts = []
            results.records.forEach((record) => {
                let post = new Post(record.get("post"))
                post.author = new User(record.get("followedUser"))
                post.comment = String(record.get("comment").low);
                post.community = "notarealcommunity" // TODO: Unhardcode this value
                post.alreadyLiked = record.get('likes').low > 0
                if (post.repostPostID) {
                    post.repostPost = new Post(record.get('repost'))
                    post.repostPost.author = new User(record.get('repostAuthor'))
                }

                posts.push(post)
            })
            return {
                success: true,
                posts: posts
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get feed",
                error: error
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
    checkIfAlreadyLiked,
    getUserFeed,
};
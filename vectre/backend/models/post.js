const _ = require('lodash');
const Post = require('./neo4j/post')
const User = require('./neo4j/user')
const { nano } = require('../utils/Utils')

const createUserPost = function (session, body) {
    if (!body.author || !body.text) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const postID = nano()
    const date = new Date().toISOString()

    // imageURL is optional on a post
    const possibleImageString = body.imageURL ? `, imageURL: '${body.imageURL}'` : "";

    const query = [
        `CREATE (p:Post {postID: '${postID}', text: '${body.text}', author: '${body.author}', edited: false, timestamp: '${date}', likes: 0, parent: null ${possibleImageString}})`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.walletAddress = '${body.author}'`,
        `CREATE (u)-[r:POSTED]->(p)`
    ].join('\n');

    return session.run(query)
        .then((result) => {
            return {
                success: true,
                message: "Successfully created Post"
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to create Post",
                error: error
            }
        });
};

const createUserComment = function (session, postID, body) {
    if (!body.author || !body.text) {
        throw {
            success: false,
            message: 'Invalid comment properties'
        }
    }
    const commentPostID = nano()
    const date = new Date().toISOString()
    const query = [
        `CREATE (p:Post {postID: '${commentPostID}', text: '${body.text}', author: '${body.author}', edited: false, timestamp: '${date}', parent: '${postID}', likes: 0})`,
        `WITH (p)`,
        `MATCH (u:User), (parent:Post)`,
        `WHERE u.walletAddress = '${body.author}' AND parent.postID = '${postID}'`,
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

const update = function (session, postID, body) {
    if (!body.author || !body.text || !body.imageURL) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const date = new Date().toISOString()
    const query = [
        `MATCH (p:Post {postID: '${postID}'})`,
        `SET p.text = '${body.text}', p.imageURL = '${body.imageURL}', p.edited = true, p.timestamp = '${date}'`,
        `RETURN p`
    ].join('\n');

    return session.run(query)
        .then((result) => {
            if (_.isEmpty(result.records)) {
                throw {
                    success: false,
                    message: "Post does not exist"
                }
            }
            return {
                success: true,
                message: "Successfully updated post"
            };
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

const getCommentsByPost = function (session, postID) {
    const query = [
        `MATCH (:Post {postID:'${postID}'})<-[:COMMENTED_ON]-(comment:Post)<-[:POSTED]-(author:User)`,
        `WHERE comment.author = author.walletAddress`,
        `RETURN DISTINCT author, comment`,
        `ORDER BY comment.timestamp DESC`
    ].join('\n');

    return session.run(query)
        .then((results) => {
            let comments = []
            results.records.forEach((record) => {
                let commentRecord = new Post(record.get('comment'))
                commentRecord.author = new User(record.get('author'))
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

const getPostByID = function (session, postID) {
    const query = [
        `MATCH (author:User)-[:POSTED]->(post:Post {postID:'${postID}'})`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `WHERE post.author = author.walletAddress`,
        `RETURN DISTINCT author, post, count(c) AS comment`
    ].join('\n');

    return session.run(query)
        .then((results) => {
            let post = {};
            results.records.forEach((record) => {
                post = new Post(record.get('post'))
                post.author = new User(record.get('author'))
                post.comment = String(record.get("comment").low);
            })

            // hardcoded values (since some values have not been implemented yet)
            // TODO remove this and change the query when the things below are implemented
            if (post !== {}) {
                post.community = "notarealcommunity";
            }

            return {
                success: true,
                post: post
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get posts"
            }
        });
}

// returns true if there is already a like
const checkIfAlreadyLiked = function (session, postID, body) {
    const query = [
        `MATCH (u:User{walletAddress: '${body.walletAddress}'})-[r:LIKED]->(p:Post{postID:'${postID}'})`,
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

const likePost = function (session, postID, body) {
    if (!body.walletAddress) {
        throw {
            success: false,
            message: 'Invalid properties in request body'
        }
    }
    const query = [
        `MATCH (p:Post)`,
        `WHERE p.postID = '${postID}'`,
        `SET p.likes = p.likes + 1`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.walletAddress = '${body.walletAddress}'`,
        `MERGE (u)-[r:LIKED]->(p)`
    ].join('\n');

    return checkIfAlreadyLiked(session, postID, body)
        .then((result) => {
            if (!result.alreadyLiked) {
                return session.run(query)
                    .then((result) => {
                        return {
                            success: true,
                            message: "Successfully liked Post"
                        }
                    })
                    .catch((error) => {
                        throw {
                            success: false,
                            message: "Failed to like Post",
                            error: error
                        }
                    });
            }
            return {
                success: false,
                message: "Post was already liked",
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to like Post",
                error: error
            }
        })
};

const unlikePost = function (session, postID, body) {
    if (!body.walletAddress) {
        throw {
            success: false,
            message: 'Invalid properties in request body'
        }
    }
    const query = [
        `MATCH (u:User {walletAddress: '${body.walletAddress}'})-[r:LIKED]->(p: Post {postID: '${postID}'})`,
        `SET p.likes = p.likes - 1`,
        `DELETE r`
    ].join('\n');

    return checkIfAlreadyLiked(session, postID, body)
        .then((result) => {
            if (result.alreadyLiked) {
                return session.run(query)
                    .then((result) => {
                        return {
                            success: true,
                            message: "Successfully unliked Post"
                        }
                    })
                    .catch((error) => {
                        throw {
                            success: false,
                            message: "Failed to unlike Post",
                            error: error
                        }
                    });
            }
            return {
                success: false,
                message: "Post was not already liked",
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to unlike Post",
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
    getLikesOnPost
};
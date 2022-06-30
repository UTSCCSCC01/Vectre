const _ = require('lodash');
const Post = require('./neo4j/post')

const createUserPost = function (session, body) {
    if (!body.author || !body.text || !body.imageURL || !body.timestamp) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const query = [
        `CREATE (p:Post {postID: '${body.author + body.timestamp}', text: '${body.text}', imageURL: '${body.imageURL}', author: '${body.author}', edited: '${body.edited}', timestamp: '${body.timestamp}', parent: NULL})`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.walletAddress = '${body.author}'`,
        `CREATE (p)-[r:POSTED_BY]->(u)`
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

const createUserComment = function (session, body) {
    if (!body.author || !body.text || !body.imageURL || !body.timestamp || !body.parent) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const query = [
        `CREATE (p:Post {postID: '${body.author + body.timestamp}', text: '${body.text}', imageURL: '${body.imageURL}', author: '${body.author}', edited: '${body.edited}', timestamp: '${body.timestamp}', parent: '${body.parent}'})
        WITH (p)
        MATCH (u:User), (parent:Post)
        WHERE u.walletAddress = '${body.author}' AND parent.postID = '${body.parent}'
        CREATE (p)-[r:POSTED_BY]->(u), (p)-[r2:COMMENTED_ON]->(parent)`
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

const update = function (session, postID, body) {
    if (!body.author || !body.text || !body.imageURL || !body.timestamp) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const query = [
        `MATCH (p:Post {postID: '${postID}'})`,
        // `MATCH (p:Post {postID: '${body.author+body.timestamp}'})`,
        `SET p.text = '${body.text}', p.imageURL = '${body.imageURL}', p.edited = true`,
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
        `MATCH (:User {walletAddress:'${walletAddress}'})<-[:POSTED_BY]-(post:Post)`,
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
        `MATCH (:Post {postID:'${postID}'})<-[:COMMENTED_ON]-(post:Post)`,
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


module.exports = {
    createUserPost,
    createUserComment, 
    getPostsByUser,
    update,
    getCommentsByPost
};
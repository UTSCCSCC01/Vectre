const _ = require('lodash');
const Post = require('./neo4j/post')
const { nanoid } = require("nanoid");

const createUserPost = function (session, body) {
    if (!body.author || !body.text || !body.imageURL) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const postID = nanoid()
    const date = new Date().toISOString()
    const query = [
        `CREATE (p:Post {postID: '${postID}', text: '${body.text}', imageURL: '${body.imageURL}', author: '${body.author}', edited: false, timestamp: '${date}'})`,
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


module.exports = {
    createUserPost,
    getPostsByUser,
    update
};
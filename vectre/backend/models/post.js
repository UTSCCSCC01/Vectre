const _ = require('lodash');
const Post = require('./neo4j/post')
const User = require('./neo4j/user')
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
        `CREATE (p:Post {postID: '${postID}', parent: null, text: '${body.text}', imageURL: '${body.imageURL}', author: '${body.author}', edited: false, timestamp: '${date}'})`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.walletAddress = '${body.author}'`,
        `CREATE (u)<-[r:POSTED_BY]-(p)`
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

const getPostByID = function (session, postID) {
    const query = [
        `MATCH (author:User)<-[:POSTED_BY]-(post:Post {postID:'${postID}'})`,
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
                post.like = "0";
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


module.exports = {
    createUserPost,
    getPostsByUser,
    update,
    getPostByID
};
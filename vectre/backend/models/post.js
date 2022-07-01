const _ = require('lodash');
const Post = require('./neo4j/post')

const createUserPost = function(session, body) {
    if(!body.author || !body.text || !body.imageURL || !body.timestamp) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const { author, text, imageURL, timestamp} = body;
    const query = [
        `CREATE (p:Post {postID: '${author+timestamp}', text: '${text}', imageURL: '${imageURL}', author: '${author}', edited: false, timestamp: '${timestamp}', isRepost: false, repostID: '', repostAuthor: '', repostText: '', repostImageURL: '', repostEdited: false, repostTimestamp: ''})`,
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

const update = function(session, postID, body) {
    if(!body.author || !body.text || !body.imageURL || !body.timestamp) {
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

const getPostsByUser = function(session, wallet_address) {
    const query = [
        `MATCH (:User {wallet_address:'${wallet_address}'})-[:POSTED]->(post:Post)`,
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

const repostPost = function(session, body) {
    if(!body.author || !body.text || !body.imageURL || !body.timestamp || !body.post || !body.post.postID
        || !body.post.author || !body.post.text || !body.post.imageURL || !body.post.timestamp) {
        throw {
            success: false,
            message: 'Invalid post properties'
        }
    }
    const { author, text, imageURL, timestamp, post } = body;
    const query = [
        `CREATE (p:Post {postID: '${author+timestamp}', text: '${text}', imageURL: '${imageURL}', author: '${author}', edited: false, timestamp: '${timestamp}', isRepost: true, repostID: '${post.postID}', repostAuthor: '${post.author}', repostText: '${post.text}', repostImageURL: '${post.imageURL}', repostEdited: ${post.edited}, repostTimestamp: '${post.timestamp}'})`,
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


module.exports = {
    createUserPost,
    getPostsByUser,
    update,
    repostPost
  };
const _ = require('lodash');
const Post = require('./neo4j/post')

const createUserPost = function(session, req) {
    const { body } = req;
    const query = [
        `CREATE (p:Post {postID: '${body.author+body.timestamp}', text: '${body.text}', imageURL: '${body.imageURL}', author: '${body.author}', edited: '${body.edited}', timestamp: '${body.timestamp}'})`,
        `WITH (p)`,
        `MATCH (u:User)`,
        `WHERE u.wallet_address = '${body.author}'`,
        `CREATE (u)-[r:POSTED]->(p)`
    ].join('\n');
    
    session.run(query)
        .then((result) => {
            return {succes: true, message: "Successfully created post"};
        })
        .catch((error) => {
            console.error(error);
            return {success: false, error};
        });
};

const updateUserPost = function(session, req) {
    const { body } = req;
    const query = [
        `MATCH (p:Post {postID: '${body.author+body.timestamp}'})`,
        `SET p.text = '${body.text}', p.imageURL = '${body.imageURL}', p.edited = true`,
        `RETURN p`
    ].join('\n');

    session.run(query)
    .then((result) => {
        if (_.isEmpty(result.records)) {
            throw {
                success: false,
                message: `Post does not exist`
            }
        }
        return {succes: true, message: "Successfully updated post"};
    })
    .catch((error) => {
        console.error(error);
        return {success: false, error};
    });
}

const getUserPosts = function(session, author) {
    const query = [
        `MATCH (:User {wallet_address:'${author}'})-[:POSTED]->(post:Post)`,
        `RETURN DISTINCT post`,
        `ORDER BY post.timestamp DESC`
      ].join('\n');

    return session.run(query)
        .then((results) => {
            let posts = []
            results.records.forEach((record) => {
                posts.push(new Post(record.get('post')))
            })
            return {success: true, posts, size: posts.length}
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get posts"
            }
        });
}


module.exports = {
    createUserPost: createUserPost,
    getUserPosts: getUserPosts,
    updateUserPost: updateUserPost
  };
const _ = require('lodash');
const Post = require('./neo4j/post')
const User = require('./neo4j/user')
const { nano, getRoleFromRelationship} = require('../utils/Utils')
const imgUtils = require('../utils/images')
const Notification = require("../models/notification")
const { ROLES } = require("../models/neo4j/community");
const Community = require("./community")
const { FEED_SORT } = require("./neo4j/post");

const createPost = function (session, authorWalletAddress, body, imageURL) {
    if (!body.text) {
        throw {
            success: false,
            message: 'Post must contain text field'
        }
    }
    const postID = nano()
    const timestamp = new Date().toISOString();

    return (async () => {
        // Check if author cannot make post inside community, if community is provided.
        if (body.communityID) {
            try {
                const memberCheck = await Community.isRole(session, authorWalletAddress, body.communityID, ROLES.MEMBER.type)
                if (!memberCheck.success) {
                    return {
                        success: false,
                        message: "User or Community does not exist."
                    }
                }
                if (!memberCheck.result) {
                    return {
                        success: false,
                        message: "You are not a member of this community"
                    }
                }
                const bannedResult = await Community.isRole(session, authorWalletAddress, body.communityID, ROLES.BANNED.type)
                if (bannedResult.result) {
                    return {
                        success: false,
                        message: "You are banned from this community"
                    }
                }
            }
            catch (error) {
                throw {
                    success: false,
                    message: "Failed to create Post",
                    error: error.message
                }
            }
        }

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
                            imageURL: imageURL, // optional
                            author: authorWalletAddress,
                            timestamp: timestamp
                        })
                            .then((result2) => {
                                if (body.communityID) {
                                    Community.linkPost(session, authorWalletAddress, postID, body.communityID)
                                }
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
                        error: error.message
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
                imageURL: imageURL, // optional
                author: authorWalletAddress,
                timestamp: timestamp
            })
                .then((result) => {
                    if (body.communityID) {
                        Community.linkPost(session, authorWalletAddress, postID, body.communityID)
                    }
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
                        error: error.message
                    }
                });
        }
    })();
};

const createComment = function (session, authorWalletAddress, postID, body) {
    if (!body.text) {
        throw {
            success: false,
            message: 'Invalid comment properties'
        }
    }
    const commentPostID = nano()
    const timestamp = new Date().toISOString();

    return (async () => {
        try {
            const postCheck = await getPostByID(session, null, postID)
            if (!postCheck.success) {
                throw { message: postCheck.message }
            }
            if (postCheck.post.community) {
                const bannedCheck = await Community.isRole(session, authorWalletAddress, postCheck.post.community, ROLES.BANNED.type)
                if (bannedCheck.result) {
                    return {
                        success: false,
                        message: `You are banned from this community`
                    }
                }
            }
        } catch (error) {
            throw {
                success: false,
                message: "Failed to create comment.",
                error: error.message
            }
        }

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
    })();
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
        'OPTIONAL MATCH (post)-[:POSTED_TO]->(com: Community)',
        `RETURN DISTINCT author, post, count(c) AS comment, count(l) AS likes, repost, repostAuthor, com.communityID`,
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
                postRecord.community = record.get('com.communityID') ? String(record.get('com.communityID')) : null
                if (postRecord.repostPostID) {
                    if (!record.get('repost')) postRecord.repostPostID = "removed"
                    else {
                        postRecord.repostPost = new Post(record.get('repost'))
                        postRecord.repostPost.author = new User(record.get('repostAuthor'))
                    }
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

const getPostByID = async function (session, walletAddress, postID) {
    const query = [
        `MATCH (author:User)-[:POSTED]->(post:Post {postID: $postID})`,
        `OPTIONAL MATCH (repost:Post)`,
        `WHERE repost.postID = post.repostPostID`,
        `OPTIONAL MATCH (repostAuthor:User)`,
        `WHERE repostAuthor.walletAddress = repost.author`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `WHERE post.author = author.walletAddress`,
        `OPTIONAL MATCH (post)-[:POSTED_TO]->(com: Community)`,
        `OPTIONAL MATCH (author)-[mod_link:MODERATES]->(com)`,
        `WHERE post.postID = $postID`,
        `RETURN DISTINCT author, post, count(c) AS comment, repost, repostAuthor, com.communityID, mod_link`
    ].join('\n');

    try {
        const postQuery = await session.run(query, {
            postID: postID
        })

        let record = postQuery.records[0]
        let post = new Post(record.get('post'))
        post.author = new User(record.get('author'))
        post.comment = String(record.get("comment").low);
        post.community = record.get('com.communityID') ? String(record.get('com.communityID')) : null
        if (post.repostPostID) {
            if (!record.get('repost')) post.repostPostID = "removed"
            else {
                post.repostPost = new Post(record.get('repost'))
                post.repostPost.author = new User(record.get('repostAuthor'))
            }
        }
        if (record.get('mod_link')) post.verified = true
        post.author.roles = []
        post.alreadyLiked = false

        // Check if post was liked by user
        if (walletAddress !== null) {
            const checkLiked = await checkIfAlreadyLiked(session, postID, walletAddress)
            if (checkLiked.success) post.alreadyLiked = checkLiked.alreadyLiked;
            else {
                throw {
                    success: false,
                    message: "Failed to check if post was already liked",
                }
            }
        }

        // Get author roles
        if (post.community) {
            const query2 = [
                'MATCH (user: User {walletAddress: $authorWalletAddress})-[r]->(c: Community {communityID: $communityID})',
                'RETURN DISTINCT user.walletAddress, type(r)'
            ].join('\n');

            const rolesQuery = await session.run(query2, {
                authorWalletAddress: post.author.walletAddress,
                communityID: post.community
            })

            rolesQuery.records.forEach((record) => {
                var postWalletAddress = record.get("user.walletAddress")
                var relationship = record.get("type(r)")
                if (post.author.walletAddress === postWalletAddress)
                    post.author.roles.push(getRoleFromRelationship(relationship))
            })
        }

        return {
            success: true,
            post: post
        }
    } catch (error) {
        throw {
            success: false,
            message: "Failed to get posts",
            error: error.message
        }
    }
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
                error: error.message
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
                message: "Failed like Post",
                error: error.message
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

const getUserFeed = async function (session, walletAddress, start, size, sortType, sortOrder) {
    sortType = sortType.toLowerCase(), sortOrder = sortOrder.toLowerCase()

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
    } else if (!Object.values(FEED_SORT.TYPES).includes(sortType)) {
        throw {
            success: false,
            message: "Invalid sort type"
        }
    } else if (!Object.values(FEED_SORT.ORDER).includes(sortOrder)) {
        throw {
            success: false,
            message: "Invalid sort order"
        }
    }

    const orderBy = sortType === FEED_SORT.TYPES.TIMESTAMP ? "post.timestamp" : "post.likes",
        order = sortOrder === FEED_SORT.ORDER.DESC ? "DESC" : ""

    var query = ""
    if (walletAddress !== null) {
        query = [
            `CALL {`,
            `MATCH (currentUser: User {walletAddress: $walletAddress})-[:FOLLOWS]->(author:User)-[:POSTED]->(post: Post)`,
            `WHERE post.parent IS NULL`, // Prevent comments in feed
            `OPTIONAL MATCH (currentUser)-[l:LIKED]->(post)`,
            `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
            `OPTIONAL MATCH (repost:Post)`,
            `WHERE repost.postID = post.repostPostID`,
            `OPTIONAL MATCH (repostAuthor:User)`,
            `WHERE repostAuthor.walletAddress = repost.author`,
            `OPTIONAL MATCH (post)-[:POSTED_TO]->(com: Community)`,
            `OPTIONAL MATCH (author)-[mod_link:MODERATES]->(com)`,
            `RETURN DISTINCT currentUser, post, author, repost, repostAuthor, count(l) AS likes, count(c) AS comment, com.communityID AS communityID, mod_link`,
            `ORDER BY ${orderBy} ${order}`,

            `UNION`,

            `MATCH (currentUser)-[:JOINS]->(:Community)<-[:POSTED_TO]-(post: Post)`,
            `WHERE post.parent IS NULL`, // Prevent comments in feed
            `OPTIONAL MATCH (author:User)`,
            `WHERE author.walletAddress = post.author`,
            `OPTIONAL MATCH (currentUser)-[l:LIKED]->(post)`,
            `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
            `OPTIONAL MATCH (repost:Post)`,
            `WHERE repost.postID = post.repostPostID`,
            `OPTIONAL MATCH (repostAuthor:User)`,
            `WHERE repostAuthor.walletAddress = repost.author`,
            `OPTIONAL MATCH (post)-[:POSTED_TO]->(com: Community)`,
            `OPTIONAL MATCH (author)-[mod_link:MODERATES]->(com)`,
            `RETURN DISTINCT currentUser, post, author, repost, repostAuthor, count(l) AS likes, count(c) AS comment, com.communityID AS communityID, mod_link`,
            `}`,
            `RETURN DISTINCT currentUser, post, author, repost, repostAuthor, likes, comment, communityID, mod_link`,
            `ORDER BY ${orderBy} ${order}`,
            `SKIP toInteger($start)`,
            `LIMIT toInteger($size)`
        ].join('\n');
    } else {
        query = [
            `MATCH (author:User)-[:POSTED]->(post: Post)`,
            `WHERE post.parent IS NULL`, // Prevent comments in feed
            `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
            `OPTIONAL MATCH (repost:Post)`,
            `WHERE repost.postID = post.repostPostID`,
            `OPTIONAL MATCH (repostAuthor:User)`,
            `WHERE repostAuthor.walletAddress = repost.author`,
            `OPTIONAL MATCH (post)-[:POSTED_TO]->(com: Community)`,
            `OPTIONAL MATCH (author)-[mod_link:MODERATES]->(com)`,
            `RETURN DISTINCT post, author, repost, repostAuthor, 0 AS likes, count(c) AS comment, com.communityID AS communityID, mod_link`,
            `ORDER BY ${orderBy} ${order}`,
            `SKIP toInteger($start)`,
            `LIMIT toInteger($size)`
        ].join('\n');
    }

    try {
        const feedQuery = await session.run(query, {
            walletAddress: walletAddress,
            start: start,
            size: size
        })
        let posts = []
        feedQuery.records.forEach(async (record) => {
            let post = new Post(record.get("post"))
            post.author = new User(record.get("author"))
            post.comment = String(record.get("comment").low);
            post.community = record.get('communityID') ? String(record.get('communityID')) : null
            post.alreadyLiked = record.get('likes').low > 0
            if (post.repostPostID) {
                if (!record.get('repost')) post.repostPostID = "removed"
                else {
                    post.repostPost = new Post(record.get('repost'))
                    post.repostPost.author = new User(record.get('repostAuthor'))
                }
            }
            if (record.get('mod_link')) post.verified = true
            post.author.roles = []
            posts.push(post)
        })

        const query2 = [
            `UNWIND $posts as post`,
            'MATCH (user: User {walletAddress: post.author.walletAddress})-[r]->(c: Community {communityID: post.community})',
            'RETURN DISTINCT user.walletAddress, type(r)'
        ].join('\n');

        const rolesQuery = await session.run(query2, {
            posts: posts
        })

        rolesQuery.records.forEach((record) => {
            var postWalletAddress = record.get("user.walletAddress")
            var relationship = record.get("type(r)")
            posts.map((post) => {
                if (post.author.walletAddress === postWalletAddress)
                    post.author.roles.push(getRoleFromRelationship(relationship))
            })
        })


        return {
            success: true,
            posts: posts
        }
    } catch (error) {
        throw {
            success: false,
            message: "Failed to get feed",
            error: error.message
        }
    }
}

const deletePostsByID = function (session, postList) {
    const query = [
        'MATCH (p: Post)',
        'WHERE p.postID IN $postList',
        'OPTIONAL MATCH (c:Post)-[:COMMENTED_ON]->(p)',
        'DETACH DELETE c, p',
    ].join("\n")

    return session.run(query, {
        postList: postList
    })
        .then(result => {
            return {
                success: true,
                message: "Successfully deleted provided posts."
            }
        })
}

const removeCommunityPostsFromUser = function (session, communityID, walletAddress) {
    const query = [
        'MATCH (u: User {walletAddress: $walletAddress})-[:POSTED]->(p: Post)-[:POSTED_TO]->(c: Community {communityID: $communityID})',
        'RETURN p.postID AS id'
    ].join("\n")

    return session.run(query, {
        walletAddress: walletAddress,
        communityID: communityID
    })
        .then(postsResult => {
            let posts = []
            postsResult.records.forEach(postRecord => {
                posts.push(postRecord.get('id'))
            })
            return deletePostsByID(session, posts)
        })
}

const deletePost = function (session, walletAddress, postID) {
    return getPostByID(session, null, postID)
        .then(postCheck => {
            if (postCheck.post.author.walletAddress !== walletAddress) {
                throw {
                    success: false,
                    message: "User is not the author of the post"
                }
            }
            return deletePostsByID(session, [postID])
                .then(result => {
                    return {
                        success: true,
                        message: "Successfully deleted post"
                    }
                })
        })
        .catch(error => {
            throw {
                success: false,
                message: "Failed to delete post",
                error: error.message
            }
        })
}

const search = function (session, searchVal, walletAddress, start, size, sortType, sortOrder) {
    sortType = sortType.toLowerCase(), sortOrder = sortOrder.toLowerCase()

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
    } else if (!Object.values(FEED_SORT.TYPES).includes(sortType)) {
        throw {
            success: false,
            message: "Invalid sort type"
        }
    } else if (!Object.values(FEED_SORT.ORDER).includes(sortOrder)) {
        throw {
            success: false,
            message: "Invalid sort order"
        }
    }

    const orderBy = sortType === FEED_SORT.TYPES.TIMESTAMP ? "post.timestamp" : "post.likes",
        order = sortOrder === FEED_SORT.ORDER.DESC ? "DESC" : ""

    const regex = `(?i).*${searchVal}.*`
    const query = [
        `MATCH (author:User)-[:POSTED]->(post: Post)`,
        `WHERE post.parent IS NULL AND post.text =~ $regex`, // Prevent comments in feed
        `OPTIONAL MATCH (user:User{walletAddress: $walletAddress})-[l:LIKED]->(post)`,
        `OPTIONAL MATCH (comments:Post)-[c:COMMENTED_ON]->(post)`,
        `OPTIONAL MATCH (repost:Post)`,
        `WHERE repost.postID = post.repostPostID`,
        `OPTIONAL MATCH (repostAuthor:User)`,
        `WHERE repostAuthor.walletAddress = repost.author`,
        `OPTIONAL MATCH (post)-[:POSTED_TO]->(com: Community)`,
        `RETURN DISTINCT post, author, repost, repostAuthor, count(l) AS likes, count(c) AS comment, com.communityID AS communityID`,
        `ORDER BY ${orderBy} ${order}`,
        `SKIP toInteger($start)`,
        `LIMIT toInteger($size)`
    ].join('\n');

    return session.run(query, {
        regex: regex,
        walletAddress: walletAddress,
        start: start,
        size: size
    })
        .then((results) => {
            let posts = []
            results.records.forEach((record) => {
                let post = new Post(record.get("post"))
                post.author = new User(record.get("author"))
                post.comment = String(record.get("comment").low);
                post.community = record.get('communityID') ? String(record.get('communityID')) : null
                post.alreadyLiked = record.get('likes').low > 0
                if (post.repostPostID) {
                    if (!record.get('repost')) post.repostPostID = "removed"
                    else {
                        post.repostPost = new Post(record.get('repost'))
                        post.repostPost.author = new User(record.get('repostAuthor'))
                    }
                }

                posts.push(post)
            })
            return {
                success: true,
                posts: posts
            }
        })
        .catch((error) => {
            console.log(error)
            throw {
                success: false,
                message: "Failed to search posts",
                error: error.message
            }
        })
}

module.exports = {
    createPost,
    createComment,
    getPostsByUser,
    update,
    getPostByID,
    getCommentsByPost,
    likePost,
    unlikePost,
    getLikesOnPost,
    checkIfAlreadyLiked,
    getUserFeed,
    deletePostsByID,
    removeCommunityPostsFromUser,
    delete: deletePost,
    search
};
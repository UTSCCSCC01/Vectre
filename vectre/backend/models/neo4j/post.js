const _ = require('lodash');

const Post = module.exports = function (_node) {
    _.extend(this, {
        "postID": _node.properties["postID"],
        "author": _node.properties["author"],
        "text": _node.properties["text"],
        "imageURL": _node.properties["imageURL"] ? _node.properties["imageURL"] : null,
        "edited": _node.properties["edited"],
        "timestamp": _node.properties["timestamp"],
        "likes": _node.properties["likes"].low,

        "parent": _node.properties["parent"] ? _node.properties["parent"] : null,
        "repostPostID": _node.properties["repostPostID"] ? _node.properties["repostPostID"] : null,
    })
};

module.exports.FEED_SORT = {
    TYPES: {
        TIMESTAMP: "timestamp",
        LIKES: "likes"
    },
    ORDER: {
        ASC: "asc",
        DESC: "desc"
    },
}
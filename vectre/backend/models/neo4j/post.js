const _ = require('lodash');

const Post = module.exports = function (_node) {
    _.extend(this, {
        "postID": _node.properties["postID"],
        "author": _node.properties["author"],
        "text": _node.properties["text"],
        "imageURL": _node.properties["imageURL"] ? _node.properties["imageURL"] : null,
        "edited": _node.properties["edited"],
        "parent": _node.properties["parent"] ? _node.properties["parent"] : null,
        "timestamp": _node.properties["timestamp"],
        "likes": _node.properties["likes"].low,

        "isRepost": _node.properties["isRepost"],
        "repostID": _node.properties["repostID"],
        "repostAuthor": _node.properties["repostAuthor"],
        "repostText": _node.properties["repostText"],
        "repostImageURL": _node.properties["repostImageURL"] ? _node.properties["repostImageURL"] : null,
        "repostEdited": _node.properties["repostEdited"],
        "repostTimestamp": _node.properties["repostTimestamp"],
    })
};
const _ = require("lodash")

const User = module.exports = function (_node) {
    _.extend(this, {
        "walletAddress": _node.properties["walletAddress"],
        "username": _node.properties["username"],
        "name": _node.properties["name"],
        "bio": _node.properties["bio"],
        "nonce": _node.properties["nonce"],
        "profilePic": _node.properties["profilePic"],
        "following": [],
        "followers": [],
        "dashboard": _node.properties["dashboard"],
    })
}
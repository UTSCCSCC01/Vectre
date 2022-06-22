const _ = require("lodash")

const User = module.exports = function (_node) {
    _.extend(this, {
        "id": _node.properties["id"],
        "wallet_address": _node.properties["wallet_address"],
        "username": _node.properties["username"],
        "name": _node.properties["name"],
        "bio": _node.properties["bio"],
        "nonce": _node.properties["nonce"],
        "following": [],
        "followers": [],
    })
}
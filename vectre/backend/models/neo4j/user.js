const _ = require("lodash")

const User = module.exports = function (_node)  {
    _.extend(this, {
        "id": _node.properties["id"],
        "name": _node.properties["name"],
        "username": _node.properties["username"],
        "bio" : _node.properties["username"],
        "wallet_address": _node.properties["wallet_address"],
    })
}
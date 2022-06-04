const _ = require("lodash")

const User = module.exports = function (_node)  {
    _.extend(this, {
        "id": _node.properties["id"],
        "name": _node.properties["name"],
        "wallet_address": _node.properties["wallet_address"],
        "bio": _node.properties["bio"],
        "dashboard": _node.properties["dashboard"],
    })
}
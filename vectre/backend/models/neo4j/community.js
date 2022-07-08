const _ = require ('lodash')

const Community = module.exports = function (_node) {
    _.extend(this, {
        "communityID": _node.properties["communityID"],
        "name": _node.properties["name"],
        "bio": _node.properties["bio"],
        "NFTgroup": _node.properties["NFTgroup"],
        "memberCount": _node.properties["memberCount"].low,
    })
}
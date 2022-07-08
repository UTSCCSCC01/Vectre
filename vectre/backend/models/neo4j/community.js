const _ = require ('lodash')

const Community = module.exports = function (_node) {
    _.extend(this, {
        "communityID": _node.properties["communityID"],
        "name": _node.properties["name"],
        "bio": _node.properties["bio"],
        "memberCount": _node.properties["memberCount"].low,
        "profilePic": _node.properties["profilePic"] ? _node.properties["profilePic"] : null,
        "banner": _node.properties["banner"] ? _node.properties["banner"] : null,
    })
}
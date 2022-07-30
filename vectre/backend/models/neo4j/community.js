const _ = require ('lodash')

const Community = module.exports = function (_node) {
    _.extend(this, {
        "communityID": _node.properties["communityID"],
        "name": _node.properties["name"],
        "bio": _node.properties["bio"],
        "memberCount": _node.properties["memberCount"].low,
        "profilePic": _node.properties["profilePic"] ? _node.properties["profilePic"] : null,
        "banner": _node.properties["banner"] ? _node.properties["banner"] : null,

        "discordLink": _node.properties["discordLink"] ? _node.properties["discordLink"] : null,
        "instagramLink": _node.properties["instagramLink"] ? _node.properties["instagramLink"] : null,
        "twitterLink": _node.properties["twitterLink"] ? _node.properties["twitterLink"] : null,
        "websiteLink": _node.properties["websiteLink"] ? _node.properties["websiteLink"] : null,
        "ethLink": _node.properties["ethLink"] ? _node.properties["ethLink"] : null,
    })
}

module.exports.ROLES = {
    MEMBER: {
        type: "member",
        relationship: "JOINS"
    },
    MODERATOR: {
        type: "moderator",
        relationship: "MODERATES"
    },
    OWNER: {
        type: "owner",
        relationship: "OWNS"
    }
}
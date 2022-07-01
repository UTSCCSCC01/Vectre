const _ = require("lodash")

const Notification = module.exports = function (_node) {
    _.extend(this, {
        "notificationID": _node.properties["notificationID"],
        "toUser": _node.properties["toUser"],
        "fromUser": _node.properties["fromUser"],
        "action": _node.properties["action"],
        "postID": _node.properties["postID"],
        "read": _node.properties["read"],
        "timestamp": _node.properties["timestamp"]
    })
}
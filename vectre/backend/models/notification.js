const _ = require('lodash');
const Notification = require('./neo4j/notification');
const User = require('./neo4j/user');
const {nano} = require("../utils/Utils");

const ACTIONS = {
    LIKED: "like",
    COMMENTED: "comment",
    FOLLOWED: "follow",
}

function create(session, action, toUser, fromUser, postID=null) {
    action = action.toLowerCase()
    if (!Object.values(ACTIONS).includes(action)) {
        throw {
            success: false,
            message: "Invalid action. Valid actions are: \"Like\", \"Comment\", \"Follow\"",
        }
    } else if ([ACTIONS.LIKED, ACTIONS.COMMENTED].includes(action) && !postID) {
        throw {
            success: false,
            message: 'Must provide postID from Like or Comment actions'
        }
    } else if (!action || !toUser || !fromUser) {
        throw {
            success: false,
            message: 'Invalid Notification properties'
        }
    } else if (toUser === fromUser) {
        return new Promise((resolve) => {
           resolve({
               success: false,
               message: 'Cannot create notification between same user'
           })
        })
    }

    const notificationID = nano(), timestamp = new Date().toISOString()
    const query = `CREATE (notif:Notification {notificationID: '${notificationID}', toUser: '${toUser}', fromUser: '${fromUser}', action: '${action}', postID: '${postID}', timestamp: '${timestamp}', read: false});`
    return session.run(query)
        .then((results) => {
            return {
                success: true,
                message: "Created Notification"
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to create Notification",
                error: error.message
            }
        })
};

const read = function (session, readerWalletAddress, notificationID) {
    const query = [
        `MATCH (notif:Notification {notificationID: '${notificationID}'})`,
        `SET notif.read = true`,
        `RETURN notif`,
    ].join('\n');

    return session.run(query)
        .then((results) => {
            if (_.isEmpty(results.records)) {
                throw {
                    success: false,
                    message: `Notification ${notificationID} does not exist`
                }
            } else {
                return {
                    success: true,
                    message: "Successfully read notification"
                }
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to read notification",
                error: error.message
            }
        });
}

const getUserNotifications = function (session, walletAddress) {
    const query = [
        `MATCH (notification:Notification {toUser:'${walletAddress}'})`,
        `WITH notification`,
        `MATCH (fromUser:User)`,
        `WHERE fromUser.walletAddress = notification.fromUser`,
        `RETURN notification, fromUser`,
        `ORDER BY notification.timestamp DESC`
    ].join('\n');

    return session.run(query)
        .then((results) => {
            let notifications = [], hasUnreadNotif = false
            results.records.forEach((record) => {
                let notif = new Notification(record.get('notification'))
                notif.fromUser = new User(record.get('fromUser'))

                notifications.push(notif)
                if (notif.read === false)
                    hasUnreadNotif = true
            })
            return {
                success: true,
                notifications: notifications,
                unread: hasUnreadNotif
            }
        })
        .catch((error) => {
            throw {
                success: false,
                message: "Failed to get notifications"
            }
        });
}


module.exports = {
    create,
    read,
    getUserNotifications
};
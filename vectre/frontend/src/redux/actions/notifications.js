import { READ_NOTIFICATION } from "../constants/notifications"

export const readNotification = (notificationID) => ({
    type: READ_NOTIFICATION,
    notificationID
})
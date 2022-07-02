import { READ_NOTIFICATION } from "../constants/notification"

export const readNotification = (notificationID) => ({
    type: READ_NOTIFICATION,
    notificationID
})
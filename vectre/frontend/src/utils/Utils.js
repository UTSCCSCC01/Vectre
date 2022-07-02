import Moment from 'moment';
import DEFAULT_AVATAR from "../assets/images/default-avatar.png"
import DEFAULT_BANNER from "../assets/images/default-banner.png"

// assumes isoString is valid
export const formatISO = (isoString) => {
    // timestamp example format: "4:32 PM · May 26, 2022",
    return Moment(isoString).format('h[:]mm A [·] MMM D[,] YYYY').toString();
};

// assumes num is a valid number
export const formatLikes = (num) => {
    if (num === undefined) {
        return "0";
    }
    return num.toString();
};

// assumes isoString is valid
// checks if isoString is within 24 hours of current time
export const within24 = (isoString) => {
    const currentTime = Moment();
    const postTime = Moment(isoString);
    return currentTime.diff(postTime, 'hours') <= 24;
};

export const getAvatarOrDefault = (avatarLink) => {
    if (!avatarLink || avatarLink === "") return DEFAULT_AVATAR
    else return avatarLink
}
export const getBannerOrDefault = (bannerLink) => {
    if (!bannerLink || bannerLink === "") return DEFAULT_BANNER
    else return bannerLink
}
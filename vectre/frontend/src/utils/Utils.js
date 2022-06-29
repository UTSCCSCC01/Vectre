import Moment from 'moment';

// assumes isoString is valid
export const formatISO = (isoString) => {
    // timestamp example format: "4:32 PM · May 26, 2022",
    return Moment(isoString).format('h[:]mm A [·] MMM D[,] YYYY').toString();
};

// assumes isoString is valid
// checks if isoString is within 24 hours of current time
export const within24 = (isoString) => {
    const currentTime = Moment();
    const postTime = Moment(isoString);
    return currentTime.diff(postTime, 'hours') <= 24;
};
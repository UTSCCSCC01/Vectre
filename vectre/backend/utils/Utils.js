const { nanoid } = require("nanoid");

// generates a random ID
const nano = () => {
    return nanoid().split("").map(char => char = char === "-" ? Math.random().toString(36)[2] : char).join('');
};

module.exports = {
    nano
}
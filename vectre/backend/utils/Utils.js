const _ = require('lodash')
const { nanoid } = require("nanoid");
const { ROLES } = require("../models/neo4j/community");

// generates a random ID
const nano = () => {
    return nanoid().split("").map(char => char = char === "-" ? Math.random().toString(36)[2] : char).join('');
};

// assumes that role is one of the following: "member", "moderator", "owner"
const getRelationshipFromRole = (role) => {
    return _.toArray(ROLES).filter(elem => elem.type === role)[0].relationship;
};

module.exports = {
    nano,
    getRelationshipFromRole
}
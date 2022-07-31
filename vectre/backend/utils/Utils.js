const _ = require('lodash')
const { nanoid } = require("nanoid");
const { ROLES } = require("../models/neo4j/community");

// generates a random ID
const nano = () => {
    return nanoid().split("").map(char => char = char === "-" ? Math.random().toString(36)[2] : char).join('');
};

// assumes that role is one of the following: "member", "moderator", and "banned"
const getRelationshipFromRole = (role) => {
    return _.toArray(ROLES).filter(elem => elem.type === role)[0].relationship;
};

// assumes that relationship is one of the following: "JOINS", "MODERATES", and "BANNED_FROM"
const getRoleFromRelationship = (relationship) => {
    return _.toArray(ROLES).filter(elem => elem.relationship === relationship)[0].type;
};

module.exports = {
    nano,
    getRelationshipFromRole,
    getRoleFromRelationship
}
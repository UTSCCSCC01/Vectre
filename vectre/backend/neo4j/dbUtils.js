"use strict";

const config = require('../config');

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    config.neo4j.url,
    neo4j.auth.basic(config.neo4j.username, config.neo4j.password)
);

exports.getSession = function (context) {
    if (context.neo4jSession) {
        return context.neo4jSession;
    } else {
        context.neo4jSession = driver.session({ database: "neo4j" });
        return context.neo4jSession;
    }
};

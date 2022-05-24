"use strict";

const config = require('./config');

const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    config.get("neo4j").uri,
    neo4j.auth.basic(config.get("neo4j").username, config.get("neo4j").password)
);

exports.getSession = function (context) {
  if(context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

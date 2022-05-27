'use strict';

require('dotenv').config();

const config = {
    "neo4j": {
        uri: process.env.NEO4J_DB_URI,
        username: process.env.NEO4J_DB_USERNAME,
        password: process.env.NEO4J_DB_PASSWORD,
    },
}

module.exports = config;
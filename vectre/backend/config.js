'use strict';

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`}); // Ensure to pass NODE_ENV=development or NODE_ENV=production when running

const config = {
    "neo4j": {
        url: process.env.NEO4J_DB_URL,
        username: process.env.NEO4J_DB_USERNAME,
        password: process.env.NEO4J_DB_PASSWORD,
    },
}

module.exports = config;
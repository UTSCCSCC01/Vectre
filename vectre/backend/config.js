'use strict';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }); // Ensure to pass NODE_ENV=development or NODE_ENV=production when running

const config = {
    "frontendBaseUrl": process.env.FRONTEND_BASE_URL,
    "neo4j": {
        url: process.env.NEO4J_DB_URL,
        username: process.env.NEO4J_DB_USERNAME,
        password: process.env.NEO4J_DB_PASSWORD,
    },
    "jwtSecretToken": process.env.JWT_SECRET_TOKEN,
    "imgur": {
        "clientID" : "93e7bda34aac36a"
    }
}

module.exports = config;
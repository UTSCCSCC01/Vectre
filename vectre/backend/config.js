"use strict";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` }); // Ensure to pass NODE_ENV=development or NODE_ENV=production when running

const config = {
  frontend_base_url: process.env.FRONTEND_BASE_URL,
  neo4j: {
    url: process.env.NEO4J_DB_URL,
    // url: "bolt://localhost:7687",
    username: process.env.NEO4J_DB_USERNAME,
    password: process.env.NEO4J_DB_PASSWORD,
  },
  jwt_secret_token: process.env.JWT_SECRET_TOKEN,
};

module.exports = config;

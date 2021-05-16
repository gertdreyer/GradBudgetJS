const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
    // connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false },
});

client
    .connect()
    .then(() => console.log("Database connection established..."))
    .catch((e) => console.log(e));

module.exports = client;

const { Client } = require("pg");
const client = new Client({
    host: process.env.DATABASE_SERVER || "localhost",
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "postgres",
});

client
    .connect()
    .then(() => console.log("Database connection established..."))
    .catch((e) => console.log(e));

module.exports = client;

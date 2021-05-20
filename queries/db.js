const { Client } = require("pg");
if (process.NODE_ENV == "development") {
    require("dotenv").config();
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

client
    .connect()
    .then(() => console.log("Database connection established..."))
    .catch((e) => console.log(e));

module.exports = client;

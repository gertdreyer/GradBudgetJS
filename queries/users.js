const client = require("./db");

const createUser = async (queryParams) => {
    let query = `
        INSERT INTO users(oauthlink) VALUES ($1)
        RETURNING userid, oauthlink;
    `;

    try {
        const result = await client.query(query, queryParams);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error creating user";
    }
};

const getUsers = async () => {
    let query = `
        SELECT userid, oauthlink
	    FROM users;
    `;

    try {
        const result = await client.query(query);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error getting users";
    }
};

module.exports = {
    createUser,
    getUsers,
};

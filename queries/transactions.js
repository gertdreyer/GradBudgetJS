const client = require("./db");

const getTransactions = async () => {
    const query = `
        SELECT userexpenceid, description, amount, categoryid, userid
        FROM usertransactions;
    `;

    try {
        const result = await client.query(query);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error getting data";
    }
};

const createTransaction = async (queryParams) => {
    const query = `
        INSERT INTO usertransactions
        (
            description, 
            amount, 
            categoryid, 
            userid
        )
        VALUES ($1, $2, $3, $4);
    `;

    try {
        await client.query(query, queryParams);
        return "Transaction successfully created";
    } catch (e) {
        console.log(e);
        return "Error inserting data";
    }
};

module.exports = {
    getTransactions,
    createTransaction,
};

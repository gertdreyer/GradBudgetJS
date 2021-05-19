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

const getTransactionsForUser = async (queryParams) => {
    const query = `
    SELECT userexpenceid, description, amount, categoryid, userid
    FROM usertransactions WHERE userid = $1;
`;

    try {
        const result = await client.query(query, queryParams);
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

const updateTransaction = async (queryParams) => {
    let query = `
        UPDATE usertransactions
        SET description=$2, amount=$3
        WHERE userexpenceid = $1;
    `;

    try {
        await client.query(query, queryParams);
        return "Transaction updated successfully";
    } catch (e) {
        console.log(e);
        return "Error updating transaction";
    }
};

const getTransactionsForUserById = async (queryParams) => {
    console.log(queryParams);

    let query = `
        SELECT userexpenceid, description, amount, categoryid, userid
        FROM usertransactions WHERE userid = $1 AND userexpenceid = $2;
    `;

    try {
        const result = await client.query(query, queryParams);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error getting data";
    }
};

module.exports = {
    getTransactions,
    getTransactionsForUser,
    createTransaction,
    updateTransaction,
    getTransactionsForUserById,
};

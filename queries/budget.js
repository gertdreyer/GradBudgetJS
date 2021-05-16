const client = require("./db");

const getBudgets = async () => {
    let query = `
        SELECT usercategoryid, catagoryname, userid, budget
        FROM usercatagories;
    `;

    try {
        const result = await client.query(query);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error getting budgets";
    }
};

//Still In-Progress - Will complete when we know exactly how we're getting UID's
const getBudgetsForUser = async (queryParams) => {
    let query = `
        SELECT usercategoryid, catagoryname, userid, budget
        FROM usercatagories;
    `;

    try {
        const result = await client.query(query, queryParams);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error getting budgets";
    }
};

const createBudget = async (queryParams) => {
    let query = `
        INSERT INTO usercatagories
        (
            catagoryname, 
            userid, 
            budget
        )
        VALUES ($1, $2, $3);
    `;

    try {
        await client.query(query, queryParams);
        return "Budget successfully created";
    } catch (e) {
        console.log(e);
        return "Error creating budget";
    }
};

const updateBudgetById = async (queryParams) => {
    let query = `
        UPDATE usercatagories
        SET catagoryname=$2, budget=$3
        WHERE usercategoryid = $1;
    `;

    try {
        await client.query(query, queryParams);
        return "Budget successfully updated";
    } catch (e) {
        console.log(e);
        return "Error updating budget";
    }
};

module.exports = {
    getBudgets,
    getBudgetsForUser,
    createBudget,
    updateBudgetById,
};

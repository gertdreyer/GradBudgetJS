const client = require("./db");

const getBudgets = async () => {
    let query = `
        SELECT usercategoryid, categoryname, userid, budget
        FROM usercategories;
    `;

    try {
        const result = await client.query(query);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error getting budgets";
    }
};

const getBudgetsForUser = async (queryParams) => {
    let query = `
        SELECT usercategoryid, categoryname, userid, budget
        FROM usercategories WHERE userid = $1;
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
        INSERT INTO usercategories
        (
            categoryname, 
            budget,
            userid
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
        UPDATE usercategories
        SET categoryname=$2, budget=$3
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

const getBudgetsForUserById = async (queryParams) => {
    let query = `
    SELECT usercategoryid, categoryname, userid, budget
    FROM usercategories WHERE userid = $1 AND usercategoryid = $2;
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
    getBudgets,
    getBudgetsForUser,
    createBudget,
    updateBudgetById,
    getBudgetsForUserById,
};

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

const getBudgetsForUser = async (queryParams) => {
    let query = `
        SELECT usercategoryid, catagoryname, userid, budget
        FROM usercatagories WHERE userid = $1;
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

const getBudgetUsageForUser = async (queryParams) => {
    let query = `
    SELECT catagoryname, usercategoryid,budget, Sum(amount) AS used FROM usercatagories uc
    INNER JOIN usertransactions ut ON uc.USERid = ut.userid 
    WHERE ut.userid = $1 ::int
    GROUP BY catagoryname, usercategoryid
    `;

    try {
        const result = await client.query(query, queryParams);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error retrieving budget";
    }
};

module.exports = {
    getBudgets,
    getBudgetsForUser,
    createBudget,
    updateBudgetById,
};

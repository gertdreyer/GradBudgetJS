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

// eslint-disable-next-line no-unused-vars
const getBudgetUsageForUser = async (queryParams) => {
    let query = `
        SELECT DATE_TRUNC('month',DATE) as month,catagoryname, usercategoryid,budget, Sum(amount) AS used FROM usercatagories uc
        INNER JOIN usertransactions ut ON uc.USERid = ut.userid 
        WHERE ut.userid =  $1 ::int
        GROUP BY month,catagoryname, usercategoryid
    `;

    try {
        const result = await client.query(query, queryParams);
        return result.rows;
    } catch (e) {
        console.log(e);
        return "Error retrieving budget";
    }
};

const getBudgetChartdata = async (queryParams) => {
    let query = `
    WITH months AS (
        select generate_series(
          date(date_trunc('month', NOW()::DATE) - '1 year'::INTERVAL ) ,
          date(date_trunc('day', NOW()::date)), 
          '1 month'::interval
        ) as month )
        
        
         SELECT month,categoryname, usercategoryid,COALESCE(budget,0 :: money) AS budget, 
         COALESCE(Sum(amount),0 :: money) AS used FROM months
                LEFT JOIN usertransactions ut ON ut.userid = $1::int AND MONTH = DATE_TRUNC('month', ut.date)
                  LEFT JOIN usercategories uc ON ut.categoryid = ut.categoryid
                GROUP BY month,categoryname, usercategoryid
                ORDER BY month
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
    getBudgetChartdata,
};

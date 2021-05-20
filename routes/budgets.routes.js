const router = require("express").Router();
const navlist = require("./navlist");

const {
    getBudgetsForUser,
    createBudget,
    updateBudgetById,
    getBudgetsForUserById,
} = require("../queries/budget");

router.get("/budgets", async (req, res) => {
    const result = await getBudgetsForUser([res.locals.uid]);
    const content = {
        budget: result,
        navlist,
    };
    res.render("budget", content);
});

router.get("/budgets/:id", async (req, res) => {
    const { id } = req.params;
    const result = await getBudgetsForUserById([res.locals.uid, id]);
    const content = result[0];
    content.navlist = navlist;
    res.render("budget-edit", content);
});

router.post("/budgets", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await createBudget([...queryParams, res.locals.uid]);
    if (result === "Budget successfully created") {
        res.sendStatus(200, result);
    } else {
        res.sendStatus(503, result);
    }
});

router.put("/budgets/:id", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await updateBudgetById(queryParams);
    if (result === "Transaction updated successfully") {
        res.sendStatus(200, result);
    } else {
        res.sendStatus(503, result);
    }
});

module.exports = router;

const router = require("express").Router();
const {
    getBudgetsForUser,
    createBudget,
    updateBudgetById,
} = require("../queries/budget");

router.get("/budgets", async (req, res) => {
    const result = await getBudgetsForUser([res.locals.uid]);
    res.json(result);
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

const { getBudgets } = require("../queries/budget");
const { getTransactions } = require("../queries/transactions");
const router = require("./budgets.routes");

router.get("/allBudgets", async (req, res) => {
    console.log(req.query);
    const result = await getBudgets();
    res.json(result);
});

router.get("/allTransactions", async (req, res) => {
    console.log(req.query);
    const result = await getTransactions();
    res.json(result);
});

module.exports = router;

const router = require("express").Router();
const {
    getTransactionsForUser,
    createTransaction,
    updateTransaction,
} = require("../queries/transactions");

router.get("/transactions", async (req, res) => {
    const result = await getTransactionsForUser([res.locals.uid]);
    res.json(result);
});

router.post("/transactions", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await createTransaction([...queryParams, res.locals.uid]);
    if (result === "Transaction successfully created") {
        res.sendStatus(200, result);
    } else {
        res.sendStatus(503, result);
    }
});

router.put("/transactions/:id", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await updateTransaction(queryParams);
    if (result === "Transaction updated successfully") {
        res.sendStatus(200, result);
    } else {
        res.sendStatus(503, result);
    }
});

module.exports = router;

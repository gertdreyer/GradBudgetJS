const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");
const {
    getTransactions,
    getTransactionsForUser,
    createTransaction,
    updateTransaction,
} = require("./queries/transactions");

router.get("/profile", requiresAuth(), (req, res) => {
    res.json(req.oidc.user);
});

router.get("/", (req, res) => {
    console.log(req.query);
    let contents = {
        name: "World",
        params: `<h2 style='color:${req.query.color ?? "black"}'>${
            req.query.text ?? ""
        }</h2>`,
    };
    res.render("home", contents);
});

router.get("/transactions", async (req, res) => {
    console.log(req.query);
    const result = await getTransactions();
    res.json(result);
});

router.get("/transactions", requiresAuth(), async (req, res) => {
    console.log("auth test", req.oidc);
    const result = await getTransactionsForUser();
    res.json(result);
});

router.post("/transactions", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await createTransaction(queryParams);
    if (result === "Transaction successfully created") {
        res.sendStatus(200, "Transaction successfully created");
    } else {
        res.sendStatus(503, "Failed to create transaction");
    }
});

router.put("/transactions/:id", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await updateTransaction(queryParams);
    if (result === "Transaction updated successfully") {
        res.sendStatus(200, "Transaction successfully updated");
    } else {
        res.sendStatus(503, "Failed to update transaction");
    }
});

module.exports = router;

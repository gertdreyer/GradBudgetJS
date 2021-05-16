const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");
const {
    getTransactions,
    createTransaction,
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

router.post("/transactions", async (req, res) => {
    const queryParams = Object.values(req.body);
    await createTransaction(queryParams);
    res.sendStatus(200);
});

module.exports = router;

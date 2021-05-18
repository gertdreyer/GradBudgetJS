const router = require("express").Router();

router.get("/profile", (req, res) => {
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

module.exports = router;

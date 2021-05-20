const router = require("express").Router();
const navlist = require("./navlist");
router.get("/profile", (req, res) => {
    res.json(req.oidc.user);
});

router.get("/", (req, res) => {
    let contents = {
        name: "World",
        params: `<h2 style='color:${req.query.color ?? "black"}'>${
            req.query.text ?? ""
        }</h2>`,
        navlist,
    };
    res.render("home", contents);
});

router.get("*", (req, res) => {
    const content = {
        name: req.oidc.user.given_name,
    };
    res.render("not-found", content);
});

module.exports = router;

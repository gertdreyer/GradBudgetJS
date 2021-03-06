const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes/router");
const transactions = require("./routes/transactions.routes");
const budgets = require("./routes/budgets.routes");
const { auth } = require("express-openid-connect");
const { checkIfUserExists } = require("./cache/usersCache");
const { requiresAuth } = require("express-openid-connect");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(auth(JSON.parse(process.env.AUTH_CONF)));
app.use(requiresAuth(), checkIfUserExists);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/", transactions);
app.use("/", budgets);
app.use("/", routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./router");
const { auth } = require("express-openid-connect");

require("dotenv").config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(auth(JSON.parse(process.env.AUTH_CONF)));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

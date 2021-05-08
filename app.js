
const express = require('express')
var exphbs = require('express-handlebars');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config()



const app = express()
const port = process.env.PORT ?? 3000

app.use(auth(JSON.parse(process.env.AUTH_CONF)))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/profile', requiresAuth(), (req, res) => {
    res.json(req.oidc.user);
});
app.get('/', (req, res) => {
    console.log(req.query)
    let contents = { name: "World", params: `<h2 style='color:${req.query.color ?? "black"}'>${req.query.text ?? ""}</h2>` }
    res.render('home', contents)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


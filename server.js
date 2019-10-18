const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  dialect: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'milesau',
    password: '',
    database: 'smart-brain'
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  //res.send(db.users)
  res.send(JSON.stringify("page loaded"));
})

app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db)})

app.post( "/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.put("/image", (req, res) => {image.handleImage(req, res, db)})
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)})

app.listen( process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})

require('dotenv').config();

const { PORT, JWT_SECRET } = process.env;
const express = require('express');
const volleyball = require('volleyball');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


app.use(volleyball);
app.use(express.json());

let currentRegisteredUser = {};
app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const token = jwt.sign({ username, password }, JWT_SECRET);
    currentRegisteredUser = { username, password: hashedPassword };
    res.send({ token, message: "Thanks for registering!" });
  } catch (error) {
    console.log(error);
  };
});

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isLoggedIn = await bcrypt.compare(password, currentRegisteredUser.password);
    res.send({ isLoggedIn, registeredUser: currentRegisteredUser, user: req.body });
  } catch (error) {
    console.log(error);
  };
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});

//! Two methods with bcrypt:
//! bcrypt.hash(<password/string>, saltRound); --> hashes a plaintext string/password (saltRound is variable set to a number (default 10));
//! bcrypt.compare(<password/string>, <stored hash>);  --> compares a plaintext string/password with a hashed string/password

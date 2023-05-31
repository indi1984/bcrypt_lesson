require('dotenv').config();

const express = require('express');
const volleyball = require('volleyball');
const bcrypt = require('bcrypt');
const app = express();


app.use(volleyball);
app.use(express.json());

let currentRegisteredUser = {};
app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    res.send(username, hashedPassword);
  } catch (error) {
    console.log(error);
  };
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});


//! Two methods with bcrypt:
//! hash --> hashes a plaintext string/password
//! compare  --> compares a plaintext string/password with a hashed string/password

require('dotenv').config();

const express = require('express');
const app = express();
const volleyball = require('volleyball');
const { PORT } = process.env;

app.use(volleyball);

app.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`)
});
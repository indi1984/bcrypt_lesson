require('dotenv').config();

const { DATABASE_URL } = process.env;
const { Client } = require('pg');

const connectionString = (DATABASE_URL);
const client = new Client({ connectionString });

//* DATABASE ADAPTERS

async function createUser({ username, password }) {
  try {
    const { rows: [ user ] } = await client.query(/*sql*/`
      INSERT INTO users ( username, password )
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING,
      RETURNING *;    
    `, [ username, password ]);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  };
};

module.exports = {
  client,
  createUser
};

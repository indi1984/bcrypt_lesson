const { 
  client,
  createUser
} = require('./index');

const users = [
  {
    username: 'Kevin',
    password: 'pw1'
  },
  {
    username: 'Kelly',
    password: 'pw2'
  }
];

async function dropTables() {
  try {
    await client.query(/*sql*/`
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.log(error);
  };
};

async function createTables() {
  try {
    await client.query(/*sql*/`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL;
      )
    `);
  } catch (error) {
    console.log(error);
  };
};

async function createInitialUsers() {
  try {
    Promise.All(users.map((user) => createUser(user)));
  } catch (error) {
    console.log(error);
  };
};

async function buildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log(error);
  };
}; 

buildDB()
  .catch(console.error)
  .finally(() => client.end());

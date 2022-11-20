require("dotenv").config();

const Client = require('pg');
const client = new Client({
  user: process.env.USER,
  host: 'localhost',
  database: processe.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

client.connect();


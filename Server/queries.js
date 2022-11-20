require("dotenv").config();

// connects to db
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

function getRecordings() {
  const query = "SELECT * FROM recordings ORDER BY name";
  return new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}

function addRecording(recording) {
  const values = [recording];
  const query = "INSERT INTO recordings (recording) VALUES ($1) RETURNING *";
  pool.query(query, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}

module.exports = {
  getRecordings,
  addRecording,
};

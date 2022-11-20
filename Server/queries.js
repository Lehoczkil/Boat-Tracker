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

const getRecordings = (req, res) => {
  pool.query(
    "SELECT * FROM recordings ORDER BY name",
    (error,
    (results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    })
  );
};

function addRecording(recording) {
  const values = [recording];
  const query = 'INSERT INTO recordings (recording) VALUES ($1) RETURNING *';
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

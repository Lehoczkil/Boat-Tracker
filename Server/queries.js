require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: processe.env.DATABASE,
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

const addRecording = (req, res) => {
  pool.query(
    "INSERT INTO recordings (recording) VALUES ($1, $2)",
    recording,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Recording added with ID: ${results.rows[0].id}`);
    }
  );
};

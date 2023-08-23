// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');

const port = 3005;
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'graphnode',
  password: 'K0t4ksakti',
  port: 5432, // Default PostgreSQL port
});

// Sample endpoint to receive JSON data
app.post('/api/insert-data', async (req, res) => {
  try {
    const { key, label, tag, url, cluster, size } = req.body;

    const query = 'INSERT INTO stocknode (key, label, tag, url, cluster, size) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [key, label, tag, url, cluster, size];

    await pool.query(query, values);

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
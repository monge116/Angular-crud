// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: 'AlumnoIFP', // Replace with your MySQL password
  database: 'mydatabase' // Use the database created earlier
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API routes
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// CREATE
app.post('/api/items', (req, res) => {
  const newItem = { name: req.body.name };
  db.query('INSERT INTO items SET ?', newItem, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...newItem });
  });
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  db.query('DELETE FROM items WHERE id = ?', itemId, (err, result) => {
    if (err) throw err;
    res.sendStatus(204);
  });
});

// UPDATE
app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const newItem = { name: req.body.name };
  db.query('update items SET ? where ?', newItem, itemId, (err, result) => {
    if (err) throw err;
    res.status(203).json({ id: result.insertId, ...newItem });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

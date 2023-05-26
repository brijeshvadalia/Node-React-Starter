const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

// Connect to MySQL
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// GET request to fetch data from MySQL
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM user', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// POST request to insert data into MySQL
app.post('/data', (req, res) => {
  const { Firstname, Password } = req.body; // Assuming Firstname and Password are the data fields that i want to insert
  const values = [Firstname, Password];

  connection.query('INSERT INTO user (Firstname, Password) VALUES (?, ?)', values, (err, result) => {
    if (err) throw err;
    res.send('Data inserted successfully');
  });
});

// Update an item
app.put('/data/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  connection.query('UPDATE user SET ? WHERE id = ?', [updatedItem, itemId], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Item updated successfully');
  });
});

// Delete an item
app.delete('/data/:id', (req, res) => {
  const itemId = req.params.id;
  connection.query('DELETE FROM user WHERE id = ?', itemId, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Item deleted successfully');
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

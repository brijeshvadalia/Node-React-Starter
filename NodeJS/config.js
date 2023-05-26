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

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create Multer upload instance
const upload = multer({ storage });

// Define a POST route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  
  const file = req.file;
  
  // Save the file details to the database
  const query = 'INSERT INTO user (name, mimetype, size) VALUES (?, ?, ?)';
  connection.query(query, [file.originalname, file.mimetype, file.size], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send('File uploaded successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

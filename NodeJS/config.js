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


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

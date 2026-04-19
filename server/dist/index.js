require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Routes
app.get('/', (req, res) => {
  res.send('Brynäs Bilservice API is running.');
});

// Fetch services
app.get('/api/services', (req, res) => {
  const query = 'SELECT * FROM services';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Failed to fetch services' });
    } else {
      res.json(results);
    }
  });
});

// Temporary route to populate services
app.get('/api/services', (req, res) => {
  const services = [
    { id: 1, name: 'Oljebyte' },
    { id: 2, name: 'Däckbyte' },
    { id: 3, name: 'Bromsservice' },
  ];
  res.json(services);
});

// Fetch available dates
app.get('/api/available-dates', (req, res) => {
  const query = 'SELECT DISTINCT date FROM bookings WHERE available = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching available dates:', err);
      res.status(500).json({ error: 'Failed to fetch available dates' });
    } else {
      res.json(results.map(row => row.date));
    }
  });
});

// Submit booking
app.post('/api/bookings', (req, res) => {
  const { customerName, serviceId, date } = req.body;
  const query = 'INSERT INTO bookings (customer_name, service_id, date) VALUES (?, ?, ?)';
  db.query(query, [customerName, serviceId, date], (err, results) => {
    if (err) {
      console.error('Error submitting booking:', err);
      res.status(500).json({ error: 'Failed to submit booking' });
    } else {
      res.status(201).json({ message: 'Booking submitted successfully', bookingId: results.insertId });
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
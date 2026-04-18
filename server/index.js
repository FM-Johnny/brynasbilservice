require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;
const { format } = require('date-fns');

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the public folder (client build)
app.use(express.static(path.join(__dirname, 'public')));

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
  const { customerName, customerEmail, customerPhone, serviceId, date, time } = req.body; // Added time field
  console.log('Received booking data:', req.body);
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  // Check if customer exists or insert new customer
  const customerQuery = 'SELECT id FROM customers WHERE email = ?';
  db.query(customerQuery, [customerEmail], (err, customerResults) => {
    if (err) {
      console.error('Error checking customer:', err);
      return res.status(500).json({ error: 'Failed to process booking' });
    }

    let customerId;
    if (customerResults.length > 0) {
      // Customer exists
      customerId = customerResults[0].id;
      insertBooking(customerId);
    } else {
      // Insert new customer
      const insertCustomerQuery = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
      db.query(insertCustomerQuery, [customerName, customerEmail, customerPhone], (err, insertResults) => {
        if (err) {
          console.error('Error inserting customer:', err);
          return res.status(500).json({ error: 'Failed to process booking' });
        }
        customerId = insertResults.insertId;
        insertBooking(customerId);
      });
    }
  });

  function insertBooking(customerId) {
    const bookingQuery = 'INSERT INTO bookings (customer_id, customer_name, service, date, time) VALUES (?, ?, ?, ?, ?)'; // Added time field
    db.query(bookingQuery, [customerId, customerName, serviceId, formattedDate, time], (err, results) => {
      if (err) {
        console.error('Error submitting booking:', err);
        console.error('Database error details:', err.sqlMessage);
        res.status(500).json({ error: 'Failed to submit booking' });
      } else {
        res.status(201).json({ message: 'Booking submitted successfully', bookingId: results.insertId });
      }
    });
  }
});

// Catch-all route - serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
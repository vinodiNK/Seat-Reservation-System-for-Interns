const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL connected!');
  }
});

// Import Routes
const authRoutes = require('./routes/auth');
const seatRoutes = require('./routes/seats');
const reservationRoutes = require('./routes/reservations');

// Use Routes
app.use('/api/auth', authRoutes);              // Login/Register
app.use('/api/seats', seatRoutes);             // Seat management + availability
app.use('/api/reservations', reservationRoutes); // Reservations

// Default route
app.get('/', (req, res) => {
  res.send('🎉 Seat Reservation System API is running.');
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

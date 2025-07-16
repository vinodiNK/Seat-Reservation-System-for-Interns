const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const seatRoutes = require('./routes/seats');
const db = require('./db');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());               // Enable CORS for all origins
app.use(express.json());       // Parse JSON bodies

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ MySQL connected!');
  }
});

// Routes
app.use('/api/auth', authRoutes);  // Login & Register
app.use('/api/seats', seatRoutes); // Add/Edit/Delete/View seats

// Root route
app.get('/', (req, res) => {
  res.send('✅ Seat Reservation System API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

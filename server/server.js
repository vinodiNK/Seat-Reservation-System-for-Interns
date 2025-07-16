const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // MySQL connection

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Check
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL connected!');
  }
});

// Routes
const authRoutes = require('./routes/auth');
const seatRoutes = require('./routes/seats');
const reservationRoutes = require('./routes/reservations');

app.use('/api/auth', authRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/reservations', reservationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('✅ Seat Reservation System API is running.');
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

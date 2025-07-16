const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all seats
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM seats';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching seats' });
    res.json(results);
  });
});

// Add new seat
router.post('/', (req, res) => {
  const { seat_number, location } = req.body;
  const sql = 'INSERT INTO seats (seat_number, location) VALUES (?, ?)';
  db.query(sql, [seat_number, location], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add seat' });
    res.json({ message: 'Seat added successfully' });
  });
});

// Update seat
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { seat_number, location } = req.body;
  const sql = 'UPDATE seats SET seat_number = ?, location = ? WHERE id = ?';
  db.query(sql, [seat_number, location, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to update seat' });
    res.json({ message: 'Seat updated successfully' });
  });
});

// Delete seat
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM seats WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to delete seat' });
    res.json({ message: 'Seat deleted successfully' });
  });
});

module.exports = router;

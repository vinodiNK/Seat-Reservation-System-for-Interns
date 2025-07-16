const express = require('express');
const router = express.Router();
const db = require('../db');

// Create reservation
router.post('/', (req, res) => {
  const { intern_id, seat_id, date, time_slot } = req.body;
  if (!intern_id || !seat_id || !date || !time_slot) {
    return res.status(400).json({ message: 'intern_id, seat_id, date and time_slot are required' });
  }

  // Check if seat reserved for date + time_slot (active only)
  const checkSql = `
    SELECT * FROM reservations 
    WHERE seat_id = ? AND date = ? AND time_slot = ? AND status = 'Active'
  `;
  db.query(checkSql, [seat_id, date, time_slot], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Seat already reserved for this date and time slot' });
    }

    // Insert reservation
    const insertSql = `
      INSERT INTO reservations (intern_id, seat_id, date, time_slot) 
      VALUES (?, ?, ?, ?)
    `;
    db.query(insertSql, [intern_id, seat_id, date, time_slot], (err2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ message: 'Failed to make reservation' });
      }
      res.json({ message: 'Reservation successful' });
    });
  });
});

// Get reservations filtered by date, intern_id, status
router.get('/', (req, res) => {
  const { date, intern_id, status } = req.query;

  let sql = `
    SELECT r.id, r.date, r.time_slot, r.status, 
           u.name AS intern_name, s.seat_number, s.location
    FROM reservations r
    JOIN users u ON r.intern_id = u.id
    JOIN seats s ON r.seat_id = s.id
  `;

  const conditions = [];
  const params = [];

  if (date) {
    conditions.push('r.date = ?');
    params.push(date);
  }
  if (intern_id) {
    conditions.push('r.intern_id = ?');
    params.push(intern_id);
  }
  if (status) {
    conditions.push('r.status = ?');
    params.push(status);
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch reservations' });
    }
    res.json(results);
  });
});

// Update reservation status (e.g. cancel)
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || !['Active', 'Cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const sql = 'UPDATE reservations SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update reservation status' });
    }
    res.json({ message: 'Reservation status updated' });
  });
});

module.exports = router;

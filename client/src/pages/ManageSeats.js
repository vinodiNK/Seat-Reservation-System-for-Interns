import axios from 'axios';
import { useEffect, useState } from 'react';
import './ManageSeats.css';

const API_BASE = 'http://localhost:5000/api/seats';

function ManageSeats() {
  const [seats, setSeats] = useState([]);
  const [seatNumber, setSeatNumber] = useState('');
  const [location, setLocation] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [editId, setEditId] = useState(null);

  // Load all seats with availability dates
  const loadSeats = async () => {
    try {
      const res = await axios.get(API_BASE);
      setSeats(res.data);
    } catch (err) {
      alert('Failed to load seats: ' + err.message);
    }
  };

  useEffect(() => {
    loadSeats();
  }, []);

  // Add or update seat
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, {
          seat_number: seatNumber,
          location,
        });
      } else {
        await axios.post(API_BASE, {
          seat_number: seatNumber,
          location,
        });
      }
      setSeatNumber('');
      setLocation('');
      setEditId(null);
      loadSeats();
    } catch (err) {
      alert('Error saving seat: ' + err.message);
    }
  };

  // Edit seat
  const handleEdit = (seat) => {
    setSeatNumber(seat.seat_number);
    setLocation(seat.location);
    setEditId(seat.id);
  };

  // Delete seat
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this seat?')) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        loadSeats();
      } catch (err) {
        alert('Error deleting seat: ' + err.message);
      }
    }
  };

  // Add available date to selected seat with proper error handling
  const handleAddDate = async () => {
    if (!selectedSeatId || !availableDate) {
      alert('Please select a seat and choose a date');
      return;
    }
    try {
      await axios.post(`${API_BASE}/${selectedSeatId}/availability`, {
        available_date: availableDate,
      });
      setAvailableDate('');
      setSelectedSeatId(null);
      loadSeats();
    } catch (err) {
      const message =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message || 'Unknown error';
      alert('Failed to add available date: ' + message);
    }
  };

  return (
    <div className="manage-seats-container" style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Admin - Manage Seats</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Seat Number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Seat</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setSeatNumber('');
              setLocation('');
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      {selectedSeatId && (
        <div style={{ marginBottom: 20 }}>
          <input
            type="date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <button onClick={handleAddDate}>Add Available Date</button>
          <button
            onClick={() => setSelectedSeatId(null)}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </div>
      )}

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Seat Number</th>
            <th>Location</th>
            <th>Available Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seats.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No seats found.
              </td>
            </tr>
          )}
          {seats.map((seat) => (
            <tr key={seat.id}>
              <td>{seat.id}</td>
              <td>{seat.seat_number}</td>
              <td>{seat.location}</td>
              <td>{seat.available_dates || 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(seat)} style={{ marginRight: 5 }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(seat.id)} style={{ marginRight: 5 }}>
                  Delete
                </button>
                <button onClick={() => setSelectedSeatId(seat.id)}>Add Date</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageSeats;

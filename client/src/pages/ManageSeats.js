import axios from 'axios';
import { useEffect, useState } from 'react';

function ManageSeats() {
  const [seats, setSeats] = useState([]);
  const [seatNumber, setSeatNumber] = useState('');
  const [location, setLocation] = useState('');
  const [editId, setEditId] = useState(null);

  // Load seats
  const loadSeats = async () => {
    const res = await axios.get('http://localhost:5000/api/seats');
    setSeats(res.data);
  };

  useEffect(() => {
    loadSeats();
  }, []);

  // Add or update seat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/seats/${editId}`, {
        seat_number: seatNumber,
        location
      });
    } else {
      await axios.post('http://localhost:5000/api/seats', {
        seat_number: seatNumber,
        location
      });
    }
    setSeatNumber('');
    setLocation('');
    setEditId(null);
    loadSeats();
  };

  // Delete seat
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this seat?')) {
      await axios.delete(`http://localhost:5000/api/seats/${id}`);
      loadSeats();
    }
  };

  // Edit seat
  const handleEdit = (seat) => {
    setSeatNumber(seat.seat_number);
    setLocation(seat.location);
    setEditId(seat.id);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Manage Seats (Admin)</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Seat Number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Seat</button>
        {editId && (
          <button onClick={() => {
            setSeatNumber('');
            setLocation('');
            setEditId(null);
          }}>Cancel</button>
        )}
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Seat Number</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seats.map(seat => (
            <tr key={seat.id}>
              <td>{seat.id}</td>
              <td>{seat.seat_number}</td>
              <td>{seat.location}</td>
              <td>
                <button onClick={() => handleEdit(seat)}>Edit</button>
                <button onClick={() => handleDelete(seat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageSeats;

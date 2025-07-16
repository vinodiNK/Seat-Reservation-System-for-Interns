import axios from 'axios';
import { useState } from 'react';

function ViewSeats() {
  const [selectedDate, setSelectedDate] = useState('');
  const [seats, setSeats] = useState([]);

  const fetchAvailableSeats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/seats/available', {
        params: { date: selectedDate }
      });
      setSeats(res.data);
    } catch (err) {
      alert('Failed to fetch available seats');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>View Available Seats</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={fetchAvailableSeats}>Search</button>

      <div style={{ marginTop: '20px' }}>
        {seats.length > 0 ? (
          <ul>
            {seats.map((seat) => (
              <li key={seat.id}>
                Seat {seat.seat_number} - {seat.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>No seats available or not searched yet.</p>
        )}
      </div>
    </div>
  );
}

export default ViewSeats;

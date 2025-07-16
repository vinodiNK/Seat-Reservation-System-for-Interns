import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api/reservations';

function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterInternId, setFilterInternId] = useState('');

  const loadReservations = async () => {
    try {
      let url = API_BASE;
      const params = [];
      if (filterDate) params.push(`date=${filterDate}`);
      if (filterInternId) params.push(`intern_id=${filterInternId}`);
      if (params.length) url += '?' + params.join('&');

      const res = await axios.get(url);
      setReservations(res.data);
    } catch (err) {
      alert('Failed to load reservations: ' + err.message);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      <h2>View Reservations</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          placeholder="Intern ID"
          value={filterInternId}
          onChange={(e) => setFilterInternId(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={loadReservations}>Filter</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Intern ID</th>
            <th>Intern Name</th>
            <th>Seat Number</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No reservations found.
              </td>
            </tr>
          )}
          {reservations.map((r) => (
            <tr key={r.reservation_id}>
              <td>{r.reservation_id}</td>
              <td>{r.intern_id}</td>
              <td>{r.intern_name}</td>
              <td>{r.seat_number}</td>
              <td>{r.date}</td>
              <td>{r.time_slot}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReservations;

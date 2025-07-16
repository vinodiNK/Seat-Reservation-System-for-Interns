import { useNavigate } from 'react-router-dom';
import './InternDashboard.css';

function InternDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear any stored session info
    navigate('/login');
  };

  return (
    <div className="intern-dashboard">
      <h1>Intern Dashboard</h1>
      <p>Welcome! You can reserve a seat or view your bookings.</p>

      <div className="intern-actions">
        <button onClick={() => navigate('/intern-view-seats')}>
          View & Reserve Seats
        </button>
        <button onClick={() => navigate('/intern-view-reservations')}>
          My Reservations
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default InternDashboard;

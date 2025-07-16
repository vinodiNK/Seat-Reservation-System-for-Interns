import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear token or user info if stored
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage the system below.</p>

      <div className="admin-actions">
        <button onClick={() => navigate('/admin-manage-seats')}>
          Manage Seats
        </button>
        <button onClick={() => navigate('/admin/reservations')}>
          View Reservations
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;

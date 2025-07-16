import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import InternDashboard from './pages/InternDashboard';
import LoginPage from './pages/LoginPage';
import ManageSeats from './pages/ManageSeats'; // Admin: Add/Edit/Delete seats
import RegisterPage from './pages/RegisterPage';
import ViewSeats from './pages/ViewSeats'; // Intern: View seats by date

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Intern Routes */}
        <Route path="/intern-dashboard" element={<InternDashboard />} />
        <Route path="/intern-view-seats" element={<ViewSeats />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-manage-seats" element={<ManageSeats />} />
      </Routes>
    </Router>
  );
}

export default App;

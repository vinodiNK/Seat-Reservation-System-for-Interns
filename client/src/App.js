import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import InternDashboard from './pages/InternDashboard';
import LoginPage from './pages/LoginPage';
import ManageSeats from './pages/ManageSeats';
import RegisterPage from './pages/RegisterPage';
import ViewSeats from './pages/ViewSeats';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route = Login */}
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

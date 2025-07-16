import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'intern'
  });

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message);
      navigate('/'); // redirect to login page
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      alert(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={register}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="intern">Intern</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>

        <div className="back-to-login">
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CAMPUSES = [
  'Madrid', 'Barcelona', 'Miami', 'Paris', 'Berlin',
  'Amsterdam', 'México', 'Sao Paulo', 'Lisbon', 'Remote'
];

const COURSES = ['Web Dev', 'UX/UI', 'Data Analytics', 'Cyber Security'];

export default function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    campus: 'Amsterdam',
    course: 'Web Dev',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.post('/auth/signup', form);
      navigate('/login'); // go to Login on success
    } catch (err) {
      const msg = err?.response?.data?.message || 'Sign up failed';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 440 }}>
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>

        <label>
          Campus
          <select name="campus" value={form.campus} onChange={handleChange}>
            {CAMPUSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Course
          <select name="course" value={form.course} onChange={handleChange}>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={saving}>
          {saving ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
    </div>
  );
}
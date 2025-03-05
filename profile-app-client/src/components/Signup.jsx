import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    campus: '',
    course: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:5005';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate required fields
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.campus ||
      !formData.course
    ) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/auth/signup`, formData);
      if (response.status === 201) {
        console.log('User created');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          type="password"
          required
        />
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
        />
        <input
          name="campus"
          onChange={handleChange}
          value={formData.campus}
          placeholder="Campus"
        />
        <input
          name="course"
          onChange={handleChange}
          value={formData.course}
          placeholder="Course"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;

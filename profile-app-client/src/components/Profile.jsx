import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve token
    console.log('Token:', token);
    if (!token) {
      setError('No token found. Please log in.');
      //   navigate('/login'); // Redirect to login if no token
      return;
    }

    axios
      .get('http://localhost:5005/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }, // Ensure Bearer token is included
      })
      .then((response) => {
        setUser(response.data); // Assuming response contains user details
      })
      .catch((error) => {
        console.error('Error verifying token:', error.response?.data || error);
        setError('Session expired. Please log in again.');
        localStorage.removeItem('authToken'); // Clear expired token
        navigate('/login'); // Redirect to login
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <h2>Profile</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Campus:</strong> {user.campus}
          </p>
          <p>
            <strong>Course:</strong> {user.course}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;

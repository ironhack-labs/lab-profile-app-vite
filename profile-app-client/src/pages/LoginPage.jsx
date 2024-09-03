import authService from '../services/auth.service';
import { AuthContext } from '../context/auth.context';
import { useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
function LoginPage() {
  const { storeToken, authenticateUser } =  useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    authService.logIn(loginInfo).then((response) => {
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/profile');
    });
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" onChange={onChange} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
        />
        <p>
          If you dont have an account yet, you can create your account{' '}
          <Link href="/signup">here</Link>
        </p>
        <h2>Hello!!</h2>
        <p>Welcome to IronProfile!</p>
        <p>
          If you signup, you agree with all our terms and conditions where we
          can do whatever we want with the data!
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    password: '',
    campus: '',
    course: '',
  });

  const onChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signUpInfo);
    authService.signUp(signUpInfo).then((response) => {
      console.log(response.data);
      navigate('/login');
    });
  };

  return (
    <div className="SignUpPage">
      <h1>Sign up</h1>
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

        <label htmlFor="campus">Campus:</label>
        <select id="campus" name="campus" onChange={onChange}>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Miami">Miami</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Mexico">Mexico</option>
          <option value="Sao Paulo">Sao Paulo</option>
        </select>

        <label htmlFor="course">Course:</label>
        <select id="course" name="course" onChange={onChange}>
          <option value="WebDev">WebDev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
        </select>

        <h2>Hello!!</h2>
        <p>Welcome to IronProfile!</p>
        <p>
          If you signup, you agree with all our terms and conditions where we
          can do whatever we want with the data!
        </p>
        <button type="submit">Create the Account</button>
      </form>
    </div>
  );
}

export default SignUpPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { CAMPUSES, COURSES } from "../constants";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState(CAMPUSES[0]);
  const [course, setCourse] = useState(COURSES[0]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    authService
      .signUp({ username, password, campus, course })
      .then(() => navigate("/login"))
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="card">
      <div className="card-left">
        <h2>Sign up</h2>

        <form onSubmit={handleSignupSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Campus
            <select value={campus} onChange={(e) => setCampus(e.target.value)}>
              {CAMPUSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Course
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="btn btn-submit">
            Create the Account
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="card-right">
        <h2>Hello!!</h2>
        <p>Welcome to IronProfile!</p>
        <p className="small">
          If you signup, you agree with all our terms and conditions where we
          can do whatever we want with the data!
        </p>
        <p className="small">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;

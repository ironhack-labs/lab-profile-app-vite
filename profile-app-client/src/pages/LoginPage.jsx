import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    authService
      .logIn({ username, password })
      .then((response) => {
        // Save the JWT, then verify it to update the context state
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="card">
      <div className="card-left">
        <h2>Log in</h2>

        <form onSubmit={handleLoginSubmit}>
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

          <p className="small">
            If you don&apos;t have an account yet, you can create your account{" "}
            <Link to="/signup">here</Link>
          </p>

          <button type="submit" className="btn btn-submit">
            Log in
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="card-right">
        <h2>Hello!!</h2>
        <p>Awesome to have at IronProfile again!</p>
      </div>
    </div>
  );
}

export default LoginPage;

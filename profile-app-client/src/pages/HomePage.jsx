import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="card home">
      <div className="card-left">
        <h1>IronProfile</h1>
        <p>
          Today we will create an app with authorization, adding some cool
          styles!
        </p>

        {isLoggedIn ? (
          <div className="button-group">
            <Link to="/profile" className="btn">
              {user?.username}&apos;s profile
            </Link>
            <button className="btn" onClick={logOutUser}>
              Log out
            </button>
          </div>
        ) : (
          <div className="button-group">
            <Link to="/signup" className="btn">
              Sign up
            </Link>
            <Link to="/login" className="btn">
              Log in
            </Link>
          </div>
        )}
      </div>
      <div className="card-right" />
    </div>
  );
}

export default HomePage;

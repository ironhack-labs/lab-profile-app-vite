import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

// Only lets anonymous users through, otherwise redirects to /profile
function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p className="loading">Loading...</p>;
  if (isLoggedIn) return <Navigate to="/profile" />;
  return children;
}

export default IsAnon;

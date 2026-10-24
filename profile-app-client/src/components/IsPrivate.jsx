import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

// Only lets logged in users through, otherwise redirects to /login
function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p className="loading">Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return children;
}

export default IsPrivate;

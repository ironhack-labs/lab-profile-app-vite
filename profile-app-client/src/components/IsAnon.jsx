import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isLoggedIn) {
    // Si el usuario ya está logueado, lo mandamos a la página principal (o a profile)
    return <Navigate to="/" />;
  } else {
    // Si no está logueado, le dejamos ver el login o signup
    return children;
  }
}

export default IsAnon;

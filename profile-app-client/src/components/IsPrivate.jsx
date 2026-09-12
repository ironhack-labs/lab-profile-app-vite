import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // Si todavía está cargando la información del usuario, mostramos un mensaje o spinner
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    // Si el usuario no está logueado, lo redirigimos al login
    return <Navigate to="/login" />;
  } else {
    // Si está logueado, le permitimos ver el componente hijo (ej. ProfilePage)
    return children;
  }
}

export default IsPrivate;

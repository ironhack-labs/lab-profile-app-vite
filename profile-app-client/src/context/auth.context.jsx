import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

// 1. Crear el objeto Context
const AuthContext = React.createContext();

// 2. Crear el componente Wrapper
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Función para almacenar el token en localStorage
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Función para autenticar al usuario comprobando el token con el backend
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // El servidor responde con los datos del usuario si el token es válido
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // Si el token es inválido o ha expirado
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // Si no hay token en localStorage
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // Función para eliminar el token de localStorage
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  // Función para cerrar sesión (logout)
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        removeToken,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };

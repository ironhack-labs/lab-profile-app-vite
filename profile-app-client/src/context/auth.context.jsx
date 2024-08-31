import { createContext, useState } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem('token', token);
  };

  const authenticateUser = () => {
    setIsLoading(true);
    AuthService.verifyToken()
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true);
        setIsLoading(false);
      });
  };

  const removeToken = () => {
    localStorage.removeItem('token');
  };

  const logOutUser = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        storeToken,
        authenticateUser,
        removeToken,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProviderWrapper, AuthContext };

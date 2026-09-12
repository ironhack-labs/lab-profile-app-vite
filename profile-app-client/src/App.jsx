import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Signup solo para usuarios anónimos */}
      <Route
        path="/signup"
        element={
          <IsAnon>
            <SignupPage />
          </IsAnon>
        }
      />

      {/* Login solo para usuarios anónimos */}
      <Route
        path="/login"
        element={
          <IsAnon>
            <LoginPage />
          </IsAnon>
        }
      />

      {/* Profile es una ruta privada (requiere estar logueado) */}
      <Route
        path="/profile"
        element={
          <IsPrivate>
            <ProfilePage />
          </IsPrivate>
        }
      />
    </Routes>
  );
}

export default App;

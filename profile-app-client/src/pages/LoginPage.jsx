import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../services/auth.service";
import cardImage from "../assets/oval-bg.png";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    logIn(requestBody)
      .then((response) => {
        // 1. Guardamos el token
        storeToken(response.authToken);
        
        // 2. Llamamos a authenticateUser del contexto y usamos su promesa o un pequeño timeout / async para asegurar el cambio
        authenticateUser();

        // 3. Redirigimos al perfil
        setTimeout(() => {
          navigate("/profile");
        }, 100);
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || error.message || "Error during login";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #C1DFC4 0%, #DEECDD 100%)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${cardImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "900px",
          height: "550px",
          borderRadius: "12px",
          display: "flex",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Lado izquierdo: Formulario */}
        <div
          style={{
            flex: 1,
            padding: "40px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "#555", marginBottom: "25px", fontSize: "1.8rem" }}>Log in</h2>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "90%" }}>
            <div>
              <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "3px" }}>Username</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", backgroundColor: "#f8f9fa", border: "none", borderRadius: "4px", color: "#333" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "3px" }}>Password</label>
              <input
                type="password"
                style={{ width: "100%", padding: "10px", backgroundColor: "#f8f9fa", border: "none", borderRadius: "4px", color: "#333" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && <p style={{ color: "#D0021B", fontSize: "0.8rem", margin: "0" }}>{errorMessage}</p>}

            <button
              type="submit"
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#A8D5BA",
                border: "none",
                borderRadius: "4px",
                color: "#333333",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              Log In
            </button>
          </form>

          <p style={{ marginTop: "20px", fontSize: "0.8rem", color: "#666", width: "90%" }}>
            If you don't have an account yet, you can create your account <Link to="/signup" style={{ color: "#638165", fontWeight: "bold" }}>here</Link>.
          </p>
        </div>

        {/* Lado derecho: Textos */}
        <div
          style={{
            flex: 1,
            padding: "50px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ color: "#333", fontSize: "1.6rem", marginBottom: "5px" }}>Hello!!</h2>
            <p style={{ color: "#555", fontSize: "1rem" }}>Awesome to have at IronProfile again!</p>
          </div>

          <div>
            <p style={{ color: "#666", fontSize: "0.75rem", lineHeight: "1.3" }}>
              If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
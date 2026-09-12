import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.service";
import cardImage from "../assets/oval-bg.png";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("Madrid");
  const [course, setCourse] = useState("Web Dev");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password, campus, course };

    signUp(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.message || "Error during signup";
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
            padding: "30px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{ color: "#555", marginBottom: "20px", fontSize: "1.8rem" }}
          >
            Sign up
          </h2>

          <form
            onSubmit={handleSignupSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "90%",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: "#888",
                  fontSize: "0.75rem",
                  marginBottom: "2px",
                }}
              >
                Username
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  border: "none",
                  borderRadius: "4px",
                  color: "#333",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#888",
                  fontSize: "0.75rem",
                  marginBottom: "2px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  border: "none",
                  borderRadius: "4px",
                  color: "#333",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#888",
                  fontSize: "0.75rem",
                  marginBottom: "2px",
                }}
              >
                Campus
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  border: "none",
                  borderRadius: "4px",
                  color: "#333",
                }}
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
              >
                {[
                  "Madrid",
                  "Barcelona",
                  "Miami",
                  "Paris",
                  "Berlin",
                  "Amsterdam",
                  "México",
                  "Sao Paulo",
                  "Lisbon",
                  "Remote",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#888",
                  fontSize: "0.75rem",
                  marginBottom: "2px",
                }}
              >
                Course
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  border: "none",
                  borderRadius: "4px",
                  color: "#333",
                }}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                {["Web Dev", "UX/UI", "Data Analytics", "Cyber Security"].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ),
                )}
              </select>
            </div>

            {errorMessage && (
              <p style={{ color: "#D0021B", fontSize: "0.8rem", margin: "0" }}>
                {errorMessage}
              </p>
            )}

            {/* Botón movido al interior del form con type="submit" */}
            <button
              type="submit"
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "4px",
                color: "#333",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              Create the Account
            </button>
          </form>
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
            <h2
              style={{ color: "#333", fontSize: "1.6rem", marginBottom: "5px" }}
            >
              Hello!!
            </h2>
            <p style={{ color: "#555", fontSize: "1rem" }}>
              Welcome to IronProfile!
            </p>
          </div>

          <div>
            <p
              style={{ color: "#666", fontSize: "0.75rem", lineHeight: "1.3" }}
            >
              If you signup, you agree with all our terms and conditions where
              we can do whatever we want with the data!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

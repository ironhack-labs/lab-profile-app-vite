import { Link } from "react-router-dom";
import cardImage from "../assets/oval-bg.png";

function HomePage() {
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
        {/* Lado izquierdo (Zona blanca de la imagen) */}
        <div
          style={{
            flex: 1,
            padding: "60px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{ color: "#555", marginBottom: "15px", fontSize: "2.2rem" }}
          >
            IronProfile
          </h1>
          <p
            style={{
              color: "#777",
              marginBottom: "40px",
              fontSize: "0.95rem",
              lineHeight: "1.5",
            }}
          >
            Today we will create an app with authorization, adding some cool
            styles!
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "70%",
            }}
          >
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#A8D5BA", // Verde elegante
                  borderRadius: "6px",
                  color: "#333333", // Letras gris oscuro
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                Sign up
              </div>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#A8D5BA", // Verde elegante
                  borderRadius: "6px",
                  color: "#333333", // Letras gris oscuro
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                Log in
              </div>
            </Link>
          </div>
        </div>

        {/* Lado derecho (Zona verde de la imagen) */}
        <div style={{ flex: 1 }}></div>
      </div>
    </div>
  );
}

export default HomePage;

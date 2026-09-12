import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { uploadImage, updateUserPhoto } from "../services/auth.service";
import cardImage from "../assets/oval-bg.png"; // Ajusta la ruta de tu imagen si es necesario

function ProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  // Función que se ejecuta cuando el usuario selecciona un archivo
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    // 'imageUrl' debe coincidir con el nombre del campo que espera multer en el backend (ej. req.file)
    uploadData.append("imageUrl", e.target.files[0]);

    setUploading(true);

    uploadImage(uploadData)
      .then((response) => {
        // response.fileUrl contendrà la URL que devuelve Cloudinary / el servidor
        return updateUserPhoto(response.fileUrl);
      })
      .then(() => {
        // Actualizamos el contexto para que la foto cambie al instante en toda la app
        authenticateUser();
        setUploading(false);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
        setUploading(false);
      });
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

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
        {/* Lado Izquierdo: Datos */}
        <div
          style={{
            flex: 1,
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "#333", fontSize: "2rem", marginBottom: "30px" }}>
            Profile
          </h2>

          <div style={{ marginBottom: "15px" }}>
            <span
              style={{ fontSize: "0.75rem", color: "#888", display: "block" }}
            >
              Username
            </span>
            <span
              style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}
            >
              {user.username}
            </span>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <span
              style={{ fontSize: "0.75rem", color: "#888", display: "block" }}
            >
              Campus
            </span>
            <span
              style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}
            >
              {user.campus || "Madrid"}
            </span>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <span
              style={{ fontSize: "0.75rem", color: "#888", display: "block" }}
            >
              Course
            </span>
            <span
              style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}
            >
              {user.course || "Web Development"}
            </span>
          </div>

          <div>
            <a
              href="/login"
              style={{
                color: "#D0021B",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </a>
          </div>
        </div>

        {/* Lado Derecho: Imagen y Botón de Subida */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {/* Avatar / Imagen de perfil */}
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              backgroundColor: "#E0E0E0",
              overflow: "hidden",
              marginBottom: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user.image ? (
              <img
                src={user.image}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ color: "#888", fontSize: "0.8rem" }}>No Photo</div>
            )}
          </div>

          {/* Input oculto de tipo file vinculado al botón "Edit Photo" */}
          <label
            style={{
              backgroundColor: "white",
              padding: "8px 20px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "0.85rem",
              color: "#555",
              cursor: "pointer",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            {uploading ? "Uploading..." : "Edit Photo"}
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>

          <p
            style={{
              color: "#666",
              fontSize: "0.7rem",
              textAlign: "center",
              marginTop: "20px",
              maxWidth: "220px",
            }}
          >
            The user is able to upload a new profile photo, using NodeJS and
            Multer uploader.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

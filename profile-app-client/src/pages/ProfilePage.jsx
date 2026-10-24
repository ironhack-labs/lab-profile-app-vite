import { useContext, useState } from "react";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
  const { user, setUser, logOutUser } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(undefined);

    // 1. Upload the file to Cloudinary through our API
    // 2. Save the returned URL on the user document
    authService
      .uploadPhoto(file)
      .then((response) => authService.editUser({ image: response.data.image }))
      .then((response) => setUser(response.data))
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Upload failed");
      })
      .finally(() => setIsUploading(false));
  };

  if (!user) return null;

  return (
    <div className="card">
      <div className="card-left">
        <h2>Profile</h2>

        <dl className="profile-info">
          <dt>Username</dt>
          <dd>{user.username}</dd>
          <dt>Campus</dt>
          <dd>{user.campus}</dd>
          <dt>Course</dt>
          <dd>{user.course}</dd>
        </dl>

        {/* IsPrivate redirects to /login once the user is logged out */}
        <button className="link-button" onClick={logOutUser}>
          Logout
        </button>
      </div>

      <div className="card-right profile-right">
        {user.image ? (
          <img src={user.image} alt={user.username} className="avatar" />
        ) : (
          <div className="avatar avatar-placeholder">
            {user.username?.[0]?.toUpperCase()}
          </div>
        )}

        <label className="btn btn-outline">
          {isUploading ? "Uploading..." : "Edit photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            hidden
          />
        </label>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="small">
          The user is able to upload a new profile photo, using NodeJS and
          Multer uploader.
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;

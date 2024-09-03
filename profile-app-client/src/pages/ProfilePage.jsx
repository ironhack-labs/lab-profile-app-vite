import { useState, useEffect } from 'react';
import authService from '../services/auth.service';

function ProfilePage() {
  //const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Error fetching the profile', error));
  }, [image]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('photo', image);

    authService
      .uploadPhoto(formData)
      .then((response) => {
        const image = response.data.image;
        authService.editUser({ image });
        setProfile({ ...profile, image }); // Update the profile state with the new image URL
      })
      .catch((error) => {
        console.error('Error uploading the image', error);
      });
  };

  return (
    <div className="ProfilePage">
      <h1>Profile</h1>
      {profile && (
        <div>
          <h2>{profile.username}</h2>
          <p>{profile.campus}</p>
          <p>{profile.course}</p>
          {profile.image && (
            <div>
              <img
                src={profile.image}
                alt="Profile"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
            </div>
          )}
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleImageUpload}>Upload Image</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

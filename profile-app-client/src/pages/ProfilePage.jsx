import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

function ProfilePage() {
  //const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Error fetching the profile', error));
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('image', image);

    AuthService.uploadPhoto(formData)
      .then((response) => {
        // Assuming the response contains the image URL
        const imageUrl = response.data.imageUrl;
        setProfile({ ...profile, image: imageUrl });
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
          {profile.imageUrl && (
            <div>
              <img
                src={profile.imageUrl}
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

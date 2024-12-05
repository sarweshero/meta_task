import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/index.jsx";
import api from "../../api";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    domain: "",
    phone_no: "",
    mail_id: "",
    linkedin_url: "",
    github_url: "",
    about: "",
    profile_photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("access");

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`profile/${username}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUserData({
        name: response.data.name || response.data.user.username,
        domain: response.data.domain,
        phone_no: response.data.phone_no,
        mail_id: response.data.mail_id,
        linkedin_url: response.data.linkedin_url,
        github_url: response.data.github_url,
        about: response.data.about || "No information provided",
        profile_photo: response.data.profile_photo,
      });
    } catch (err) {
      setError(`Failed to fetch user data: ${err.response?.data?.detail || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username && authToken) {
      fetchUserData();
    } else {
      setError("Authentication required. Please log in.");
    }
  }, [username, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({
        ...userData,
        profilephoto: file, // Store the file for submission
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("role", userData.role);
      formData.append("phone", userData.phone);
      formData.append("mail_id", userData.mail_id);
      formData.append("linkedIn", userData.linkedIn);
      formData.append("github", userData.github);
      formData.append("about", userData.about);
      if (userData.profilePicture instanceof File) {
        formData.append("profile_photo", userData.profilePicture);  // Corrected field name
      }
  
      const response = await api.post(`profile/`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",  // Ensure content type is set correctly
        },
      });
  
      setMessage("Profile updated successfully!");
      setUserData({ ...userData, ...response.data });
      setIsEditing(false);
    } catch (err) {
      setError(`Failed to update profile: ${err.response?.data?.detail || err.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="profile-section card">
          {/* Profile photo */}
          <img
            src={
              userData.profile_photo
                ? userData.profile_photo instanceof File
                  ? URL.createObjectURL(userData.profile_photo)
                  : userData.profile_photo
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="profile-picture"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          )}

          {/* Name */}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          ) : (
            <h2>{userData.name}</h2>
          )}

          {/* Domain */}
          {isEditing ? (
            <input
              type="text"
              name="domain"
              value={userData.domain}
              onChange={handleChange}
              placeholder="Domain"
            />
          ) : (
            <p>{userData.domain}</p>
          )}

          {/* Phone */}
          {isEditing ? (
            <input
              type="text"
              name="phone_no"
              value={userData.phone_no}
              onChange={handleChange}
              placeholder="Phone"
            />
          ) : (
            <p><strong>Phone:</strong> {userData.phone_no}</p>
          )}

          {/* Email */}
          {isEditing ? (
            <input
              type="text"
              name="mail_id"
              value={userData.mail_id}
              onChange={handleChange}
              placeholder="Email"
            />
          ) : (
            <p><strong>Email:</strong> <a href={`mailto:${userData.mail_id}`}>{userData.mail_id}</a></p>
          )}

          {/* LinkedIn */}
          {isEditing ? (
            <input
              type="text"
              name="linkedin_url"
              value={userData.linkedin_url}
              onChange={handleChange}
              placeholder="LinkedIn"
            />
          ) : (
            <p><strong>LinkedIn:</strong> <a href={userData.linkedin_url}>{userData.linkedin_url}</a></p>
          )}

          {/* GitHub */}
          {isEditing ? (
            <input
              type="text"
              name="github_url"
              value={userData.github_url}
              onChange={handleChange}
              placeholder="GitHub"
            />
          ) : (
            <p><strong>GitHub:</strong> <a href={userData.github_url}>{userData.github_url}</a></p>
          )}

          {/* About Section */}
          <div className="about-section">
            <strong>About:</strong>
            {isEditing ? (
              <textarea
                name="about"
                value={userData.about}
                onChange={handleChange}
                placeholder="Tell us something about yourself"
              />
            ) : (
              <p>{userData.about}</p>
            )}
          </div>

          {/* Edit and Save/Cancel Buttons */}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button onClick={handleSubmit}>
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

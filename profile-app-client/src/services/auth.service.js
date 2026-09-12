import axios from "axios";

const API_URL = "http://localhost:5005";

// Función auxiliar para adjuntar el token JWT en las cabeceras
const getAuthConfig = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  };
};

// 1. signUp - POST /auth/signup[cite: 9, 11]
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// 2. logIn - POST /auth/login[cite: 9, 11]
export const logIn = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// 3. verifyToken - GET /auth/verify[cite: 9, 11]
export const verifyToken = async (storedToken) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// 4. uploadPhoto - POST /api/upload[cite: 10, 11]
export const uploadPhoto = async (fileData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/upload`,
      fileData,
      getAuthConfig(),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// 5. getCurrentUser - GET /api/user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user`, getAuthConfig());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// 6. editUser - PUT /api/user
export const editUser = async (userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/user`,
      userData,
      getAuthConfig(),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Aliases de compatibilidad para tus componentes actuales
export const uploadImage = uploadPhoto;
export const updateUserPhoto = (imagePath) => editUser({ image: imagePath });

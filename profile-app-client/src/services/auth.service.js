import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

class AuthService {
  constructor() {
    this.api = axios.create({ baseURL: API_URL });

    // Automatically send the stored JWT on every request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  // POST /auth/signup
  signUp = ({ username, password, campus, course }) => {
    return this.api.post("/auth/signup", { username, password, campus, course });
  };

  // POST /auth/login
  logIn = ({ username, password }) => {
    return this.api.post("/auth/login", { username, password });
  };

  // GET /auth/verify
  verifyToken = () => {
    return this.api.get("/auth/verify");
  };

  // POST /api/upload  (file is sent as form-data under the "image" key)
  uploadPhoto = (file) => {
    const uploadData = new FormData();
    uploadData.append("image", file);
    return this.api.post("/api/upload", uploadData);
  };

  // GET /api/user
  getCurrentUser = () => {
    return this.api.get("/api/user");
  };

  // PUT /api/user
  editUser = ({ username, campus, course, image }) => {
    return this.api.put("/api/user", { username, campus, course, image });
  };
}

const authService = new AuthService();

export default authService;

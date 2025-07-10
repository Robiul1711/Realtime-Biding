import axios from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useAxiosSecure = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const access_token = auth?.user?.token;

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
  });

  // Request interceptor for attaching token
  axiosSecure.interceptors.request.use((config) => {
    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  });

  // Response interceptor for handling expired token
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        // Token is likely expired
        toast.error("Your session has expired. Please log in again.");
        localStorage.removeItem("user");
        auth.setUser(null); // Clear user context
        navigate("/sign-in"); // Redirect to login page
      }
      return Promise.reject(error); // Let other errors continue
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

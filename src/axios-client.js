import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("JWT_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {return response;},
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("JWT_TOKEN");
        } else {
            return Promise.reject(error);
        }
    }
);

export default axiosClient;

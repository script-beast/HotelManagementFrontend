import axios from "axios";

const instance = axios.create({
  baseURL: "https://hotelmanagementbackend-6xfw.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject();
    }
    return Promise.reject(error.response.data.error);
  }
);

export default instance;

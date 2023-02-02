import axios from "axios";

let apiUrl = process.env.REACT_APP_API_URL;

const configureAxios = () =>
  axios.create({
    baseURL: apiUrl,
    timeout: 15000,
  });

export const axiosInstance = configureAxios();

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!(error && error.response)) {
      error = {
        response: {
          data: {
            errors: {
              message: "Something went wrong.",
            },
          },
        },
      };
    } else {
      return Promise.reject(error);
    }
  }
);

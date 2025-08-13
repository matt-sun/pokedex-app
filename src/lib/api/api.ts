import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const axiosClient = (): AxiosInstance => {
  // No token used but if we did, we'd have as a parameter of the function above this: (token: string | null = null).
  // Uncomment underneath if we do use a token.

  //   const headers = token
  //     ? {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       }
  //     : {
  //         "Content-Type": "multipart/form-data",
  //       };

  const client = axios.create({
    baseURL: `https://pokeapi.co/api/v2/`,
    timeout: 60000,
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

export default axiosClient;

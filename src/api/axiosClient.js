import axios from 'axios'
import { API_BASE_URL } from '../config/index'
import queryString from 'query-string'
import { TokenService } from '../utils/token';

const axiosLogin = axios.create ({
  baseURL:API_BASE_URL
});

const axiosClient = axios.create({
    baseURL: API_BASE_URL
  });


  
  axiosClient.interceptors.request.use(
    (config) => {
  
  
      const token = TokenService.getToken();
      
      if (token) {
        config.headers["Authorization"] = token;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const config = error.config;
      const response = error.response;
  
  
      if (!response.status) {
        window.location.href = "/error";
      }
  
      if (response.status === 404) {
        window.location.href = "/404";
      }
  
      if (config.url === "refresh" && response.status !== 200) {
        console.log("Refresh token failed");
        window.location.href = "login";
      }
  
      if (config.url !== "login" && response) {
        if (response.status === 401 && !config._retry) {
          config._retry = true;
          try {
            const refreshToken = TokenService.getRefreshToken();
            const expiredToken = TokenService.getToken();
  
            const data = {
              token:expiredToken,
              refreshToken
            }
  
            if (!refreshToken || !expiredToken) {
              window.location.href = "/login";
            }
  
            const refreshData = await axiosClient.post("/auth/refresh",data);
  
            TokenService.setToken(refreshData.data.token);
            TokenService.setToken(refreshData.data.refreshToken);
  
            console.warn("Refresh data returned");
            console.log(refreshData);
            console.log("Refreshing Token");
  
            return axiosClient(config);
          } catch (_err) {
            console.error("error refresh");
  
            window.location.href = "/login";
            return Promise.reject(_err);
          }
        }
  
        if (response.status === 401 && config._retry) {
          window.location.href = "login";
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export const CommonApi = {
    api: axiosClient,
    loginApi: axiosLogin
  };

import { CommonApi } from "./axiosClient";
import { TokenService } from "../utils/token";

const api = CommonApi.loginApi;

const loginPath = "auth/login";


export const LoginApi = { 
  login: async function (username, password) {
    var data = {
      username,
      password,
    };
    let result = await api.post(loginPath, data);
    if (result.data.token) {
      TokenService.setToken(result.data.token);
      TokenService.setRefreshToken(result.data.refreshToken);
      localStorage.setItem("role",result.data.role);
    }
    return result;
  }
};
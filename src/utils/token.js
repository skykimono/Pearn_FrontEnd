export const TokenService = {
    getToken: function () {
      return localStorage.getItem("token");
    },
    getRefreshToken: function () {
      return localStorage.getItem("rtoken");
    },
    setToken: function(token) {
        return localStorage.setItem("token", token);
    },
    setRefreshToken: function(token) {
        return localStorage.setItem("rtoken", token);
    }
  };
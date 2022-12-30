import axios from "axios";

const API_URL = "http://localhost:55286/api/users/";

const register = (UserFullName, DOJ, UserEmail, UserProfile, UserPassword) => {
  return axios.post(API_URL + "InsertUser", {
    UserFullName,
    DOJ,
    UserEmail,
    UserProfile,
    UserPassword,
  });
};

const login = (UserEmail, UserPassword) => {
  return axios
    .post(API_URL + "Login", {
      UserEmail,
      UserPassword,
    })
    .then((response) => {
      if (response.data.UserDetails.UserEmail) {
        localStorage.setItem("user", JSON.stringify(response.data.UserDetails));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/sign-in";
  return;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

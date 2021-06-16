import axios from "axios";

const API_URL = "https://recruitment.ultimate.systems/auth/local";

class AuthService {
  login(identifier, password) {
    return axios
      .post(API_URL, {
        identifier,
        password,
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data.jwt));
          return;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

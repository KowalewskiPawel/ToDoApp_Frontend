import axios from "axios";

const API_URL = "https://recruitment.ultimate.systems/auth/local";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL, {
        username,
        password,
      })
      .then((response) => {
        if (response.jwt) {
          localStorage.setItem("user", JSON.stringify(response));
        }

        return response;
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

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://recruitment.ultimate.systems/to-do-lists";

class UserService {
  getTodos() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }

  addNewList() {
    return axios.post(API_URL, {
      headers: authHeader(),
    });
  }
}

export default new UserService();

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL_TODOS;

class UserService {
  getTodos() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }

  getList(id) {
    return axios.get(API_URL + `/${id}`, {
      headers: authHeader(),
    });
  }

  addTodos(listName, tasks) {
    return axios.post(
      API_URL,
      {
        name: listName,
        task: [...tasks],
      },
      {
        headers: authHeader(),
      }
    );
  }

  updateList(id, listName, tasks) {
    return axios.put(
      API_URL + `/${id}`,
      {
        name: listName,
        task: [...tasks],
      },
      {
        headers: authHeader(),
      }
    );
  }

  deleteTodo(id) {
    return axios.delete(API_URL + `/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();

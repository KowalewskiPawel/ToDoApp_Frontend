import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthService from "./services/auth.service";

import Title from "./components/Title";
import Login from "./components/Login";
import Register from "./components/Register";
import ToDoList from "./components/ToDoList";

import "./App.scss";

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = AuthService.getCurrentUser();
    if (token) {
      setUser(true);
      return;
    }
  }, [user]);

  return (
    <Router>
      <Title user={user} />
      <div>
        {!user ? (
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        ) : (
          <ToDoList />
        )}
      </div>
    </Router>
  );
}

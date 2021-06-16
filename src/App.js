import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Title from "./components/Title";
import Login from "./components/Login";
import Register from "./components/Register";
import ToDoList from "./components/ToDoList";

import "./App.scss";

export default function App() {
  return (
    <Router>
      <Title />
      <div>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/todos">
            <ToDoList />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Title from "./components/Title";
import Login from "./components/Login";
import Register from "./components/Register";

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
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}

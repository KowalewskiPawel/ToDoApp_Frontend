import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Title from "./components/Title";

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

function Login() {
  return (
    <div className="loginForm">
      <h1>Login</h1>
      <input
        id="username"
        type="text"
        placeholder="Email or Username"
        required
      />
      <input id="pass" type="password" placeholder="Password" />
      <button>Login</button>
      <p>or</p>
      <Link id="link" to="/register">
        create an account
      </Link>
    </div>
  );
}

function Register() {
  return (
    <div className="registerForm">
      <Link id="link" to="/">
        ←
      </Link>
      <h1>Create a new account</h1>
      <input id="username" type="text" placeholder="Username" required />
      <input id="email" type="text" placeholder="Email" required />
      <input id="password" type="password" placeholder="Password" required />
      <input
        id="confirmPass"
        type="password"
        placeholder="Confirm password"
        required
      />
      <button>Create</button>
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    AuthService.login(user, password).then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.error(err);
        setMessage("Wrong credentials or network problems.");
      }
    );
  };

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="user"
          type="text"
          placeholder="Email or Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          maxLength="40"
          required
        />
        <input
          id="pass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength="40"
          required
        />
        <input id="submitBtn" type="submit" value="Login" />
      </form>
      <p>or</p>
      <Link id="link" to="/register">
        create an account
      </Link>
      {message ? <p>{message}</p> : ""}
    </div>
  );
}

export default Login;

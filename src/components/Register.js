import { useState } from "react";

import { Link } from "react-router-dom";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length < 3 || username.length > 20) {
      setMessage("The username must be between 3 and 20 characters.");
      return;
    }

    if (!isEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6 || password.length > 40) {
      setMessage("The password must be between 6 and 40 characters.");
      return;
    }

    if (password !== confPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    AuthService.register(username, email, password).then(
      (response) => {
        console.log(response);
        setSuccessful(true);
      },
      (err) => {
        console.error(err);
        setMessage(
          "Error :( User already exists or there is some network problem."
        );
      }
    );
  };

  return (
    <div className="registerForm">
      <Link id="link" to="/">
        ←
      </Link>
      <h1>Create a new account</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength="20"
          required
        />
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          id="confirmPass"
          type="password"
          placeholder="Confirm password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          maxLength="40"
          required
        />
        <input id="submitBtn" type="submit" value="Create" />
      </form>
      {successful ? (
        <p>
          Account has been created. You can proceed to the login section! :)
        </p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Register;

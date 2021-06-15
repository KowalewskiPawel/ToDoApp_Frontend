import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="loginForm">
      <h1>Login</h1>
      <form>
        <input
          id="username"
          type="text"
          placeholder="Email or Username"
          required
        />
        <input id="pass" type="password" placeholder="Password" />
        <input id="submitBtn" type="submit" value="Login" />
      </form>
      <p>or</p>
      <Link id="link" to="/register">
        create an account
      </Link>
    </div>
  );
}

export default Login;

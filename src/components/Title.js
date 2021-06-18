import AuthService from "../services/auth.service";

function Title(props) {
  const logout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <>
      <h1 className="title">ToDo-List</h1>
      {props.user ? <button onClick={() => logout()}>LOGOUT</button> : ""}
    </>
  );
}

export default Title;

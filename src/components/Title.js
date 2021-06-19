import AuthService from "../services/auth.service";
import doors from "../assets/logout.png";

function Title(props) {
  const logout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="title">
      <h1>ToDo-List</h1>
      {props.user ? (
        <img src={doors} onClick={logout} alt="Logout Button" />
      ) : (
        ""
      )}
    </div>
  );
}

export default Title;

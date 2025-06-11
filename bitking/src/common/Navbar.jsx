import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/nombre_logo.png";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let username = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username;
    } catch (err) {
      console.error("Token inválido");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
 <nav className="navbar">
  <div className="navbar-left">
    <div className="logo-container">
      <img src={logo} alt="BitKing Logo" className="navbar-logo" />
    </div>
  </div>

  <div className="navbar-center">
    <ul className="nav-links">
      <li><NavLink to="/">Inicio</NavLink></li>
      <li><NavLink to="/instrucciones">Instrucciones</NavLink></li>
      <li><NavLink to="/nosotros">Nosotros</NavLink></li>
      <li><NavLink to="/salas">Salas</NavLink></li>
      {token ? (
        <li><button onClick={handleLogout} className="logout-btn">Cerrar sesión</button></li>
      ) : (
        <>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/registro">Registro</NavLink></li>
        </>
      )}
    </ul>
  </div>

  <div className="navbar-right">
    {token && username && (
      <NavLink to="/perfil" className="nav-user">{username}</NavLink>
    )}
  </div>
</nav>
  );
}

export default Navbar;

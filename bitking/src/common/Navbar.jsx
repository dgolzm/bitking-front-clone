// src/common/Navbar.jsx
import logo from "../assets/nombre_logo.png";

import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const token = localStorage.getItem("token");

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="BitKing Logo" className="navbar-logo" />
      </div>

      <ul className="nav-links">
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/instrucciones">Instrucciones</NavLink></li>
        <li><NavLink to="/nosotros">Nosotros</NavLink></li>
        <li><NavLink to="/partida">Ir a Partida</NavLink></li>

        {token ? (
          <li><button onClick={handleLogout} className="logout-btn">Cerrar sesión</button></li>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/registro">Registro</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
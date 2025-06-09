// src/common/Navbar.jsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">BitKing</h2>
            <ul className="nav-links">
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/instrucciones">Instrucciones</NavLink></li>
                <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                <li><NavLink to="/partida">Ir a Partida</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/registro">Registro</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;

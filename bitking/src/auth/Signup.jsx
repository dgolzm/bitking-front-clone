import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../common/forms.css'; // si quieres estilos

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        username,
        password,
      });

      setMessage("Cuenta creada correctamente. Inicia sesión.");
      setTimeout(() => navigate("/login"), 1500); // redirige luego de 1.5s
    } catch (err) {
      setError("No se pudo crear la cuenta. Intenta con otro usuario.");
    }
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Crear cuenta</button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;

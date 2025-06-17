import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Salas.css";

import clase1 from "../assets/humano.png";
import clase2 from "../assets/alien.png";
import clase3 from "../assets/zombie.png";
import clase4 from "../assets/robot.png";

const CLASES = [
  { id: 1, nombre: "Clase Humano", imagen: clase1, descripcion: "Versátil y equilibrado. Sin ventajas ni desventajas." },
  { id: 2, nombre: "Clase Alien", imagen: clase2, descripcion: "Tecnología avanzada. Puede ver roles enemigos una vez por partida." },
  { id: 3, nombre: "Clase Zombie", imagen: clase3, descripcion: "Resistente. Puede revivir una vez por partida." },
  { id: 4, nombre: "Clase Robot", imagen: clase4, descripcion: "Preciso. Tiene mayor probabilidad de éxito en acciones." },
];

function Salas() {
  const [partidas, setPartidas] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const navigate = useNavigate();

  const fetchPartidas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/games` // Obtener todas las partidas
      );
      const filtradas = response.data.filter(
        (p) => p.estado_partida === "Esperando"
      );
      setPartidas(filtradas);
    } catch (error) {
      console.error("Error al cargar las partidas", error);
    }
  };

  const unirseAPartida = async (id) => {
    if (!claseSeleccionada) {
      return alert("Debes seleccionar una clase antes de unirte a una partida.");
    }
    const confirmar = confirm(`¿Deseas unirte a la partida #${id}?`);
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${id}/join`,
        { classid: claseSeleccionada.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/partida?id=${id}`);
    } catch (error) {
      alert("No se pudo unir a la partida");
    }
  };

  const unirseAleatoria = () => {
    if (!claseSeleccionada) {
      return alert("Debes seleccionar una clase antes de unirte a una partida.");
    }
    if (partidas.length === 0) return alert("No hay partidas disponibles");
    const aleatoria = partidas[Math.floor(Math.random() * partidas.length)];
    unirseAPartida(aleatoria.id);
  };

  const handleCrearPartida = async () => {
  if (!claseSeleccionada) {
    return alert("Debes seleccionar una clase para crear una partida.");
  }

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/games/create`,
      { class_id: claseSeleccionada.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const nuevaPartidaId = response.data?.game_id;
    if (nuevaPartidaId) {
      navigate(`/partida?id=${nuevaPartidaId}`);
    } else {
      alert("Error inesperado al crear la partida.");
    }
  } catch (error) {
    console.error("Error al crear partida:", error);
    alert("No se pudo crear la partida.");
  }
};

  useEffect(() => {
    fetchPartidas();
  }, []);

  return (
    <div className="salas-container">
      <div className="lista-partidas">
        <h2>Partidas disponibles</h2>
        <div className="scroll-area">
          {partidas.length === 0 ? (
            <p>No hay partidas en espera.</p>
          ) : (
            partidas.map((p) => (
              <div
                key={p.id}
                className="partida-item"
                onClick={() => unirseAPartida(p.id)}
              >
                <span>ID: {p.id}</span>
                <span>Jugador blanco: {p.jugador_blanco}</span>
                <span>Creado: {new Date(p.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>

        

        <button className="aleatoria-btn" onClick={unirseAleatoria}>
          Unirse a partida aleatoria
        </button>
      </div>
      <div className="modulo-derecha">
        <div className="selector-clase">
          <h2>Selecciona una clase</h2>
          <div className="clases-grid">
            {CLASES.map((clase) => (
              <img
                key={clase.id}
                src={clase.imagen}
                alt={clase.nombre}
                className={`clase-imagen ${claseSeleccionada?.id === clase.id ? "seleccionada" : ""}`}
                onClick={() => setClaseSeleccionada(clase)}
              />
            ))}
          </div>
          <div className="clase-elegida">
            {claseSeleccionada ? (
              <>
                <div>{claseSeleccionada.nombre}</div>
                <div className="clase-descripcion">{claseSeleccionada.descripcion}</div>
              </>
            ) : (
              "Selecciona una clase"
            )}
          </div>
        </div>
        <div className="crear-partida">
          <h3>Crear partida</h3>
          <button className="crear-btn" onClick={handleCrearPartida}>
            Crear partida
          </button>
        </div>
      </div>
    </div>
  );
}

export default Salas;
// src/routing/Routing.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../common/App";
import NotFound from "../common/NotFound";

import Home from "../info/Home";
import Nosotros from "../info/Nosotros";

import Instrucciones from "../game/Instrucciones";
import Partida from "../game/Partida";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

import ProtectedRoute from "../common/ProtectedRoute";


function Routing() {
    return (
        <BrowserRouter>
            <App>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/instrucciones" element={<Instrucciones />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/partida" element={<ProtectedRoute><Partida /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Signup />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </App>
        </BrowserRouter>
    );
}

export default Routing;

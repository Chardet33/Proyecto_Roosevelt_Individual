import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import MisRutas from "../MisRutas/MisRutas";
import RutasFavoritas from "../RutasFavoritas/RutasFavoritas";
import Mapa from "../Mapa/Mapa";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../../components/ProtectedRoute";

import Login from "../../pages/Login/Login";

export default function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login view="iniciar" />} />
                <Route path="/login/registro" element={<Login view="registro" />} />
                <Route path="/login/recuperar" element={<Login view="recuperar" />} />
                {/* <Route path="/my-routes" element={<MisRutas />} />
                <Route path="/fav-routes" element={<RutasFavoritas />} /> */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/map" element={<Mapa />} />
                <Route path="*" element={<NotFound />} />
                <Route
                    path="/my-routes"
                    element={
                        <ProtectedRoute>
                            <MisRutas />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/fav-routes"
                    element={
                        <ProtectedRoute>
                            <RutasFavoritas />
                        </ProtectedRoute>
                    }
                />
                <Route path="/map" element={<Mapa view="mapa" />} />
            </Routes>

        </>
    )
}
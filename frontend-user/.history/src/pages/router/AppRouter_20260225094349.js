import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Settings from "../Settings/Settings";
import MisRutas from "../MisRutas/MisRutas";

import LoginForm from "../../components/LoginForm/LoginForm";

export default function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route path="/my-routes" element={<MisRutas />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>

        </>
    )
}
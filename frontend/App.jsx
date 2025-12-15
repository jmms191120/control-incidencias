import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Incidencias from "./pages/Incidencias";
import Usuarios from "./pages/Usuarios";
import Equipos from "./pages/Equipos";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./protected/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/incidencias" element={<Incidencias />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/equipos" element={<Equipos />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

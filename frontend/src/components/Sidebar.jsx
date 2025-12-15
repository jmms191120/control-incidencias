import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Control Incidencias</h2>

      <nav className="space-y-3">
        <Link className="block hover:text-blue-400" to="/">Dashboard</Link>
        <Link className="block hover:text-blue-400" to="/incidencias">Incidencias</Link>
        <Link className="block hover:text-blue-400" to="/usuarios">Usuarios</Link>
        <Link className="block hover:text-blue-400" to="/equipos">Equipos</Link>
      </nav>
    </div>
  );
}

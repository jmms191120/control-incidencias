import { useEffect, useState } from "react";
import {
  getIncidencias,
  createIncidencia,
  updateIncidencia,
  updateEstado,
  deleteIncidencia,
} from "../api/incidencias";

export default function Incidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos del formulario (crear/editar)
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "Media",
    estado: "Pendiente",
    id_equipo: null
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const res = await getIncidencias();
    setIncidencias(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Abrir modal para crear
  const openCreate = () => {
    setEditId(null);
    setForm({
      titulo: "",
      descripcion: "",
      prioridad: "Media",
      estado: "Pendiente",
      id_equipo: null
    });
    setModalOpen(true);
  };

  // Abrir modal para editar
  const openEdit = (inc) => {
    setEditId(inc.id);
    setForm({
      titulo: inc.titulo,
      descripcion: inc.descripcion,
      prioridad: inc.prioridad,
      estado: inc.estado,
      id_equipo: inc.id_equipo
    });
    setModalOpen(true);
  };

  // Guardar incidencia
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId === null)
      await createIncidencia(form);
    else
      await updateIncidencia(editId, form);

    setModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar incidencia?")) {
      await deleteIncidencia(id);
      loadData();
    }
  };

  const changeEstado = async (id, estado) => {
    await updateEstado(id, estado);
    loadData();
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Incidencias</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-5"
        onClick={openCreate}
      >
        Nueva incidencia
      </button>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Prioridad</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {incidencias.map((inc) => (
            <tr key={inc.id}>
              <td className="p-2 border">{inc.codigo_incidencia}</td>
              <td className="p-2 border">{inc.titulo}</td>
              <td className="p-2 border">{inc.prioridad}</td>

              <td className="p-2 border">
                <select
                  value={inc.estado}
                  onChange={(e) => changeEstado(inc.id, e.target.value)}
                  className="border p-1"
                >
                  <option>Pendiente</option>
                  <option>En proceso</option>
                  <option>Finalizado</option>
                </select>
              </td>

              <td className="p-2 border">
                <button
                  onClick={() => openEdit(inc)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(inc.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <form className="bg-white p-6 rounded shadow-xl w-96" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">
              {editId === null ? "Nueva Incidencia" : "Editar Incidencia"}
            </h2>

            <label>Título</label>
            <input
              className="w-full border p-2 mb-3"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
            />

            <label>Descripción</label>
            <textarea
              className="w-full border p-2 mb-3"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />

            <label>Prioridad</label>
            <select
              className="w-full border p-2 mb-3"
              value={form.prioridad}
              onChange={(e) => setForm({ ...form, prioridad: e.target.value })}
            >
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>

            <label>ID Equipo</label>
            <input
              type="number"
              className="w-full border p-2 mb-3"
              value={form.id_equipo}
              onChange={(e) => setForm({ ...form, id_equipo: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-3 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>

              <button className="px-3 py-2 bg-blue-600 text-white rounded">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

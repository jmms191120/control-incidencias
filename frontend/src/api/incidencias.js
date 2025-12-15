import API from "./axios";

// Listar todas
export const getIncidencias = () => API.get("/incidencias");

// Crear
export const createIncidencia = (data) => API.post("/incidencias", data);

// Editar
export const updateIncidencia = (id, data) =>
  API.put(`/incidencias/${id}`, data);

// Cambiar estado
export const updateEstado = (id, estado) =>
  API.put(`/incidencias/${id}/estado`, { estado });

// Eliminar
export const deleteIncidencia = (id) =>
  API.delete(`/incidencias/${id}`);

import api from "./api";

export const getIncidencias = () => api.get("/incidencias");
export const createIncidencia = (data) => api.post("/incidencias", data);
export const updateIncidencia = (id, data) => api.put(`/incidencias/${id}`, data);
export const updateEstado = (id, data) => api.patch(`/incidencias/estado/${id}`, data);
export const deleteIncidencia = (id) => api.delete(`/incidencias/${id}`);

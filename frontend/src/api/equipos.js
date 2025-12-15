import axios from "axios";
const API = "http://localhost:4000/api/equipos";

export const getEquipos = () => axios.get(API, { withCredentials: true });
export const createEquipo = (data) => axios.post(API, data, { withCredentials: true });
export const updateEquipo = (id, data) => axios.put(`${API}/${id}`, data, { withCredentials: true });
export const deleteEquipo = (id) => axios.delete(`${API}/${id}`, { withCredentials: true });

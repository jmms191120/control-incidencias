import axios from "axios";
const API = "http://localhost:4000/api/usuarios";

export const getUsuarios = () => axios.get(API, { withCredentials: true });
export const createUsuario = (data) => axios.post(API, data, { withCredentials: true });
export const updateUsuario = (id, data) => axios.put(`${API}/${id}`, data, { withCredentials: true });
export const deleteUsuario = (id) => axios.delete(`${API}/${id}`, { withCredentials: true });

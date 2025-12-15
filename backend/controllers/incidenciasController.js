// backend/controllers/incidenciasController.js
import sql from "mssql";
import { getConnection } from "../db.js";

export const crearIncidencia = async (req, res) => {
  const { titulo, descripcion, prioridad, estado, id_equipo } = req.body;
  if (!titulo) return res.status(400).json({ message: "Titulo requerido" });

  try {
    const pool = await getConnection();
    const codigo = `INC-${Date.now()}`;
    await pool.request()
      .input("codigo", sql.VarChar, codigo)
      .input("titulo", sql.VarChar, titulo)
      .input("descripcion", sql.Text, descripcion)
      .input("prioridad", sql.VarChar, prioridad)
      .input("estado", sql.VarChar, estado)
      .input("id_equipo", sql.Int, id_equipo)
      .input("id_usuario", sql.Int, req.user.userId)
      .query(`INSERT INTO incidencias (codigo_incidencia, titulo, descripcion, prioridad, estado, id_equipo, id_usuario, fecha_creacion)
              VALUES (@codigo, @titulo, @descripcion, @prioridad, @estado, @id_equipo, @id_usuario, GETDATE())`);

    res.json({ message: "Incidencia creada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const listarIncidencias = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("id_usuario", sql.Int, req.user.userId)
      .query("SELECT * FROM incidencias WHERE id_usuario = @id_usuario ORDER BY fecha_creacion DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const actualizarIncidencia = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, prioridad, estado, id_equipo } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("id_usuario", sql.Int, req.user.userId)
      .input("titulo", sql.VarChar, titulo)
      .input("descripcion", sql.Text, descripcion)
      .input("prioridad", sql.VarChar, prioridad)
      .input("estado", sql.VarChar, estado)
      .input("id_equipo", sql.Int, id_equipo)
      .query(`UPDATE incidencias
              SET titulo = @titulo, descripcion = @descripcion, prioridad = @prioridad, estado = @estado, id_equipo = @id_equipo
              WHERE id = @id AND id_usuario = @id_usuario`);
    res.json({ message: "Incidencia actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("id_usuario", sql.Int, req.user.userId)
      .input("estado", sql.VarChar, estado)
      .query("UPDATE incidencias SET estado = @estado WHERE id = @id AND id_usuario = @id_usuario");
    res.json({ message: "Estado actualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const eliminarIncidencia = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("id_usuario", sql.Int, req.user.userId)
      .query("DELETE FROM incidencias WHERE id = @id AND id_usuario = @id_usuario");
    res.json({ message: "Incidencia eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

import sql from "mssql";
import { getConnection } from "../db.js";

export const listarEquipos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM equipos");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const crearEquipo = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
      .query(`
        INSERT INTO equipos (nombre, descripcion)
        VALUES (@nombre, @descripcion)
      `);
    res.json({ message: "Equipo creado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const actualizarEquipo = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
      .query(`UPDATE equipos SET nombre=@nombre, descripcion=@descripcion WHERE id=@id`);
    res.json({ message: "Equipo actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const eliminarEquipo = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM equipos WHERE id=@id");
    res.json({ message: "Equipo eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

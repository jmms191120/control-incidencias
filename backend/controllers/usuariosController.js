import sql from "mssql";
import { getConnection } from "../db.js";

export const listarUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT id, nombre, email, rol FROM usuarios");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const crearUsuario = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("correo", sql.VarChar, correo)
      .input("contraseña", sql.VarChar, contraseña)
      .input("rol", sql.VarChar, rol)
      .query(`
        INSERT INTO usuarios (nombre, correo, ccontraseña, rol)
        VALUES (@nombre, @email, @contraseña, @rol)
      `);

    res.json({ message: "Usuario creado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .input("correo", sql.VarChar, correo)
      .input("rol", sql.VarChar, rol)
      .query(`
        UPDATE usuarios
        SET nombre = @nombre, correo = @correo, rol = @rol
        WHERE id = @id
      `);

    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query(`
      DELETE FROM usuarios WHERE id = @id
    `);

    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

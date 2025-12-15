import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "mssql";
import { getConnection } from "../db.js";

/* =========================
   REGISTRO DE USUARIO
========================= */
export const register = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({
        message: "Nombre, correo y password son obligatorios"
      });
    }

    const pool = await getConnection();

    // Verificar si el correo ya existe
    const exists = await pool.request()
      .input("correo", sql.VarChar, correo)
      .query("SELECT id FROM usuarios WHERE correo = @correo");

    if (exists.recordset.length > 0) {
      return res.status(409).json({
        message: "El correo ya está registrado"
      });
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("correo", sql.VarChar, correo)
      .input("password", sql.VarChar, hashedPassword)
      .input("rol", sql.VarChar, rol || "usuario")
      .query(`
        INSERT INTO usuarios (nombre, correo, password, rol, estado)
        VALUES (@nombre, @correo, @password, @rol, 1)
      `);

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Error al registrar usuario"
    });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        message: "Correo y password son obligatorios"
      });
    }

    const pool = await getConnection();

    const result = await pool.request()
      .input("correo", sql.VarChar, correo)
      .query(`
        SELECT id, nombre, correo, password, rol
        FROM usuarios
        WHERE correo = @correo AND estado = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    const user = result.recordset[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user.id,
        rol: user.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login correcto",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Error en login"
    });
  }
};

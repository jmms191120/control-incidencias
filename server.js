// server.js
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Servir frontend


// CONFIGURACIÓN DE CONEXIÓN
const dbConfig = {
  user: "JOSEMOISESMOYASANCHEZ",
  password: " ",
  server: "localhost", // localhost
  database: "CONTROLINCIDENCIAS",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
// ================================
// RUTAS API
// ================================

app.get("/api/equipos", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("SELECT * FROM equipos");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/incidencias", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`
      SELECT i.id, i.codigo_incidencia, i.titulo, i.descripcion, i.estado,
             e.codigo_equipo, e.marca, e.modelo,
             u.nombre AS tecnico
      FROM incidencias i
      LEFT JOIN equipos e ON i.id_equipo = e.id
      LEFT JOIN usuarios u ON i.id_usuario = u.id
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/incidencias", async (req, res) => {
  try {
    const { codigo_incidencia, titulo, descripcion, estado, id_equipo, id_usuario } = req.body;
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("codigo_incidencia", sql.NVarChar, codigo_incidencia)
      .input("titulo", sql.NVarChar, titulo)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.NVarChar, estado)
      .input("id_equipo", sql.Int, id_equipo)
      .input("id_usuario", sql.Int, id_usuario)
      .query(`
        INSERT INTO incidencias (codigo_incidencia, titulo, descripcion, estado, id_equipo, id_usuario)
        VALUES (@codigo_incidencia, @titulo, @descripcion, @estado, @id_equipo, @id_usuario)
      `);
    res.send("Incidencia registrada correctamente");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
import express from "express";
import cors from "cors";

// Rutas
import authRoutes from "./routes/authRoutes.js";
import incidenciasRoutes from "./routes/incidenciasRoutes.js";
import equiposRoutes from "./routes/equiposRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/incidencias", incidenciasRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API Control Incidencias OK");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

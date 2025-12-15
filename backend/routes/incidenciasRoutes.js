// backend/routes/incidenciasRoutes.js
import express from "express";
import { authRequired } from "../middlewares/authMiddleware.js";

import {
  crearIncidencia,
  listarIncidencias,
  actualizarIncidencia,
  actualizarEstado,
  eliminarIncidencia
} from "../controllers/incidenciasController.js";

const router = express.Router();

router.post("/", authRequired, crearIncidencia);
router.get("/", authRequired, listarIncidencias);
router.put("/:id", authRequired, actualizarIncidencia);
router.put("/:id/estado", authRequired, actualizarEstado);
router.delete("/:id", authRequired, eliminarIncidencia);

export default router;

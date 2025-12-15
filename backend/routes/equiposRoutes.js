import express from "express";
import {
  crearEquipo,
  listarEquipos,
  actualizarEquipo,
  eliminarEquipo
} from "../controllers/equiposController.js";

import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, listarEquipos);
router.post("/", authRequired, crearEquipo);
router.put("/:id", authRequired, actualizarEquipo);
router.delete("/:id", authRequired, eliminarEquipo);

export default router;

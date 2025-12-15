import express from "express";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuariosController.js";

import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔐 proteger TODAS las rutas
router.use(authRequired);

router.get("/", listarUsuarios);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;

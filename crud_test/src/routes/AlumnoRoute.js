const express = require("express")
const router = express.Router()

const alumnoController = require("../controllers/AlumnoController")

// Mostrar TODOS los Alumnos (GET)
router.get("/", alumnoController.mostrar)

// Crear Alumno (POST)
router.post("/crear", alumnoController.crear)

// Editar Alumno (POST)
router.post("/editar", alumnoController.editar)

// Eliminar Alumno (GET)
router.get("/borrar/:id", alumnoController.borrar);

module.exports = router


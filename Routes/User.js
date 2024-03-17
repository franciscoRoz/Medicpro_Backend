const { Router } = require("express");
const { CrearUsuario } = require("../Controller/AdmPersonas/POST/CreateUser");
const { ObtenerUsuario } = require("../Controller/AdmPersonas/GET/ObtenerUsuarios");
const { ObtenerPermisos } = require("../Controller/AdmPersonas/GET/ObtenerPermisos");
const { EliminarUsuario } = require("../Controller/AdmPersonas/POST/EliminarUser");
const { ActualizarUsurio } = require("../Controller/AdmPersonas/POST/ActualizarUsuario");


const router = Router();

router.post("/CrearUsuario", CrearUsuario);
router.get("/getusers",ObtenerUsuario);
router.get("/permisos",ObtenerPermisos)
router.post("/eliminarususarios",EliminarUsuario) 
router.post("/actualizarusuario",ActualizarUsurio)

module.exports = router;

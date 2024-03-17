const { Router } = require("express");
const { CrearCliente } = require("../Controller/Cliente/POST/CrearCliente");
const { GetClientes } = require("../Controller/Cliente/GET/ObtenerCliente");
const { EliminarCliente } = require("../Controller/Cliente/POST/EliminarCliente");
const { ActualizarCliente } = require("../Controller/Cliente/POST/ActializarCliente");

const router = Router();

router.post("/crearcliente", CrearCliente);
router.get('/obtenerclientes',GetClientes)
router.post('/eliminarcliente',EliminarCliente)
router.post('/actualizarcliente',ActualizarCliente)
module.exports = router;

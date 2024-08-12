
const { Router } = require("express");
const { CrearFactura } = require("../Controller/Facturas/POST/CreateFactura");
const { ObtenerFacturas } = require("../Controller/Facturas/GET/GetFacturas");
const { CrearDespacho } = require("../Controller/Facturas/POST/CrearDespacho");
const { obtenerdespachos } = require("../Controller/Facturas/GET/GetDespachos");
const { actualizardespacho } = require("../Controller/Facturas/POST/ActualizarDespacho");


const router = Router();

router.post("/crearfactura", CrearFactura);
router.get("/obtenerfacturas",ObtenerFacturas)
router.get("/obtenerdespachos",obtenerdespachos)
router.post("/creardespacho",CrearDespacho)
router.post("/actualizardespacho",actualizardespacho)
module.exports = router;

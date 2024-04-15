
const { Router } = require("express");
const { CrearFactura } = require("../Controller/Facturas/POST/CreateFactura");
const { ObtenerFacturas } = require("../Controller/Facturas/GET/GetFacturas");
const { CrearDespacho } = require("../Controller/Facturas/POST/CrearDespacho");


const router = Router();

router.post("/crearfactura", CrearFactura);
router.get("/obtenerfacturas",ObtenerFacturas)
router.post("/creardespacho",CrearDespacho)
module.exports = router;

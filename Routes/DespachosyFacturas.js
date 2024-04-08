
const { Router } = require("express");
const { CrearFactura } = require("../Controller/Facturas/POST/CreateFactura");
const { ObtenerFacturas } = require("../Controller/Facturas/GET/GetFacturas");


const router = Router();

router.post("/crearfactura", CrearFactura);
router.get("/obtenerfacturas",ObtenerFacturas)
module.exports = router;

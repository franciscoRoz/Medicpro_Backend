const { Router } = require("express");
const { ObtenerdatosVentas } = require("../Controller/Ventas/GET/ObtenerDatosVentas");
const { CrearOrdenDeCompra } = require("../Controller/Ventas/POST/CrearCompra");
const { Obtenerordenescompra } = require("../Controller/Ventas/GET/Obtenerordenesdecompra");



const router = Router();

router.get("/ObtenerdatosVentas", ObtenerdatosVentas);
router.post("/Crearordendecompra",CrearOrdenDeCompra)
router.get("/Obtenerordenescompra", Obtenerordenescompra);

module.exports = router;

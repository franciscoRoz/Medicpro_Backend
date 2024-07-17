const { Router } = require("express");
const { ObtenerdatosVentas } = require("../Controller/Ventas/GET/ObtenerDatosVentas");
const { CrearOrdenDeCompra } = require("../Controller/Ventas/POST/CrearCompra");
const { Obtenerordenescompra } = require("../Controller/Ventas/GET/Obtenerordenesdecompra");
const { EliminarCompra } = require("../Controller/Ventas/POST/EliminarCompra");



const router = Router();

router.get("/ObtenerdatosVentas", ObtenerdatosVentas);
router.post("/Crearordendecompra",CrearOrdenDeCompra)
router.get("/Obtenerordenescompra", Obtenerordenescompra);
router.post("/eliminarcompra",EliminarCompra)
module.exports = router;

const { Router } = require("express");
const { CrearBanco } = require("../Controller/Configuraciones/POST/CrearBanco");
const { EliminarBanco } = require("../Controller/Configuraciones/POST/EliminarBanco");
const { ObtenerBancos } = require("../Controller/Configuraciones/GET/ObtenerBancos");
const { CrearPaisAdquisicion } = require("../Controller/Configuraciones/POST/CrearPaisAdquisicion");
const { EliminarPaisAdquisicion } = require("../Controller/Configuraciones/POST/EliminarPaisAdquisicion");
const { ObtenerPaisAdquisicion } = require("../Controller/Configuraciones/GET/ObtenerPaisAdquisicion");
const { EliminarShippers } = require("../Controller/Configuraciones/POST/EliminarShippers");
const { CrearShipper } = require("../Controller/Configuraciones/POST/CrearShipper");
const { ObtenerShippers } = require("../Controller/Configuraciones/GET/ObtenerShippers");
const { CrearTipoVenta } = require("../Controller/Configuraciones/POST/CrearTipoVenta");
const { ObtenerTipoVenta } = require("../Controller/Configuraciones/GET/ObtenerTipoVenta");
const { EliminarTipoVenta } = require("../Controller/Configuraciones/POST/EliminarTipoVenta");
const { ActualizarBanco } = require("../Controller/Configuraciones/POST/ActualizarBanco");
const { ActualizarPA } = require("../Controller/Configuraciones/POST/ActualizarPA");
const { ActualizarShipper } = require("../Controller/Configuraciones/POST/ActualizarTipoVenta");
const { ActualizarTipoVenta } = require("../Controller/Configuraciones/POST/ActualizarShipper");

const router = Router();
//Bancos
router.post("/crearbancos", CrearBanco);
router.post('/eliminarbanco',EliminarBanco)
router.get('/obtenerbancos',ObtenerBancos)
router.post('/actualizarbanco',ActualizarBanco)

//Paises Adquisicon
router.post("/crearPA", CrearPaisAdquisicion);
router.post('/eliminarPA',EliminarPaisAdquisicion)
router.get('/obtenerPA',ObtenerPaisAdquisicion)
router.post('/actualizarpa',ActualizarPA)
//Shippers
router.post("/crearshipper", CrearShipper);
router.post('/eliminarshipper',EliminarShippers)
router.get('/obtenershippers',ObtenerShippers)
router.post('/actualizarshipper',ActualizarShipper)
//TipoVenta
router.post("/creartipoventa", CrearTipoVenta);
router.post('/eliminartpoventa',EliminarTipoVenta)
router.get('/obtenertipoventas',ObtenerTipoVenta)
router.post('/actualizartipoventa',ActualizarTipoVenta)
module.exports = router;

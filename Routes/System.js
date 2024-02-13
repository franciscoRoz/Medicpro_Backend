const { Router } = require("express");

const { CrearSolicitud } = require("../Controller/Adquisiciones/POST/CrearSolicitud");
const { ObtenerAdquisiciones } = require("../Controller/Adquisiciones/GET/ObtenerAdquisiciones");
const { ActualizarAdquisicion } = require("../Controller/Adquisiciones/POST/ActualizarAdquisicion");
const { UploadFile } = require("../Controller/Adquisiciones/POST/UploadFile");
const { DownloadFile } = require("../Controller/Adquisiciones/POST/Downloadfile");


const router = Router();

router.post("/GenerarAdquisiciones", CrearSolicitud);
router.get("/GetAdquisiciones", ObtenerAdquisiciones);
router.post("/UpdateAdquisicion",ActualizarAdquisicion);
router.post("/UploadFile",UploadFile)
router.get("/Downloadfile/:filename",DownloadFile)

module.exports = router;

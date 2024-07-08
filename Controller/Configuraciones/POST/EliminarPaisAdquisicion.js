const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const EliminarPaisAdquisicion= async (req, res = response) => {
  try {
    let PaisAdquisicion = req.body;
    PaisAdquisicion.hidden=true
    PaisAdquisicion.updateAt=Now()
    ActualizarItem(PaisAdquisicion,"Paises",PaisAdquisicion._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Pais de Adquisicion",
      })
      .status(400);
  }
};

module.exports = {
    EliminarPaisAdquisicion,
};

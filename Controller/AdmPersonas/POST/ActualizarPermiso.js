const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const ActualizarPermiso = async (req, res = response) => {
  try {
    let Permiso = req.body;
    Permiso.updateAt=Now()
    ActualizarItem(Permiso,"Cargos",Permiso._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo Actualizar el cargo",
      })
      .status(400);
  }
};

module.exports = {
    ActualizarPermiso,
};

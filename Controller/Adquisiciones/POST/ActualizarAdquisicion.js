const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const ActualizarAdquisicion = async (req, res = response) => {
  try {
    let objetoModificado = req.body;
    objetoModificado.updateAt=Now()
  ActualizarItem(objetoModificado,"Adquisiciones",objetoModificado._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se encontraros trabajadores que coincidan con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
    ActualizarAdquisicion,
};

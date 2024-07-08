const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const ActualizarPA = async (req, res = response) => {
  try {
    let Paisadquisicion = req.body;
    Paisadquisicion.updateAt=Now()
    ActualizarItem(Paisadquisicion,"Paises",Paisadquisicion._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo actualizar el Pais",
      })
      .status(400);
  }
};

module.exports = {
  ActualizarPA,
};

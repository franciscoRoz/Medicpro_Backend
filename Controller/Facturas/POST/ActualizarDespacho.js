const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const actualizardespacho = async (req, res = response) => {
  try {
    let despacho = req.body;
    despacho.updateAt=Now()
    ActualizarItem(despacho,"Despacho",despacho._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo actualizar el Despacho",
      })
      .status(400);
  }
};

module.exports = {
    actualizardespacho,
};

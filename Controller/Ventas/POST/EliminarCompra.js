const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const EliminarCompra= async (req, res = response) => {
  try {
    let OrdenesCompra = req.body;
    OrdenesCompra.hidden=true
    OrdenesCompra.updateAt=Now()
    ActualizarItem(OrdenesCompra,"OrdenesDeCompra",OrdenesCompra._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el ordendecompra",
      })
      .status(400);
  }
};

module.exports = {
    EliminarCompra,
};

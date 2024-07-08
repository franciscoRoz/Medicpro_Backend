const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const ActualizarCliente = async (req, res = response) => {
  try {
    let Cliente = req.body;
    Cliente.updateAt=Now()
    ActualizarItem(Cliente,"Clientes",Cliente._id)
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
    ActualizarCliente,
};

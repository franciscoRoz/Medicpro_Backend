const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const EliminarCliente = async (req, res = response) => {
  try {
    let Cliente = req.body;
    Cliente.hidden=true
    ActualizarItem(Cliente,"Clientes",Cliente._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Cliente",
      })
      .status(400);
  }
};

module.exports = {
    EliminarCliente,
};

const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearCliente = async (req, res = response) => {
  try {
    let NuevoCLiente = req.body;
    NuevoCLiente.createdAt=Now()
    InsertarItem(NuevoCLiente, "Clientes");
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se pudo crear el nuevo cliente",
      })
      .status(400);
  }
};

module.exports = {
    CrearCliente,
};

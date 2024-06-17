const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const ActualizarBanco = async (req, res = response) => {
  try {
    let banco = req.body;
    ActualizarItem(banco,'Bancos',banco._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo actualizar el Banco",
      })
      .status(400);
  }
};

module.exports = {
  ActualizarBanco,
};

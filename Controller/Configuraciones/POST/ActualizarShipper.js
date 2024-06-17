const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const ActualizarTipoVenta = async (req, res = response) => {
  try {
    let tipoventa = req.body;
    ActualizarItem(tipoventa,"TipoVenta",tipoventa._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo ASctualizar el tipo de venta",
      })
      .status(400);
  }
};

module.exports = {
  ActualizarTipoVenta,
};

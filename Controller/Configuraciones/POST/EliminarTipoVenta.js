const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const EliminarTipoVenta= async (req, res = response) => {
  try {
    let TipoVenta = req.body;
    TipoVenta.hidden=true
    ActualizarItem(TipoVenta,"TipoVenta",TipoVenta._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Tipo de venta",
      })
      .status(400);
  }
};

module.exports = {
    EliminarTipoVenta,
};

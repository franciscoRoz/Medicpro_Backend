const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");


const CrearFactura = async (req, res = response) => {
  try {
    let Factura = req.body;
    Factura.createAt=Now();
  InsertarItem(Factura,"Facturas")
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo agregar el producto",
      })
      .status(400);
  }
};

module.exports = {
    CrearFactura,
};

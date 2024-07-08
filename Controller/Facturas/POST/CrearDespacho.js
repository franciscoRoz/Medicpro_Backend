const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearDespacho = async (req, res = response) => {
  try {
    let Despacho = req.body;
    Despacho.createdAt = Now();
    InsertarItem(Despacho, "Despacho");
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se pudo agregar el producto",
      })
      .status(400);
  }
};

module.exports = {
    CrearDespacho,
};

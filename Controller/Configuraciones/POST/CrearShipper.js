const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearShipper = async (req, res = response) => {
  try {
    let objetoOriginal = req.body;
    //Validar existencia de item
    if (
      (
        await ObtenerItem(
          { nombre: objetoOriginal.nombre ,hidden:false},
          "Shippers"
        )
      ).length > 0
    ) {
      return res
        .send({ succes: false, estado: "Shipper ya creada" })
        .status(404);
    }
    objetoOriginal.createdAt=Now()
    InsertarItem(objetoOriginal, "Shippers");
    res.send({ succes: true, estado: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se encontraros shippers que coincidan con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
    CrearShipper,
};

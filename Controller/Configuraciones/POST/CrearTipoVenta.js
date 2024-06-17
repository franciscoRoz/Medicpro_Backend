const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const CrearTipoVenta = async (req, res = response) => {
  try {
    let objetoOriginal = req.body;
    //Validar existencia de item
    if (
      (
        await ObtenerItem(
          { nombre: objetoOriginal.nombre,hidden:false },
          "TipoVenta"
        )
      ).length > 0
    ) {
      return res
        .send({ succes: false, estado: "Tipo de venta ya creada" })
        .status(404);
    }

    InsertarItem(objetoOriginal, "TipoVenta");
    res.send({ succes: true, estado: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se encontraro Tipo de venta que coincida con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
    CrearTipoVenta,
};

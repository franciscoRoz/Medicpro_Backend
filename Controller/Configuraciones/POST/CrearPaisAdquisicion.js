const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearPaisAdquisicion = async (req, res = response) => {
  try {
    let objetoOriginal = req.body;
    //Validar existencia de item
    if (
      (
        await ObtenerItem(
          { nombre: objetoOriginal.nombre,hidden:false },
          "Paises"
        )
      ).length > 0
    ) {
      return res.send({ succes: false, estado: "Pais ya creada" }).status(404);
    }
    objetoOriginal.createdAt=Now()
    InsertarItem(objetoOriginal, "Paises");
    res.send({ succes: true, estado: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se encontraros Paises que coincidan con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
  CrearPaisAdquisicion,
};

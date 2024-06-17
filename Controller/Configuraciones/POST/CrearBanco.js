const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");

const CrearBanco = async (req, res = response) => {
  try {
    let objetoOriginal = req.body;
    //Validar existencia de item
    // if (
    //   (
    //     await ObtenerItem(
    //       { noperacion: objetoOriginal.noperacion },
    //       "Adquisiciones"
    //     )
    //   ).length > 0
    // ) {
    //   return res
    //     .send({ succes: false, estado: "Banco ya creada" })
    //     .status(404);
    // }
    console.log("a");
    InsertarItem(objetoOriginal, "Bancos");
    res.send({ succes: true, estado: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se encontraros Bancos que coincidan con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
    CrearBanco,
};

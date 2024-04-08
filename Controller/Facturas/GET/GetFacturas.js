const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const ObtenerFacturas = async (req, res = response) => {
  try {
    let OrdenesDeCompa = await ObtenerItem({}, "Facturas");
    
    res.send(OrdenesDeCompa).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se encontraron Ordenes De Compa",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerFacturas,
};

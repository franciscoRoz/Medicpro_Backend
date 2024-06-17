const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerTipoVenta = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false},"TipoVenta")
    res.send(usuarios).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron Tipos de Venta",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerTipoVenta,
};

const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerCargos = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false},"Cargos")
    res.send(usuarios).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron Cargos",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerCargos,
};

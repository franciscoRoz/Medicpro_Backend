const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerPaisAdquisicion = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false},"Paises")
    res.send(usuarios).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron Bancos",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerPaisAdquisicion,
};

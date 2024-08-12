const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerChofer = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false,cargo:"Chofer",estado:"Habilitado"},"Usuarios")
    res.send(usuarios).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron usuarios",
      })
      .status(400);
  }
};

module.exports = {
  ObtenerChofer,
};

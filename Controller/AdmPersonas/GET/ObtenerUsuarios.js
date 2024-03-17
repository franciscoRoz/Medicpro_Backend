const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerUsuario = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false},"Usuarios")
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
    ObtenerUsuario,
};

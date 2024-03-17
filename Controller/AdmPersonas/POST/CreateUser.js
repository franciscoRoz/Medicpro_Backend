const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");


const CrearUsuario = async (req, res = response) => {
  try {
  
  InsertarItem(req.body,"Usuarios")
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se pudo registrar el usuario",
      })
      .status(400);
  }
};

module.exports = {
    CrearUsuario,
};

const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");


const CrearCargo = async (req, res = response) => {
  try {
  
  let Cargo=req.body
  Cargo.createdAt=Now()
  InsertarItem(Cargo,"Cargos")
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
  CrearCargo,
};

const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const EliminarCargo = async (req, res = response) => {
  try {
    let Cargo = req.body;
    Cargo.hidden=true
    ActualizarItem(Cargo,"Cargos",Cargo._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Cliente",
      })
      .status(400);
  }
};

module.exports = {
    EliminarCargo,
};

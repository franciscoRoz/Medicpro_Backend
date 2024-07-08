const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const EliminarBanco= async (req, res = response) => {
  try {
    let Banco = req.body;
    Banco.hidden=true
    Banco.updateAt=Now()
    ActualizarItem(Banco,"Bancos",Banco._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Banco",
      })
      .status(400);
  }
};

module.exports = {
    EliminarBanco,
};

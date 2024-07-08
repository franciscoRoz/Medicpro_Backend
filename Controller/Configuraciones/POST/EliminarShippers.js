const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const EliminarShippers= async (req, res = response) => {
  try {
    let Shippers = req.body;
    Shippers.hidden=true
    Shippers.updateAt=Now()
    ActualizarItem(Shippers,"Shippers",Shippers._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Shipper",
      })
      .status(400);
  }
};

module.exports = {
    EliminarShippers,
};

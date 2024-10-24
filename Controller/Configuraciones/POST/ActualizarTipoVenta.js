const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const ActualizarShipper = async (req, res = response) => {
  try {
    let Shipper = req.body;
    Shipper.updateAt=Now()
    ActualizarItem(Shipper,"Shippers",Shipper._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo ASctualizar el tipo de venta",
      })
      .status(400);
  }
};

module.exports = {
  ActualizarShipper,
};

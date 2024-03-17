const { response } = require("express");
const { ActualizarItem } = require("../../../../Component/MongoDB/ActualizarItem");


const EliminarProveedor = async (req, res = response) => {
  try {
    let Proveedor = req.body;
    Proveedor.hidden=true
    ActualizarItem(Proveedor,"Proveedores",Proveedor._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Proveedor",
      })
      .status(400);
  }
};

module.exports = {
    EliminarProveedor,
};

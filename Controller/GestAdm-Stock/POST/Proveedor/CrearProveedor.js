const { response } = require("express");
const { InsertarItem } = require('../../../../Component/MongoDB/InsertarItem');

const CrearProveedor = async (req, res = response) => {
  try {
    let proveedor = req.body;
    console.log(proveedor);
    InsertarItem(proveedor, "Proveedores");
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se pudo crear el proveedor",
      })
      .status(400);
  }
};

module.exports = {
  CrearProveedor,
};

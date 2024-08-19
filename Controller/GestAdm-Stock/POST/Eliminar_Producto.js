const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const EliminarProducto = async (req, res = response) => {
  try {
    let Producto = req.body;
    Producto.hidden=true
    Producto.updateAt=Now()
    ActualizarItem(Producto,"Productos",Producto._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el producto",
      })
      .status(400);
  }
};

module.exports = {
    EliminarProducto,
};

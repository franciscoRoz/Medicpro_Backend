const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");


const CrearProducto = async (req, res = response) => {
  try {
    let Producto = req.body;
    console.log("track");
  Producto.createdAt=Now()
  InsertarItem(Producto,"Productos")
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo agregar el producto",
      })
      .status(400);
  }
};

module.exports = {
    CrearProducto,
};

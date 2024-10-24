const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const ActualizarProducto = async (req, res = response) => {
  try {
    let Producto = req.body;
    const totalUnidades = Producto.detalles.reduce((total, detalle) => total + parseInt(detalle.unidades), 0);
    console.log(totalUnidades);
    Producto.stock=totalUnidades
    Producto.updateAt=Now()
    ActualizarItem(Producto,"Productos",Producto._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se encontraros trabajadores que coincidan con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
    ActualizarProducto,
};

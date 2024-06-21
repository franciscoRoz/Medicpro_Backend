const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");

const CrearProductomasivo = async (req, res = response) => {
  try {
    let Productos = req.body;
    for (let i = 0; i < Productos.length; i++) {
        await InsertarItem(Productos[i], "Productos");
      }

    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se pudo agregar el producto",
      })
      .status(400);
  }
};

module.exports = {
  CrearProductomasivo,
};

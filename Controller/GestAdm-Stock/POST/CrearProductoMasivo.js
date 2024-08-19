const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearProductomasivo = async (req, res = response) => {
  try {
    let Productos = req.body;
    for (let i = 0; i < Productos.length; i++) {
      let nuevoproducto={...Productos[i],createdAt:Now(),stock:1000,stockvirtual:1000,Detalle:[
        {
          "lote": "66332",
          "unidades": "100000",
          "unidadcaja": "1000",
          "ncajas": "100.00",
          "ubicacion": "D1B"
        }]}
        await InsertarItem(nuevoproducto, "Productos");
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

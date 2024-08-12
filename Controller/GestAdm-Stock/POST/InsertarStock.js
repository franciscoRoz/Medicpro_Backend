const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { ObjectId } = require("mongodb");
const { Now } = require("../../../Utility/LocalTime");
const insertarStock = async (req, res = response) => {
  
  console.log("test");
  try {
    console.log("test");
    let { id, cantidad, data,detalle } = req.body;
    const objectId = new ObjectId(id);
    console.log("test");
    let producto = await ObtenerItem({ _id: objectId }, "Productos");
    console.log("test2");
    if (parseInt(cantidad) > parseInt(producto[0].stocktransito)) {
      res
        .send({
          succes: false,
          estado: "No se puede realizar la operación intente mas tarde",
        })
        .status(401);
    }
    console.log("test");
    let nuevoproducto={...producto[0]}
    console.log(nuevoproducto);
    nuevoproducto.Detalle.push(detalle.detalle)
  
    
    nuevoproducto={...nuevoproducto,stocktransito:parseInt(producto[0].stocktransito)-cantidad,stock:parseInt(producto[0].stock)+parseInt(cantidad),createdAt:Now()}
    
    
    await ActualizarItem(nuevoproducto, "Productos", id);
    await ActualizarItem(data, "Adquisiciones", data._id);
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se encontraron productos que coincidan con la busqueda",
      })
      .status(400);
  }
};

module.exports = {
  insertarStock,
};

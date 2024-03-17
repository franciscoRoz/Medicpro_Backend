const { response } = require("express");
const { ObtenerItem } = require("../../../../Component/MongoDB/ObtenerItem");

const Getproductosordenado = async (req, res = response) => {
  try {
    let Productos = await ObtenerItem({ estado: "Visible" }, "Productos");
    const nuevoFormato = {};

    Productos.forEach((item) => {
      nuevoFormato[item.nombre] = item.nombre;
    });
    console.log(nuevoFormato);
    res.send(nuevoFormato).status(200);
  } catch (e) {
    res
      .send({
        succes: false,
        estado: "No se encontraron Productos",
      })
      .status(400);
  }
};

module.exports = {
  Getproductosordenado,
};

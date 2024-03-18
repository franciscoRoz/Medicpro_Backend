const { response } = require("express");
const { ObtenerItem } = require("../../../../Component/MongoDB/ObtenerItem");

const GetproductosCompletoProveedor = async (req, res = response) => {
  try {
    let Productos = await ObtenerItem({ hidden:false }, "Proveedores");
   
    res.send(Productos).status(200);
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
    GetproductosCompletoProveedor,
};

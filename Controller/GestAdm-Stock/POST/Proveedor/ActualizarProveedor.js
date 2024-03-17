const { response } = require("express");
const { ActualizarItem } = require("../../../../Component/MongoDB/ActualizarItem");


const ActualizarProveedor = async (req, res = response) => {
  try {
    let Proveedor = req.body;
    
    ActualizarItem(Proveedor,"Proveedores",Proveedor._id)
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
    ActualizarProveedor,
};

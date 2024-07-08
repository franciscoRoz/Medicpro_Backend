const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearClientemasivo = async (req, res = response) => {
  try {
  
    let NuevoCLiente = req.body;
  
    for (let i = 0; i < NuevoCLiente.length; i++) {
      let newcliente ={...NuevoCLiente[i]}
      newcliente.nombre=NuevoCLiente[i].nombre.toUpperCase()
      newcliente.createdAt=Now()
      await InsertarItem(newcliente, "Clientes");
    }

    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se pudo crear el nuevo cliente",
      })
      .status(400);
  }
};

module.exports = {
  CrearClientemasivo,
};

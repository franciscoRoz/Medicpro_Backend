const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const GetClientes = async (req, res = response) => {
  try {
    let Productos=await ObtenerItem({hidden:false},"Clientes")
    res.send(Productos).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron Productos",
      })
      .status(400);
  }
};

module.exports = {
    GetClientes,
};

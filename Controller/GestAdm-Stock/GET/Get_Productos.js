const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const Get_productos = async (req, res = response) => {
  try {
    let Productos=await ObtenerItem({estado:'Visible'},"Productos")
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
  Get_productos,
};

const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const Get_Stock = async (req, res = response) => {
  try {
    const id = req.params.id;

    let Productos=await ObtenerItem({"productos.Producto":id},"Adquisiciones")
    console.log({"productos.Producto":id});
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
    Get_Stock,
};

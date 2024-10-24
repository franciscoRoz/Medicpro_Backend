const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { ObjectId } = require("mongodb"); 


const Get_producto_id = async (req, res = response) => {
  try {
    console.log('a');
    const id = req.params.id;
    console.log({"_id":new ObjectId(id)});
    let Productos=await ObtenerItem({"_id":new ObjectId(id)},"Productos")
   
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
  Get_producto_id,
};

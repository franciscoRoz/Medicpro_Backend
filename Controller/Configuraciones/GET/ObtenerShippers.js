const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerShippers = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false},"Shippers")
    res.send(usuarios).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron Shippers",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerShippers,
};

const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");



const ObtenerBancos = async (req, res = response) => {
  try {
    let usuarios=await ObtenerItem({hidden:false},"Bancos")
    res.send(usuarios).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se encontraron Bancos",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerBancos,
};

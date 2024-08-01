const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const obtenerdespachos = async (req, res = response) => {
  try {
    let despacho = await ObtenerItem({ hidden: false }, "Despacho");
    
    res.send(despacho).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se encontraron Ordenes De Compa",
      })
      .status(400);
  }
};

module.exports = {
    obtenerdespachos,
};

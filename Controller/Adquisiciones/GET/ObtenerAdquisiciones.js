const { response } = require("express");

const { ObtenerItemordenados } = require("../../../Component/MongoDB/ObtenerItemordenados");


const ObtenerAdquisiciones = async (req, res = response) => {
  try {
    let data = await ObtenerItemordenados([
        { $sort: { estado: 1, fecha: -1 } } 
      ],"Adquisiciones")
    res.send(data).status(200);
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
    ObtenerAdquisiciones,
};

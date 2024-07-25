const { response } = require("express");
const { ObtenerItemordenados } = require("../../../Component/MongoDB/ObtenerItemordenados");


const ObtenerFacturas = async (req, res = response) => {
  try {
    let OrdenesDeCompa = await ObtenerItemordenados([
      {
        $lookup: {
          from: 'OrdenesDeCompra', // Nombre de la colección con la que queremos hacer el lookup
          localField: 'infoOrdenCompra', // Campo local en la colección 'ordenesDeCompra' (en este caso, _id)
          foreignField: '_id', // Campo en la colección 'facturas' con el que se hará la unión (por ejemplo, 'ordenId' en la colección facturas)
          as: 'metadataordencompra' // Nombre del campo nuevo que contendrá los resultados del lookup
        }
      }
    ], "Facturas");
    console.log("test");

    res.send(OrdenesDeCompa).status(200);
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
    ObtenerFacturas,
};

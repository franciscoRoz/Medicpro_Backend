const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");

const { ObtenerItemOne } = require("../../../Component/MongoDB/ObtenerItemOne");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");

const { ObjectId } = require("mongodb");
const sumarMontos = (metodosdepago) => {
  let suma = 0;
  metodosdepago.forEach((metodo) => {
    // Convertimos el monto a número y lo sumamos si es un número válido
    const monto = parseFloat(metodo.monto);
    if (!isNaN(monto)) {
      suma += monto;
    }
  });
  return suma;
};
const CrearFactura = async (req, res = response) => {
  try {
    let Factura = req.body;
    let OrdenesDeCompa = await ObtenerItemOne(
      Factura.infoOrdenCompra,
      "OrdenesDeCompra"
    );
    if (OrdenesDeCompa === null) {
      return res
        .send({
          succes: false,
          estado: "No se encontró la orden de compra, intente más tarde",
        })
        .status(404);
    }
    OrdenesDeCompa.estado = "Facturado";
    ActualizarItem(OrdenesDeCompa, "OrdenesDeCompra", OrdenesDeCompa._id);
    const totalMonto = sumarMontos(Factura.metodosdepago);
    console.log(parseFloat(totalMonto) === parseFloat(Factura.valortotal));
    parseFloat(totalMonto) === parseFloat(Factura.valortotal)
      ? (Factura.estado = "Pagado")
      : (Factura.estado = "Pago Parcial");
    Factura.createdAt = Now();
    Factura.infoOrdenCompra = new ObjectId(Factura.infoOrdenCompra);
    InsertarItem(Factura, "Facturas");
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({ succes: false, estado: "No se pudo agregar el producto" })
      .status(400);
  }
};

module.exports = {
  CrearFactura,
};

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
    let OrdenesDeCompra = await ObtenerItemOne(
      Factura.infoOrdenCompra,
      "OrdenesDeCompra"
    );
    if (OrdenesDeCompra === null) {
      return res
        .send({
          succes: false,
          estado: "No se encontró la orden de compra, intente más tarde",
        })
        .status(404);
    }
    const totalMonto = sumarMontos(Factura.metodosdepago);
    OrdenesDeCompra.pagado = parseInt(OrdenesDeCompra.pagado || 0) + parseInt(String(totalMonto).replace(".",""));
    OrdenesDeCompra.estado = parseFloat(totalMonto) === parseFloat(OrdenesDeCompra.pagado)? "Facturado": "Pago Parcial";
    ActualizarItem(OrdenesDeCompra, "OrdenesDeCompra", OrdenesDeCompra._id);

    parseFloat(totalMonto) === parseFloat(Factura.valortotal)
      ? (Factura.estado = "Pagado")
      : (Factura.estado = "Pago Parcial");
    Factura.createdAt = Now();

    InsertarItem(
      { ...Factura, infoOrdenCompra: new ObjectId(Factura.infoOrdenCompra) },
      "Facturas"
    );
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

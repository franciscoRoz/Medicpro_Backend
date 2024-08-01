const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");

const CrearDespacho = async (req, res = response) => {
  console.log("A");
  try {
    let Despacho = req.body;
    Despacho.createdAt = Now();

    await Despacho.productosenviados.forEach(productoEnviado => {
      // Encontrar el índice del producto correspondiente en factura.factura.metadataordencompra[0].Productos por su código
      let index = Despacho.factura.metadataordencompra[0].Productos.findIndex(producto => producto.codigo === productoEnviado.codigo);

      // Si encontramos el índice válido, actualizar la cantidad despachada
      if (index !== -1) {
          // Convertir cantidaddespacho y cantidadDespachada a números y sumarlos
          let cantidaddespacho = parseFloat(Despacho.factura.metadataordencompra[0].Productos[index].cantidaddespacho);
          let cantidadDespachada = parseFloat(productoEnviado.cantidadDespachada);
  
          // Verificar si ambos valores son numéricos válidos antes de sumar
          
              // Actualizar la cantidad despachada en factura
              console.log((parseInt(cantidaddespacho||0) + parseInt(cantidadDespachada||0)));
              Despacho.factura.metadataordencompra[0].Productos[index].cantidadDespachada = (parseInt(cantidaddespacho||0) + parseInt(cantidadDespachada||0)); // Convertir de nuevo a string si es necesario
         
      } else {
          console.error(`Producto factura no encontrado para el código: ${productoEnviado.codigo}`);
      }
  });
  
 
    ActualizarItem(Despacho.factura.metadataordencompra[0],"OrdenesDeCompra",Despacho.factura.metadataordencompra[0]._id);
    Despacho.estado="Pendiente"
    Despacho.hidden=false
    InsertarItem(Despacho, "Despacho");
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    console.log(e);
    res
      .send({
        succes: false,
        estado: "No se pudo agregar el producto",
      })
      .status(400);
  }
};

module.exports = {
  CrearDespacho,
};

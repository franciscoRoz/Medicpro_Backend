const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { ObjectId } = require("mongodb"); 
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const CrearDespacho = async (req, res = response) => {




  try {
    let Despacho = req.body;
    Despacho.createdAt = Now();
    let i=0
    
      for (const productoEnviado of Despacho.productosenviados) {
        
        // Encontrar el índice del producto correspondiente en factura.factura.metadataordencompra[0].Productos por su código
        let index = Despacho.factura.metadataordencompra[0].Productos.findIndex(producto => producto.codigo === productoEnviado.codigo);
        
        // Si encontramos el índice válido, actualizar la cantidad despachada
        if (index !== -1) {
          // Convertir cantidaddespacho y cantidadDespachada a números y sumarlos
          let cantidaddespacho = parseFloat(Despacho.factura.metadataordencompra[0].Productos[index].cantidaddespacho);
          let cantidadDespachada = parseFloat(productoEnviado.cantidadDespachada);
    
          // Verificar si ambos valores son numéricos válidos antes de sumar
          let cantidadTotal = (parseFloat(cantidaddespacho || 0) + parseFloat(cantidadDespachada || 0));
          Despacho.factura.metadataordencompra[0].Productos[index].cantidadDespachada = cantidadTotal; // Actualiza la cantidad despachada
    
          // Realizar una llamada asíncrona
          try {
            
            let res = await ObtenerItem({"_id": new ObjectId(productoEnviado.nombre[0]._id)}, "Productos");
            res[0].stockvirtual=parseInt(res[0].stockvirtual)-parseInt(cantidaddespacho)
           
            await ActualizarItem(res[0],"Productos",res[0]._id)
    
          
            Despacho.productosenviados[i].stockDisponible=parseInt(res[0].stockvirtual)-parseInt(cantidaddespacho)
          } catch (error) {
            console.error('Error al obtener el ítem:', error);
          }
        } else {
          console.error(`Producto factura no encontrado para el código: ${productoEnviado.codigo}`);
        }
        i+=1
      }
    
    
 
   ActualizarItem(Despacho.factura.metadataordencompra[0],"OrdenesDeCompra",Despacho.factura.metadataordencompra[0]._id);
    Despacho.estado="Pendiente"
    Despacho.hidden=false
    console.log(Despacho);
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

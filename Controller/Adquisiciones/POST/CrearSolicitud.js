const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const CrearSolicitud = async (req, res = response) => {
  try {
    let objetoOriginal = req.body;
   
   const arregloTransformado = 
    {
      noperacion: objetoOriginal.noperacion,
      fecha: objetoOriginal.fecha,
      vdolar: objetoOriginal.vdolar,
      pi: objetoOriginal.pi,
      opepesos: objetoOriginal.opepesos,
      opeusd: objetoOriginal.opeusd,
      swift: objetoOriginal.swift,
      toperacion: objetoOriginal.toperacion,
      abonos: [
        {
          abono: objetoOriginal.abono,
          fecha: objetoOriginal.fecha,
          pabono: objetoOriginal.pabono,
          pabonousd: objetoOriginal.pabonousd,
          banco: objetoOriginal.banco,
          swift: objetoOriginal.swift,
          cae: objetoOriginal.cae,
          vdolar: objetoOriginal.vdolar
        }
      ],
      productos: objetoOriginal.productos.map(producto => ({
        Proveedor: producto.Proveedor,
        Producto: producto.Producto,
        Cantidad: producto.Cantidad,
        ValorDolar: producto.ValorDolar,
        Codigo: producto.Codigo
      })),
      estado: "Producción",
      envio: {
        shipping: "",
        dolarshipping: "",
        pdolarshipping:"",
        pesosshipping: "",
        fechaembarque: "",
        fechaarribo: "",
        numeroaprv: "",
        gastos: "",
        thc: "",
        nasignacion: "",
        totalpesostransporte: "",
        valoraduana: "",
        fechacierre: "",
        valordolartierra:"",
        seguroshipping:"",
        bl:""

      },
      documentos:[
      {titulo:"Importacion",nombre:"",url:""},
      {titulo:"Aduana",nombre:"",url:""},
      {titulo:"Declaracion de ingreso",nombre:"",url:""},
      {titulo:"TGR",nombre:"",url:""},
      {titulo:"Puertuario",nombre:"",url:""},
      {titulo:"Transporte",nombre:"",url:""},
      {titulo:"Documento1",nombre:"",url:""},
      {titulo:"Documento2",nombre:"",url:""}]
    };
  
     objetoOriginal.productos.map(async(producto)=> {
      let res = await ObtenerItem({ estado:"Visible",nombre: producto.Producto},"Productos")
      res[0].stocktransito=parseInt(res[0].stocktransito)+parseInt(producto.Cantidad)
      ActualizarItem(res[0],"Productos",res[0]._id)
      console.log();
     }
    )

  InsertarItem(arregloTransformado,"Adquisiciones")
    res.send({ succes: true, ok:"OK" }).status(200);
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
    CrearSolicitud,
};

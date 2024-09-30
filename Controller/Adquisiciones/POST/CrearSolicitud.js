const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");


const CrearSolicitud = async (req, res = response) => {
  try {
    let objetoOriginal = req.body;
  
    if((await ObtenerItem({ noperacion: objetoOriginal.noperacion},"Adquisiciones")).length>0){
      return res.send({ succes: false, estado:"Adquisición ya creada" }).status(404);
    }
    let arreglodeProductos=objetoOriginal.productos.map(producto => ({
      Proveedor: producto.Proveedor,
      Producto: producto.Producto,
      Cantidad: producto.Cantidad,
      ValorDolar: producto.ValorDolar,
      Codigo: producto.Codigo
    }))
   const arregloTransformado = 
    { 
      createdAt:Now(),
      noperacion: objetoOriginal.noperacion,
      fecha: objetoOriginal.fecha,
      vdolar: objetoOriginal.vdolar,
      pi: objetoOriginal.pi,
      opepesos: objetoOriginal.opepesos,
      opeusd: objetoOriginal.opeusd,
      swift: objetoOriginal.swift,
      toperacion: objetoOriginal.toperacion,
      pais:objetoOriginal.pais,
      abonos: [
        {
          abono: objetoOriginal.abono,
          fecha: objetoOriginal.fecha,
          pabono: objetoOriginal.pabono,
          pabonousd: objetoOriginal.pabonousd,
          banco: objetoOriginal.banco,
          swift: objetoOriginal.swift,
          cae: objetoOriginal.mcae,
          vdolar: objetoOriginal.vdolar
        }
      ],
      productos: arreglodeProductos,
      metadataProducto: arreglodeProductos,
      estado: "Producción",
      mcae:objetoOriginal.mcae,
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
  

    try {
      let cargastock= objetoOriginal.productos.map(async(producto)=> {
        let res = await ObtenerItem({ hidden:false,nombre: producto.Producto},"Productos")
          res[0].stocktransito=parseInt(res[0].stocktransito)+parseInt(producto.Cantidad)
        await ActualizarItem(res[0],"Productos",res[0]._id)
       }
      )

      await Promise.all(cargastock);
    } catch (error) {
      return res.send({ succes: false, estado:"Productos no encontrados, validar lista de proveedores" }).status(404);
    }
     


  InsertarItem(arregloTransformado,"Adquisiciones")
    res.send({ succes: true, estado:"OK" }).status(200);
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

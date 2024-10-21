const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");
const { Now } = require("../../../Utility/LocalTime");
const { generatePDF } = require("./PDF/generadorguiradespacho");


const actualizardespacho = async (req, res = response) => {
  try {
    console.log("ejecucion PDF");
    let despacho = req.body;
    let validacionitem=true
    despacho.updateAt=Now()
    await despacho.productosenviados.map((item)=>validacionitem=item.cantidadcargada!==item.cantidaddespacho&&false )
   const path= await generatePDF(despacho)
despacho.estado="Asignado"
despacho.adjunto={Documento:path,url:path,nombre:'guia'}
    ActualizarItem(despacho,"Despacho",despacho._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo actualizar el Despacho",
      })
      .status(400);
  }
};

module.exports = {
    actualizardespacho,
};

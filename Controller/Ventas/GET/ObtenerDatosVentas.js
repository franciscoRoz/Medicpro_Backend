const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const ObtenerdatosVentas = async (req, res = response) => {
  try {
    let Productos = await ObtenerItem({ hidden:false }, "Productos");
    let Usuario= await ObtenerItem({hidden:false,cargo:"Vendedor"},"Usuarios");
    let Clientes= await ObtenerItem({hidden:false},"Clientes");
    let Tipoventa= await ObtenerItem({hidden:false},"TipoVenta");
    const nuevoFormatoUsuarios = {};
    const nuevoFormatoClientes = {};
    const nuevoFormatotipoventa = {};
    Usuario.forEach((item) => {
        nuevoFormatoUsuarios[item.nombres] = item.nombres;
    });  
    Clientes.forEach((item) => {
        nuevoFormatoClientes[item.nombre] = item.nombre;
    });
    Tipoventa.forEach((item) => {
      nuevoFormatotipoventa[item.nombre] = item.nombre;
  });



    res.send({Productos,Usuarios:nuevoFormatoUsuarios,Clientes:nuevoFormatoClientes,Tipoventa:nuevoFormatotipoventa}).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se encontraron Productos",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerdatosVentas,
};

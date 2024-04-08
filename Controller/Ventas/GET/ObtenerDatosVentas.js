const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const ObtenerdatosVentas = async (req, res = response) => {
  try {
    let Productos = await ObtenerItem({ estado: "Visible" }, "Productos");
    let Usuario= await ObtenerItem({hidden:false},"Usuarios");
    let Clientes= await ObtenerItem({hidden:false},"Clientes");
    const nuevoFormatoUsuarios = {};
    const nuevoFormatoClientes = {};
    Usuario.forEach((item) => {
        nuevoFormatoUsuarios[item.nombres] = item.nombres;
    });
    console.log(nuevoFormatoUsuarios);
    
    
    Clientes.forEach((item) => {
        nuevoFormatoClientes[item.nombre] = item.nombre;
    });



    res.send({Productos,Usuarios:nuevoFormatoUsuarios,Clientes:nuevoFormatoClientes}).status(200);
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

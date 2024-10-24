const { response } = require("express");

const ObtenerPermisos = async (req, res = response) => {
  try {
    let permisos=
    [
        
        {
          name: "Adquisición",
          icon: "https://res.cloudinary.com/dgi90lgbq/image/upload/v1705253502/vozvbmialf33lfqbahiv.png",
          items: ["Generar adquisicion comex", "Seguimiento Pedidos",],
        },
        {
          name: "Ventas",
          icon: "https://res.cloudinary.com/dgi90lgbq/image/upload/v1705344193/vj8jq6tlf1ga7kagnznp.png",
          items: ["Ingreso Orden de Compra", "Adm. de Orden de Compra","Despacho Bodega","Ingresar Factura","Facturas"],
        },{
          name: "Bodega",
          icon: "https://res.cloudinary.com/dgi90lgbq/image/upload/v1724071399/pdqgsvej8o5jv4fwnznn.png",
          items: ["Despachos","Picking", "Rutas"],
        },{
          name: "Gest. Administrativa",
          icon: "https://res.cloudinary.com/dgi90lgbq/image/upload/v1710511171/g7a2lstlqmpipd9zpmba.png",
          items: ["Clientes","Productos","Proveedores"],
        },{
          name: "Adm. Personas",
          icon: "https://res.cloudinary.com/dgi90lgbq/image/upload/v1710511326/rvlyhnoc7bydgmjo1ygw.png",
          items: ["Usuarios", "Permisos y Cargos"],
        },{
          name: "Control De Stock",
          icon: "https://res.cloudinary.com/dgi90lgbq/image/upload/v1705253503/lpdkapxxg6jbfltbsewg.png",
          items: ["Lista Productos", "Manejo de Stock","Agregar/Retirar Productos"],
        }
      ];
    res.send(permisos).status(200);
  } catch (e) {
    
    res.send({
        succes: false,
        estado: "No se pudieror cargar los permisos",
      })
      .status(400);
  }
};

module.exports = {
    ObtenerPermisos,
};

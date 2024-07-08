const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearOrdenDeCompra = async (req, res = response) => {
  try {
    let ordendecompra = req.body;

    for (let i = 0; i < ordendecompra.Productos.length; i++) {
      const producto = ordendecompra.Productos[i];
      try {
        // Llama a la función ObtenerItem para cada producto

        const nuevaInformacion = await ObtenerItem(
          { estado: "Visible", nombre: producto.nombre },
          "Productos"
        );

        // Actualiza el producto en el arreglo con la nueva información
        ordendecompra.Productos[i] = { ...producto, nombre: nuevaInformacion };
      } catch (error) {
        console.error(
          `Error al obtener o actualizar información para el producto ${producto.nombre}: ${error}`
        );
      }
    }

    try {
      const cliente = await ObtenerItem(
        { hidden: false, nombre: ordendecompra.cliente },
        "Clientes"
      );

      ordendecompra.cliente = cliente[0];
    } catch (error) {
      console.error(
        `Error al obtener o actualizar información para el producto ${producto.cliente}: ${error}`
      );
    }

    console.log(ordendecompra);
    ordendecompra.createdAt=Now()
    await InsertarItem(ordendecompra, "OrdenesDeCompra");
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
  CrearOrdenDeCompra,
};

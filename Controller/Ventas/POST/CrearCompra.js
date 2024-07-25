const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");
const { Now } = require("../../../Utility/LocalTime");

const CrearOrdenDeCompra = async (req, res = response) => {
  try {
    let ordendecompra = req.body;
    console.log("a");
    const venta = await ObtenerItem(
      { hidden: false, ordencompra: ordendecompra.ordencompra },
      "OrdenesDeCompra"
    );
    console.log(venta);
    if (venta.length > 0) {
      return res.send({ succes: false, estado: "Oden ya creada" }).status(401);
    }
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

    ordendecompra.createdAt = Now();
    ordendecompra.estado = "Pendiente";
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

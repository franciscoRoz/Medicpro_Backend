const { response } = require("express");
const { InsertarItem } = require("../../../Component/MongoDB/InsertarItem");
const { Now } = require("../../../Utility/LocalTime");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const CrearUsuario = async (req, res = response) => {
  try {
    let user = req.body;
    
    let numeroSinFormato = user.rut.replace(/[\.-]/g, '');

    // Obtener la parte principal del número y el último dígito
    let partePrincipal = numeroSinFormato.slice(0, -1);
    let ultimoDigito = numeroSinFormato.slice(-1);

    // Concatenar la parte principal con el guion y el último dígito
    let numeroFormateado = `${partePrincipal}-${ultimoDigito}`;
  
    user.rut = numeroFormateado;
    user.createdAt = Now();
    
    // Validar existencia de item
   let unicidad=await ObtenerItem({ rut: user.rut }, "Usuarios")
    console.log(unicidad);
    if (unicidad.length > 0) {
      console.log("Usuario ya creado");
      return res.send({ succes: false, estado: "Usuario ya creada" }).status(404);
    }

   

    InsertarItem(user, "Usuarios");
    res.send({ succes: true, ok: "OK" }).status(200);
  } catch (e) {
    res
      .send({
        succes: false,
        estado: "No se pudo registrar el usuario",
      })
      .status(400);
  }
};

module.exports = {
  CrearUsuario,
};

const { response } = require("express");
const { ObtenerItem } = require("../../../Component/MongoDB/ObtenerItem");

const Loginusuario = async (req, res = response) => {
  try {
    let { user, password } = req.body;
    let result = await ObtenerItem(
      { loginName: user, password, hidden: false, estado: "Habilitado" },
      "Usuarios"
    );
   
    if (result.length == 1) {
    
      let Cargo = await ObtenerItem(
        { nombrecargo: result[0].cargo, hidden: false },
        "Cargos"
      );
      console.log(result);
      
      if (Cargo.length == 1) {
        console.log(Cargo);
        return res.send(
          {cargo:Cargo[0],user:result[0].nombres,rut:result[0].rut}
        ).status(200);
      }
      return res
        .send({
          succes: false,
          estado: "Tus permisos no son validos , contacta al administrador ",
        })
        .status(400);
    }

    res
      .send({
        succes: false,
        estado: "Contraseña incorrecta o el usuario esta deshabilitado",
      })
      .status(400);
  } catch (e) {
    res
      .send({
        succes: false,
        estado: "No se encontraron usuarios",
      })
      .status(400);
  }
};

module.exports = {
  Loginusuario,
};

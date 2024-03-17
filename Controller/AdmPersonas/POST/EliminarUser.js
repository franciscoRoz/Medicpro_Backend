const { response } = require("express");
const { ActualizarItem } = require("../../../Component/MongoDB/ActualizarItem");


const EliminarUsuario = async (req, res = response) => {
  try {
    let User = req.body;
    User.hidden=true
    ActualizarItem(User,"Usuarios",User._id)
    res.send({ succes: true, ok:"OK" }).status(200);
  } catch (e) {
    console.log(e);
    res.send({
        succes: false,
        estado: "No se pudo eliminar el Cliente",
      })
      .status(400);
  }
};

module.exports = {
    EliminarUsuario,
};

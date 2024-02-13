const { response } = require("express");

const fs = require('fs');
const fileUpload = require("express-fileupload");
const path = require('path');

const UploadFile = async (req, res = response) => {
  try {
    
    const archivo = req.files[0];
    console.log(archivo);
    const rutaArchivo = path.join(__dirname, 'files', archivo.name);

    // Guarda el archivo en la carpeta 'files'
    archivo.mv(rutaArchivo, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    })
   
    res.send({ succes: true, ok:"OK" }).status(200);
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
    UploadFile,
};

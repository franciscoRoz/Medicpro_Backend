const { response } = require("express");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const path = require('path');



const DownloadFile = async (req, res = response) => {
  try {
    const filename = req.params.filename;
  const filePath = path.join(__dirname, 'files', filename);

  // Verifica si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('El archivo no existe.');
    }

    // Envía el archivo al cliente para su descarga
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error al descargar el archivo:', err);
        return res.status(500).send('Error al descargar el archivo.');
      }
    });
  });
 
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
  DownloadFile,
};

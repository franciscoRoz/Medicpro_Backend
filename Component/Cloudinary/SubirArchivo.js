const config_cloudinary = require("../../Config/ConfigCloudinary");

const cloudinary = require("cloudinary").v2;

cloudinary.config(config_cloudinary);

const SubirImagen = async (Archivo) => {
  try {
  
    let uploadPath = __dirname + "\\uploads\\" + Archivo.name;

    let move = Archivo.mv(uploadPath);
    move.catch((err) => {
      console.log(err);
      return {success:"false",
        msg: "Ha ocurrido un error al momento de almacenar la imagen",
      };
    });

    const responsecloudinary = cloudinary.uploader.upload(uploadPath, {public_id: Archivo.name});
    let response= await responsecloudinary
    return response.url
  } catch (err) {
    console.log(err);
    throw {success:"false",
      msg: "No es posible subir imagenes por ahora, intentalo más tarde",
    };
  }
};

module.exports = {
    SubirImagen,
};

const { SubirImagen } = require("../../Component/Cloudinary/SubirArchivo");


const SubirImagencloudinary = async (req, res = response) => {
  try {
      let { Imagen } = req.files;
      
      
      let urlImagen= await SubirImagen(Imagen)
      res.send({succes:true,url:urlImagen}).status(200)

   
    
  } catch (e) { 
    console.log(e);
    res.send({ succes: false, estado: "No se pudo guardarImagen"}).status(400);
  }
};

module.exports = {
    SubirImagencloudinary
};

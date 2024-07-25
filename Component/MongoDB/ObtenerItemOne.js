const { MongoClient ,ObjectId} = require("mongodb");
require("dotenv").config();

let ObtenerItemOne = async (id, nombrecollection) => {
    const client = new MongoClient(process.env.URL_MONGO);

    try {
      await client.connect();
      console.log("Conexión exitosa a MongoDB");
  
      const db = client.db();
      const coleccion = db.collection(nombrecollection);
      const filtro = { _id: new ObjectId(id) };
      // Utiliza el método find para buscar datos
      const resultados = await coleccion.findOne(filtro);

      return resultados;
    } catch (err) {
      console.error("Error al conectar a MongoDB:", err);
      throw err;
    } finally {
      await client.close();
      console.log("Conexión cerrada exitosamente");
    }
};

module.exports = {
  ObtenerItemOne,
};

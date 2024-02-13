const { MongoClient } = require("mongodb");
require("dotenv").config();

let ObtenerItemordenados = async (filtro=[], nombrecollection) => {
    const client = new MongoClient(process.env.URL_MONGO);

    try {
      await client.connect();
      console.log("Conexión exitosa a MongoDB");
  
      const db = client.db();
      const coleccion = db.collection(nombrecollection);
      const resultado = await coleccion.aggregate(filtro).toArray();
  
      console.log("Resultados de la búsqueda:");
      console.log(resultado);
  
      return resultado;
    } catch (err) {
      console.error("Error al conectar a MongoDB:", err);
      throw err;
    } finally {
      await client.close();
      console.log("Conexión cerrada exitosamente");
    }
};

module.exports = {
    ObtenerItemordenados,
};

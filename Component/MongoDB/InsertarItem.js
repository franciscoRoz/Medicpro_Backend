const { MongoClient } = require("mongodb");
require("dotenv").config();

let InsertarItem = async (objeto, nombrecollection) => {
  const client = new MongoClient(process.env.URL_MONGO);

  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
    const db = client.db(); 
    console.log(nombrecollection);
    console.log(objeto);
    const resultado = await db.collection(nombrecollection).insertOne(objeto);
    console.log(resultado);
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  } finally {
    await client.close();
  }
};

module.exports = {
  InsertarItem,
};

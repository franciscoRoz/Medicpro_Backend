const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb"); 

require("dotenv").config();

let ActualizarItem = async (objeto, nombrecollection,id) => {
  const client = new MongoClient(process.env.URL_MONGO);

  try {
    await client.connect();
    const db = client.db(); 
    const filtro = { _id: new ObjectId(id) };
    const nuevoValor = { $set: objeto };

    // Eliminar el campo _id del objeto si existe
    delete nuevoValor.$set._id;

    const resultado = await db.collection(nombrecollection).updateOne(filtro, nuevoValor);
    
    console.log(resultado);
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  } finally {
    await client.close();
  }
};

module.exports = {
    ActualizarItem,
};

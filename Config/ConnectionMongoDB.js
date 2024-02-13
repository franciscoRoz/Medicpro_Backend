const { MongoClient } = require('mongodb');
require("dotenv").config();


const client = new MongoClient(process.env.URL_MONGO);

let SetConnectionMongoDB = async ()=> {
 
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
    return client;
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    throw("No se pudo establecer conexion con la base de datos")
  }
}
let CloseConnection=async ()=>{
  await client.close();
}

module.exports = {
    SetConnectionMongoDB,CloseConnection
};


const express = require("express");
const cors = require("cors");
const http = require("http");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const path = require('path');
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.ip = process.env.IP;

    //paths
    this.paths = {
      USR: "/usuarios",
      COL: "/colaborador",
      SYSTEM: "/SYSTEM",
      GADM:"/GADM",
      CLNT:"/cliente",
      VNTAS:'/Ventas',
      DYF:'/despachosyfacturas'
    };

    //middlewares
    this.middlewares();

    //rutas de app
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    
    this.app.use(this.paths.SYSTEM, require("../Routes/System"));
    this.app.use(this.paths.USR, require("../Routes/User"));
    this.app.use(this.paths.GADM, require("../Routes/GADM"));
    this.app.use(this.paths.CLNT, require("../Routes/Cliente"));
    this.app.use(this.paths.VNTAS, require("../Routes/Ventas"));
    this.app.use(this.paths.DYF, require("../Routes/DespachosyFacturas"));
    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor conectado en el puerto, ${this.port}`);
    });
    /*
const serverHttp = http.createServer(this.app);
serverHttp.listen(this.port, this.ip);
serverHttp.on('listening', () => console.info(`Notes App running at http://${this.ip}:${this.port}`));

 this.app.listen(this.port, () => {
      console.log(`servidor conectado en el puerto, ${this.port}`);
    });
*/
  }
}
module.exports = Server;

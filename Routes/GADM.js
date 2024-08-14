const { Router } = require("express");

//Productos
const { CrearProducto } = require("../Controller/GestAdm-Stock/POST/Crear_producto");
const { Get_productos } = require("../Controller/GestAdm-Stock/GET/Get_Productos");
const { ActualizarProducto } = require("../Controller/GestAdm-Stock/POST/ActualizarStock");
const { EliminarProducto } = require("../Controller/GestAdm-Stock/POST/Eliminar_Producto");
const { Get_Stock } = require("../Controller/GestAdm-Stock/GET/Get_Stock");

//proveedores
const { CrearProveedor } = require("../Controller/GestAdm-Stock/POST/Proveedor/CrearProveedor");
const { Getproveedores } = require("../Controller/GestAdm-Stock/GET/Proveedor/GetProveedores");
const { EliminarProveedor } = require("../Controller/GestAdm-Stock/POST/Proveedor/EliminarProveedor");
const { ActualizarProveedor } = require("../Controller/GestAdm-Stock/POST/Proveedor/ActualizarProveedor");
const { Getproductosordenado } = require("../Controller/GestAdm-Stock/GET/Proveedor/GetProductoProveerdor");

//Cargos
const { CrearCargo } = require("../Controller/AdmPersonas/POST/CreateCargo");
const { ObtenerCargos } = require("../Controller/AdmPersonas/GET/ObtenerCargos");
const { EliminarCargo } = require("../Controller/AdmPersonas/POST/EliminarCargo");
const { Loginusuario } = require("../Controller/AdmPersonas/POST/Loginusuario");
const { GetproductosCompletoProveedor } = require("../Controller/GestAdm-Stock/GET/Proveedor/GetProuctoCompletoProveedor");
const { insertarStock } = require("../Controller/GestAdm-Stock/POST/InsertarStock");
const { CrearProductomasivo } = require("../Controller/GestAdm-Stock/POST/CrearProductoMasivo");
const { ActualizarProducto_Item } = require("../Controller/GestAdm-Stock/POST/ActualizarStockProducto");
//const { Get_Product } = require("../Controller/GestAdm-Stock/GET/Get_product");





const router = Router();
//Stock
router.post("/crearproducto", CrearProducto);
router.get("/producto", Get_productos);
router.post("/actualizarproducto",ActualizarProducto)
router.post("/eliminarproducto",EliminarProducto)
router.get("/obtenerstock/:id",Get_Stock)
//router.get("/obtenerproducto/:id",Get_Product)
router.post("/insertarStock",insertarStock)
router.post("/crearproductomasivo", CrearProductomasivo);
router.post("/actualizaritem",ActualizarProducto_Item)


//Proveedores

router.post('/crearproveedor',CrearProveedor)
router.get('/obtenerproveedores',Getproveedores)
router.post('/eliminarproveedor',EliminarProveedor)
router.post('/actualizarproveedor',ActualizarProveedor)
router.get('/getproductos',Getproductosordenado)
router.get('/obtenerproductosproveedor',GetproductosCompletoProveedor)

//Cargos

router.post('/crearcargo',CrearCargo)
router.get('/obtenercargos',ObtenerCargos)
router.post('/eliminarcargo',EliminarCargo)

//Login
router.post('/Login',Loginusuario)
module.exports = router;

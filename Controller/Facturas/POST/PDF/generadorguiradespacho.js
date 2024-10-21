const path = require("path");
const pdf = require('html-pdf');
const fs = require("fs");

const generatePDF = (data) => {
  console.log(data);
  
  const { createdAt, factura, productosenviados, observacion } = data;

  // Leer el archivo HTML
  const htmlFilePath = path.join(__dirname, "HTML", "GuiaDespacho.html");
  let content = fs.readFileSync(htmlFilePath, "utf8");

  // Reemplazar los marcadores en el HTML
  content = content
    .replace("{{norden}}", factura.ordendecompra)
    .replaceAll("{{fecha}}", createdAt)
    .replace("{{RUT}}", factura.cliente.rut)
    .replace("{{telefono}}", factura.cliente.telefono)
    .replace("{{Observaciones}}", observacion)
    .replaceAll("{{empresa}}", factura.cliente.nombre)
    .replace("{{Direccion}}", factura.cliente.direccion);

  // Generar las filas de los productos
  const itemsHtml = productosenviados.map(
    (item) => `<tr>
        <td>${item.codigo}</td>
        <td>${item.cantidad}</td>
        <td>${item.nombre[0].descripcion}</td>
        <td>Caja</td>
        <td>${item.cajas}</td>
        <td>${item.valorventa}</td>
        <td>${item.valorventa * item.cantidad}</td>
    </tr>`
  ).join("");

  const sumaTotal = productosenviados.reduce(
    (acc, obj) => acc + parseInt(obj.valorventa) * parseInt(obj.cantidad), 0
  );

  const iva = parseFloat(sumaTotal) * 0.19;

  // Reemplazar los totales en el HTML
  content = content
    .replace("{{items}}", itemsHtml)
    .replace("{{total}}", sumaTotal.toLocaleString('es-CL'))
    .replace("{{iva}}", iva.toLocaleString('es-CL'))
    .replace("{{totalpagar}}", (parseFloat(sumaTotal) + parseFloat(iva)).toLocaleString('es-CL'));

  // Usar una URL para el logo
  const logoUrl = "https://res.cloudinary.com/dgi90lgbq/image/upload/v1710632286/khrprawa0rzpjstxjiwu.jpg";
  content = content.replace("{{logoPath}}", logoUrl);

  // Leer el archivo CSS
  const cssFilePath = path.join(__dirname, "CSS", "guiadespacho.css");
  const css = fs.readFileSync(cssFilePath, "utf8");

  // Agregar el CSS al contenido HTML
  const options = {
    format: 'A4',
    header: {
      height: "10mm"
    },
    footer: {
      height: "10mm"
    },
    "base": "file://"+__dirname + "/HTML/"
  };

  

  const now = Math.floor(Date.now() / 1000);
  const filePath = path.join(__dirname, '..','..','..', 'Adquisiciones','POST','files', `GuiaDespacho_${now}.pdf`);

  // Generar el PDF
  pdf.create(content, options).toFile(filePath, (err, res) => {
    if (err) return console.log(err);
    console.log(`PDF generado: ${res.filename}`);
  });
  return `GuiaDespacho_${now}.pdf`
};



module.exports = {
  generatePDF,
};

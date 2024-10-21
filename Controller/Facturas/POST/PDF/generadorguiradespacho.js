const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");

const generatePDF = async (data) => {
  const { createdAt, factura, productosenviados,observacion } = data;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlFilePath = path.join(__dirname, "HTML", "GuiaDespacho.html");
  let content = fs.readFileSync(htmlFilePath, "utf8");

  content = content
    .replace("{{norden}}", factura.ordendecompra)

    .replaceAll("{{fecha}}", createdAt)
    .replace("{{RUT}}", factura.metadataordencompra[0].cliente.rut)
    .replace("{{telefono}}",  factura.metadataordencompra[0].cliente.telefono)
    .replace("{{Observaciones}}", observacion)
    .replaceAll("{{empresa}}",  factura.metadataordencompra[0].cliente.nombre)
    .replace("{{Direccion}}",  factura.metadataordencompra[0].cliente.direccion);

  const itemsHtml = productosenviados.map(
      (item) => `<tr>
          <td>${item.codigo}</td>
          <td>${item.cantidad}</td>
          <td>${item.nombre[0].descripcion}</td>
          <td>Caja</td>
          <td>${item.cajas}</td>
          <td>${item.valorventa}</td>
          <td>${item.valorventa*item.cantidad}</td>
      </tr>
  `)
    .join("");

    const sumaTotal = productosenviados.reduce((acc, obj) => acc + parseInt(obj.valorventa)*parseInt(obj.cantidad), 0);
const iva=parseFloat(sumaTotal)*0.19
  content = content
    .replace("{{items}}", itemsHtml)
    .replace("{{total}}", sumaTotal.toLocaleString('es-CL'))
    .replace("{{iva}}", iva.toLocaleString('es-CL'))
    .replace("{{totalpagar}}",(parseFloat(sumaTotal)+parseFloat(iva)).toLocaleString('es-CL'));

  // Usa una URL directa al logo
  const logoUrl =
    "https://res.cloudinary.com/dgi90lgbq/image/upload/v1710632286/khrprawa0rzpjstxjiwu.jpg"; // Cambia esto a tu URL real
  content = content.replace("{{logoPath}}", logoUrl);

  await page.setContent(content, { waitUntil: "domcontentloaded" });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const cssFilePath = path.join(__dirname, "CSS", "guiadespacho.css");
  await page.addStyleTag({ path: cssFilePath });

  let now = new Date();
  now = Math.floor(now.getTime() / 1000);
  const filePath = path.join(__dirname, '..','..','..', 'adquisiciones','POST','files', `GuiaDespacho_${now}.pdf`);

console.log(filePath);


  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
    });
    return `GuiaDespacho_${now}.pdf`
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }

  await browser.close();
};

module.exports = {
  generatePDF,
};

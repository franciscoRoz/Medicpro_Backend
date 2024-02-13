const { transporter } = require("../../Component/Nodemailer/CrearTransportador");


const EnvioConfirmacionCuentaUsuario = async (Nombre,correo) => {
  try {
    let Email = await transporter.sendMail({
      from: "YoPuedoPorTi <Yopuedoporti0@gmail.com>",
      to: correo,
      subject: "Registro de Usuario",
      text: "Registro de Usuario",
      html: `
      
<head>
<style>
    body{
       display: flex;
            align-items: center;
            justify-content: center;
      flex-direction:column;
      background-color: #f0f0f0;
    }
  		h1{
    	color:#333;
    	text-align:center;
    }
    h3{color:#333;
    	text-align:center;
    }
    section{
      align-item:center;
      width:90%;
      
      color:#333;
    }
    p{text-align:center;
    padding:15px;
    
  
  </style>
</head>

<body>
<h1>
¡Hola ${Nombre}!

</h1>
<h3>
Nos alegra que quieras ser parte de Yo puedo por ti
</h3>


<section >
  <p>Te informamos
que tus datos están siendo verificados por nuestro equipo y recibirás un correo cuando tu
cuenta haya sido habilitada.
</p>
 <p>Para estar al tanto de nuestras actualizaciones puedes seguirnos en nuestras redes
sociales:
</p>
  <p>Instagram
@yopuedoporti</p>
</section>
<footer>
  <p> © yopuedoporti 2023 </p>
</footer>
</body>
`,
    });

    return Email.messageId;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  EnvioConfirmacionCuentaUsuario,
};

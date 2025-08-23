var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var emailConfig = require("../config/email");

/* GET home page. */
router.get(["/", "/farmacovigilancia"], function (req, res, next) {
  res.render("farmacovigilancia", {
    title: "Farmacovigilancia - Corporación FS",
    alert: { show: false },
  });
});

/* POST send email. */
router.post("/send-email", function (req, res, next) {
  const { name, email, subject, phone, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(emailConfig.email);

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Farmasalud - Farmacovigilancia" <sistemasfarma@farmasalud.com.pe>',
    to: "sistemasfarma@farmasalud.com.pe", // list of receivers
    replyTo: email,
    subject: `Correo desde la web de Farmasalud - Farmacovigilancia: ${subject}`,
    html: `
      <html>
      <head>
         <title>Web de Farmasalud - Farmacovigilancia </title>
      </head>
      <body>
      <h1>Este es un mensaje enviado desde la web de farmasalud - Farmacovigilancia</h1>
      <p>
      <b>Informacion enviado desde nuestra plataforma web Farmasalud</b>. <br><br>
      Farmacovigilancia. <br>
      <b>Datos Recogidos</b><br>
      <b>Nombres:</b> ${name} <br>
      <b>Correo:</b> ${email} <br>
      <b>Asunto:</b> ${subject} <br>
      <b>Celular:</b> ${phone} <br>
      <b>Mensaje:</b> ${message} <br>
      </p>
      </body>
      </html>
    `,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    const alert = { show: true };
    const data = {
      title: "Farmacovigilancia - Corporación FS",
      alert
    };
    if (error) {
      data.alert.success = false;
      data.alert.errorMessage = `No se pudo enviar el mensaje: ${error.message}`;
      console.log(error);
      // return res.status(500).send('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Alerta</strong> No se envio el mensaje, verifique e intente nuevamente.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    } else {
      console.log("Message sent: %s", info.messageId);
      data.sucess = true;
      data.alert.success = true;
    }
    res.render("farmacovigilancia", data);
  });
});

module.exports = router;

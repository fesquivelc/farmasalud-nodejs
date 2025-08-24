import { Router } from 'express';
// import { createTransport } from 'nodemailer';
// import { email as _email } from '../config/email.js';
import { drugWatchUI, drugWatchProcess } from '../handlers/drug-watch.handler.js';
import { contactUsUI } from '../handlers/contact-us.handler.js';

const router = Router();

/* UI routes */
router.get(['/', '/farmacovigilancia'], drugWatchUI);

router.get('/contacto', contactUsUI);

/* API routes */
router.post('/api/v1/drug-watch', drugWatchProcess);

/* POST send email. */
// router.post('/api/send-email', function (req, res, _next) {
//   const { name, email, subject, phone, message } = req.body;

//   // Create a transporter object using the default SMTP transport
//   const transporter = createTransport(_email);

//   // setup email data with unicode symbols
//   const mailOptions = {
//     from: '"Farmasalud - Farmacovigilancia" <sistemasfarma@farmasalud.com.pe>',
//     to: 'sistemasfarma@farmasalud.com.pe', // list of receivers
//     replyTo: email,
//     subject: `Correo desde la web de Farmasalud - Farmacovigilancia: ${subject}`,
//     html: `
//       <html>
//       <head>
//          <title>Web de Farmasalud - Farmacovigilancia </title>
//       </head>
//       <body>
//       <h1>Este es un mensaje enviado desde la web de farmasalud - Farmacovigilancia</h1>
//       <p>
//       <b>Informacion enviado desde nuestra plataforma web Farmasalud</b>. <br><br>
//       Farmacovigilancia. <br>
//       <b>Datos Recogidos</b><br>
//       <b>Nombres:</b> ${name} <br>
//       <b>Correo:</b> ${email} <br>
//       <b>Asunto:</b> ${subject} <br>
//       <b>Celular:</b> ${phone} <br>
//       <b>Mensaje:</b> ${message} <br>
//       </p>
//       </body>
//       </html>
//     `
//   };

//   res.json({

//   })

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, _info) => {
//     const alert = { show: true };
//     const data = {
//       title: 'Farmacovigilancia - Corporación FS',
//       alert
//     };
//     if (error) {
//       data.alert.success = false;
//       data.alert.errorMessage = `No se pudo enviar el mensaje: ${error.message}`;
//       // console.log(error);
//       // return res.status(500).send('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Alerta</strong> No se envio el mensaje, verifique e intente nuevamente.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
//     } else {
//       // console.log("Message sent: %s", info.messageId);
//       data.sucess = true;
//       data.alert.success = true;
//     }
//     res.render('farmacovigilancia', data);
//   });
// });

export default router;

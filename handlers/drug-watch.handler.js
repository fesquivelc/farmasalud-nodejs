import { createTransport } from 'nodemailer';
import { email as _email } from '../config/email.js';
import logger from '../config/logger.js';

export const drugWatchUI = (_req, res, _next) => {
  res.render('drug-watch', {
    title: 'Farmacovigilancia - Corporación FS'
  });
};

export const drugWatchProcess = (req, res, _next) => {
  logger.info('Procesando formulario de farmacovigilancia');
  const { name, email, subject, phone, message } = req.body;
  logger.info('Datos de farmacovigilancia recibidos:', { name, email, subject, phone });

  // Create a transporter object using the default SMTP transport
  const transporter = createTransport(_email);

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Farmasalud - Farmacovigilancia" <sistemasfarma@farmasalud.com.pe>',
    to: 'sistemasfarma@farmasalud.com.pe', // list of receivers
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
      `
  };

  transporter.sendMail(mailOptions, (error, _info) => {
    const response = {};
    if (error) {
      logger.error('Error al enviar correo de farmacovigilancia:', error);
      response.ok = false;
      response.message = `No se pudo enviar el mensaje: ${error.message}`;
      res.status(500).json(response);
    } else {
      logger.info('Correo de farmacovigilancia enviado correctamente');
      response.ok = true;
      response.message = `Mensaje enviado correctamente`;
      res.json(response);
    }
  });
};

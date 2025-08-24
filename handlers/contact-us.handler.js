import { createTransport } from 'nodemailer';
import { emailConfig } from '../config/email.js';
import pug from 'pug';
import logger from '../config/logger.js';

export const contactUsUI = (_req, res, _next) => {
  res.render('contact-us', {
    title: 'Contáctanos - Corporación FS'
  });
};

export const contactUsProcess = (req, res, _next) => {
  logger.info('Procesando formulario de contacto');
  const { name, email, subject, phone, message } = req.body;
  logger.info('Formulario de contacto recibido:', { name, email, subject, phone });

  // Create a transporter object using the default SMTP transport
  const transporter = createTransport(emailConfig.smtp);

  const html = pug.renderFile('views/email/email.pug', {
    origin: 'Contáctanos',
    name,
    email,
    subject,
    message,
    phone
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Farmasalud - Farmacovigilancia" <' + emailConfig.contactUs.from + '>',
    to: emailConfig.contactUs.to, // list of receivers
    replyTo: email,
    subject: `Correo desde la web de Farmasalud - Farmacovigilancia: ${subject}`,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    const response = {};
    if (error) {
      logger.error('Error al enviar correo de contacto:', error);
      response.ok = false;
      response.message = `No se pudo enviar el mensaje: ${error.message}`;
      res.status(500).json(response);
    } else {
      logger.info(`Correo de contacto enviado correctamente, ${info.messageId}`);
      response.ok = true;
      response.message = `Mensaje enviado correctamente`;
      res.json(response);
    }
  });
};

import { createTransport } from 'nodemailer';
import { emailConfig } from '../config/email.js';
import pug from 'pug';
import logger from '../config/logger.js';

export const drugWatchUI = (_req, res, _next) => {
  res.render('drug-watch', {
    title: 'Farmacovigilancia - Corporación FS'
  });
};

export const drugWatchProcess = (req, res, _next) => {
  logger.info('Procesando formulario de farmacovigilancia');
  const { name, email, subject, phone, message } = req.body;
  logger.info(`Datos de farmacovigilancia recibidos: (${name}, ${email}, ${subject}, ${phone})`);

  // Create a transporter object using the default SMTP transport
  const transporter = createTransport(emailConfig.smtp);

  const html = pug.renderFile('views/email/email.pug', {
    origin: 'Farmacovigilancia',
    name,
    email,
    subject,
    message,
    phone
  });

  const mailOptions = {
    from: '"Farmasalud - Farmacovigilancia" <' + emailConfig.drugWatch.from + '>',
    to: emailConfig.drugWatch.to,
    replyTo: email,
    subject: `Correo desde la web de Farmasalud - Farmacovigilancia: ${subject}`,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    const response = {};
    if (error) {
      logger.error('Error al enviar correo de farmacovigilancia:', error);
      response.ok = false;
      response.message = `No se pudo enviar el mensaje: ${error.message}`;
      res.status(500).json(response);
    } else {
      logger.info(
        `Correo de farmacovigilancia enviado correctamente: messageId=(${info.messageId})`
      );
      response.ok = true;
      response.message = `Mensaje enviado correctamente`;
      res.json(response);
    }
  });
};

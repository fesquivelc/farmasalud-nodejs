import 'dotenv/config';

export const emailConfig = {
  smtp: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_TLS_REJECTUNAUTHORIZED === 'true'
    }
  },
  contactUs: {
    from: process.env.EMAIL_CONTACT_US_FROM,
    to: process.env.EMAIL_CONTACT_US_TO
  },
  drugWatch: {
    from: process.env.EMAIL_DRUG_WATCH_FROM,
    to: process.env.EMAIL_DRUG_WATCH_TO
  }
};

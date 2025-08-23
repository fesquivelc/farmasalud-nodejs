module.exports = {
  email: {
    host: 'mail.farmasalud.com.pe', // e.g., smtp.gmail.com
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sistemasfarma@farmasalud.com.pe', // your email address
      pass: 'Elprioasg0+' // your email password or app-specific password
    },
    tls: {
        rejectUnauthorized: false
    }
  }
};

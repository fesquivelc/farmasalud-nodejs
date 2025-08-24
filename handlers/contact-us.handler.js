export const contactUsUI = (_req, res, _next) => {
  res.render('contact-us', {
    title: 'Contáctanos - Corporación FS'
  });
};

export const contactUsProcess = (_req, res, _next) => {
  res.render('farmacovigilancia', {
    title: 'Farmacovigilancia - Corporación FS'
  });
};

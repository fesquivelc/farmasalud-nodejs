import winston from 'winston';

const { combine, timestamp, json, colorize, align, printf } = winston.format;

const errorFilter = winston.format(info => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format(info => {
  return info.level === 'info' ? info : false;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: 'logs/app-error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), json()),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: 'logs/app-info.log',
      level: 'info',
      format: combine(infoFilter(), timestamp(), json()),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'logs/exceptions.log'
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: 'logs/rejections.log'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        align(),
        printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
      )
    })
  );
}

export default logger;

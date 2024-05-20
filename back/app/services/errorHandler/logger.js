import { format as _format, transports as _transports, createLogger } from 'winston';
// Pour aider à la conception de ce fichier : https://github.com/winstonjs/winston

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'http';
};

const format = _format.combine(
  _format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new _transports.File({
    filename: 'logs/all.log',
  }),
  new _transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),

];

const logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
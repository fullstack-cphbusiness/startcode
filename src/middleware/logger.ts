import winston from 'winston';
import path from "path"

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json()
});

const format = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} : '${info.level}' ${info.message}`,
  ),
)

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    handleExceptions: true,
    format
  }));
} else {
  logger.add(new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error', handleExceptions: true }))
  logger.add(new winston.transports.File({ filename: path.join('logs', 'combined.log') }))
}

export const stream = {
  write: (message: string) => {
    logger.info(message)
  },
};

export default logger;
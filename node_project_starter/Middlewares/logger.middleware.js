import { createLogger } from '../utiles/logger.js';

const logger = createLogger('LoggerMiddleware');

const loggerMiddleware = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  const logMessage = `[LoggerMiddleware] - ${timestamp} - ${method} ${url}`;

  try {
    logger.http(logMessage);
  } catch (error) {
    console.error('[LoggerMiddleware] Logging failed:', error);
  }

  next(); 
};

export default loggerMiddleware;

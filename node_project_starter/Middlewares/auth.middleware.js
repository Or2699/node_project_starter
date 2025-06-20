import { verifyToken } from '../utiles/token.js';
import { createLogger } from '../utiles/logger.js';

const logger = createLogger('AuthMiddleware');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      logger.warn('Missing Authorization header');
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1]; // לחלץ את הטוקן בלי Barrer

    if (!token) {
      logger.warn('Authorization header malformed');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const user = await verifyToken(token); //מאמת את הטוקן שנשלח מהמשתמש 
    req.user = user; 
    logger.info("Authenticated user token: "); //${token}
    next();

  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;

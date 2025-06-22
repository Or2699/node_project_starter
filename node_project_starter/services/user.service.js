import { createToken } from '../utiles/token.js';
import { hashPassword, verifyPassword } from '../utiles/hash.js'; 
import { createLogger } from '../utiles/logger.js'; 

const logger = createLogger('UserService'); 
const users = []; //מאגר ליוזרים 

// רישום משתמש חדש
export const registerUserService = async (username, password) => {
  const exists = users.find(user => user.username === username);
  if (exists) {
    logger.warn(`Registration failed - Username already exists: ${username}`);
    throw new Error('Username already exists');
  }

  const hashedPassword = await hashPassword(password); 
  const token = await createToken({ username });

  const newUser = { username, password: hashedPassword, token };
  users.push(newUser);

  logger.info(`User registered: ${username}`);
  return { username, token };
};

// התחברות לפי שם משתמש וסיסמה
export const loginUserService = async (username, password) => {
    const user = users.find(user => user.username === username); 
    if (!user) {
      logger.warn(`Login failed - Username not found: ${username}`);
      throw new Error('Invalid username');
    }
  
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed - Incorrect password for user: ${user.username}`);
      throw new Error('Incorrect password');
    }
  
    const token = await createToken({ username: user.username });
  
    logger.info(`User logged in: ${user.username}`);
    return { username: user.username, token }; 
  };
  

// מחיקת משתמש לפי יוזר
export const deleteUserByTokenService = (username) => {
    const index = users.findIndex(user => user.username === username); 
    if (index === -1) {
      logger.warn(`Delete failed - User not found for username: ${username}`);
      throw new Error('User not found');
    }
  
    const deletedUser = users[index].username;
    users.splice(index, 1); //פונקציה שמוחקת מתוך מערך לפי אינדקס פתיחה וכמה למחוק 
  
    logger.info(`User deleted: ${deletedUser}`);
    return { message: 'User deleted successfully' };
  };
  

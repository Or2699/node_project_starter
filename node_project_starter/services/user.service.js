import { createToken } from '../utiles/token.util.js';
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
  const token = createToken({ username });

  const newUser = { username, password: hashedPassword, token };
  users.push(newUser);

  logger.info(`User registered: ${username}`);
  return { username, token };
};

// התחברות לפי טוקן וסיסמה
export const loginUserService = async (token, password) => {
  const user = users.find(user => user.token === token);
  if (!user) {
    logger.warn(`Login failed - Invalid token: ${token}`);
    throw new Error('Invalid token');
  }

  const isMatch = await verifyPassword(password, user.password); 
  if (!isMatch) {
    logger.warn(`Login failed - Incorrect password for user: ${user.username}`);
    throw new Error('Incorrect password');
  }

  logger.info(`User logged in: ${user.username}`);
  return { username: user.username };
};

// מחיקת משתמש לפי טוקן
export const deleteUserService = (token) => {
  const index = users.findIndex(user => user.token === token);
  if (index === -1) {
    logger.warn(`Delete failed - User not found for token: ${token}`);
    throw new Error('User not found');
  }

  const deletedUser = users[index].username;
  users.splice(index, 1); //פונקציה שמוחקת מתוך מערך לפי אינדקס פתיחה וכמה למחוק 

  logger.info(`User deleted: ${deletedUser}`);
  return { message: 'User deleted successfully' };
};

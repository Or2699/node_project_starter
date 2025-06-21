import { register, deleteUserByToken } from '../services/user.service.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('UserController');

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('Missing username or password in registration');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await register(username, password);
    logger.info(`User registered: ${username}`);

    res.status(201).json({ message: 'User registered successfully', token: user.token });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const token = req.params.token;

    const deleted = await deleteUserByToken(token);
    if (!deleted) {
      logger.warn(`Delete failed: token not found (${token})`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User deleted with token: ${token}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Deletion failed: ${error.message}`);
    res.status(500).json({ message: 'User deletion failed', error: error.message });
  }
};

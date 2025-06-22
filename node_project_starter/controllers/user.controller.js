import { registerUserService, loginUserService, deleteUserByTokenService } from '../services/user.service.js';
import { createLogger } from '../utiles/logger.js';

const logger = createLogger('UserController');

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('Missing username or password in registration');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await registerUserService(username, password);
    logger.info(`User registered: ${username}`);

    res.status(201).json({ message: 'User registered successfully', token: user.token });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('Missing username or password in login');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await loginUserService(username, password);
    logger.info(`User logged in: ${username}`);

    res.json({ message: 'Login successful', token: user.token });
  } catch (error) {
    logger.warn(`Login failed for user: ${req.body.username}`);
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const uName = req.params.username;

    if (req.user.username !== uName) {
        logger.warn(`Unauthorized delete attempt by ${req.user.username} on ${uName}`);
        return res.status(403).json({ message: 'Forbidden: You can only delete your own account' });
    }

    const deleted = await deleteUserByTokenService(uName);
    if (!deleted) {
      logger.warn(`Delete failed: username not found (${uName})`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User deleted with userName: ${uName}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Deletion failed: ${error.message}`);
    res.status(500).json({ message: 'User deletion failed', error: error.message });
  }
};

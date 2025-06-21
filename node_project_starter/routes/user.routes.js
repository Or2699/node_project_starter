import express from 'express';
import authMiddleware from './Middlewares/auth.middleware.js';
import { registerUser,loginUser, deleteUser } from '../controllers/user.controller.js';


const router = express.Router();

// POST api/users/register
router.post('/register', registerUser); //עבור הרשמה לא צריך טוקן


router.use(authMiddleware);  //בדיקת טוקן  

// POST api/users/login
router.post('/login', loginUser);

// DELETE api/users/:token
router.delete('/:token', deleteUser);

export default router;

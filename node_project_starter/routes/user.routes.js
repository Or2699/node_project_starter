import express from 'express';
import authMiddleware from '../Middlewares/auth.middleware.js';
import { registerUser,loginUser, deleteUser } from '../controllers/user.controller.js';


const router = express.Router();

// POST api/users/register
router.post('/register', registerUser); //עבור הרשמה לא צריך טוקן

// POST api/users/login
router.post('/login', loginUser);

router.use(authMiddleware);  //בדיקת טוקן  

// DELETE api/users/:username
router.delete('/:username', deleteUser);

export default router;

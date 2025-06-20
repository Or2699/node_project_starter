import express from 'express';
import { registerUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// POST api/users/register
router.post('/register', registerUser);

// DELETE api/users/:token
router.delete('/:token', deleteUser);

export default router;

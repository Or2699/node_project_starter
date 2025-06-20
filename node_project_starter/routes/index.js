import express from 'express';
import userRoutes from './user.routes.js';
import mealRoutes from './meal.routes.js';

const router = express.Router();  // יצירת router -כתובת url שמתקשרת לשרת 

router.use('/users', userRoutes);
router.use('/meals', mealRoutes);

export default router;
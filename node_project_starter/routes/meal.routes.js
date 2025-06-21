import express from 'express';
import {
  getMealById,
  searchMealsByName,
  getMealsByCategory
} from '../controllers/meal.controller.js';

const router = express.Router();

// GET api/meals/search?s=Chicken
router.get('/search', searchMealsByName);

// GET api/meals/category/:category
router.get('/category/:category', getMealsByCategory);

// GET api/meals/:id
router.get('/:id', getMealById);

export default router;

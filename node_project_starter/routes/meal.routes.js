import express from 'express';
import {
  getMealById,
  searchMealsByName,
  getMealsByCategory
} from '../controllers/meal.controller.js';

const router = express.Router();

// GET api/meals/:id
router.get('/:id', getMealById);

// GET api/meals/search?s=Chicken
router.get('/search', searchMealsByName);

// GET api/meals/category/:category
router.get('/category/:category', getMealsByCategory);

export default router;

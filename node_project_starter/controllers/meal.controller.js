// import { 
//     searchMealsByName, 
//     getMealsByCategory, 
//     getMealById 
//   } from '../services/meal.service.js';

  import * as service from '../services/meal.service.js'; //מכיוון שיש לפונקציות את אותו השם אז נייבא את כל הקובץ בשם סרוויס וכך נוכל לקחת ממנו ולהבדיל 
  
  import { createLogger } from '../utiles/logger.js'; 
  
  const logger = createLogger('MealController');
  
  export const searchMealsByName = async (req, res) => {
    try {
      const searchTerm = req.query.str;
      if (!searchTerm) {
        logger.warn('Missing search term in query');
        return res.status(400).json({ message: 'Missing search term' });
      }
  
      const meals = await service.searchMealsByName(searchTerm);
      logger.info(`Found ${meals.length} meals for search: ${searchTerm}`);
      res.json(meals);
    } catch (error) {
      logger.error(`Error searching meals: ${error.message}`);
      res.status(500).json({ message: 'Error searching meals', error: error.message });
    }
  };
  
  export const getMealsByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const meals = await service.getMealsByCategory(category);
      logger.info(`Fetched ${meals.length} meals in category: ${category}`);
      res.json(meals);
    } catch (error) {
      logger.error(`Error getting meals by category: ${error.message}`);
      res.status(500).json({ message: 'Error getting meals by category', error: error.message });
    }
  };

  
  export const getMealById = async (req, res) => {
    try {
      const id = req.params.id;
      const meal = await service.getMealById(id);
  
      if (!meal) {
        logger.warn(`Meal not found with ID: ${id}`);
        return res.status(404).json({ message: 'Meal not found' });
      }
  
      logger.info(`Fetched meal with ID: ${id}`);
      res.json(meal);
    } catch (error) {
      logger.error(`Error fetching meal by ID: ${error.message}`);
      res.status(500).json({ message: 'Error fetching meal by ID', error: error.message });
    }
  };
  
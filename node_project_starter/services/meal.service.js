// TheMealDB API: https://www.themealdb.com/api.php
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// חיפוש מנות לפי שם (search.php?s=)
export const searchMealsByName = async (searchTerm) => {
  const res = await fetch(`${BASE_URL}/search.php?s=${searchTerm}`);
  const data = await res.json();
  return data.meals || [];
};

// חיפוש לפי קטגוריה (filter.php?c=)
export const getMealsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
};

// קבלת פרטי מנה לפי מזהה (lookup.php?i=)
export const getMealById = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

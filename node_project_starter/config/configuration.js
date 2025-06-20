import dotenv from 'dotenv';  // מאפשר שימוש בקובץ .env 

dotenv.config();

export const port = process.env.PORT || 5003;  // טוען את המשתנים מקובץ- port
export const jwtKey = process.env.TOKEN || 'default_jwt_secret';

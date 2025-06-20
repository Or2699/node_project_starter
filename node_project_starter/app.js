import express from 'express'; //ספריית צד-שרת המאפשרת ליצור אפליקציות
import cors from 'cors'; //מנגנון המאפשר לשרת לאפשר או לחסום בקשות בין דומיינים שונים
import routes from './routes/index.js'; 
import authMiddleware from './Middlewares/auth.middleware.js';
import loggerMiddleware from './Middlewares/logger.middleware.js'

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use(loggerMiddleware);  //לוגים
app.use(authMiddleware);  //בדיקת טוקן לפני הכניסה לשרת 

//הראוט הראשי 
app.use('/api', routes);

// Client ➝ Middleware ➝ Route ➝ Controller ➝ Service ➝ API ➝ Service ➝ Controller ➝ Response
// זרימת הנתונים

export default app;

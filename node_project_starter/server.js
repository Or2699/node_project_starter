import app from './app.js';   // מייבא את האפליקציה שהגדרתי בקובץ app.js
import dotenv from 'dotenv'; // מאפשר שימוש בקובץ .env 

dotenv.config();  // טוען את המשתנים מקובץ- port

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



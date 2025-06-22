# Node.js Starter Project

## Description
זו מערכת backend מבוססת Node.js ו-Express שמתקשרת עם TheMealDB API לקבלת מתכונים.  
המערכת כוללת ניהול משתמשים פשוט, בדיקת טוקן authorization ולוגר בקשות.

האפליקציה מאפשרת:  
- חיפוש מנות לפי קטגוריה  
- קבלת מנה לפי מזהה  
- חיפוש מנות לפי שם  
- הרשמה וניהול משתמשים עם טוקנים שמורים במערך בזיכרון  
- אימות טוקן בכל בקשה לשרת  
- לוגר בקשות (Winston) לרישום פרטי הבקשות והתגובות

---

## למה בחרתי TheMealDB API?

בחרתי להשתמש ב-TheMealDB API כי הוא חינמי, נגיש וקל לשימוש, ומספק מאגר גדול של מנות ומתכונים כולל תמונות, קטגוריות והוראות הכנה.  
ה-API לא דורש מפתח API לשימוש בסיסי, מה שהופך אותו לנוח לפרויקטים לימודיים.

---

## איך האפליקציה שלי עובדת?

1. משתמשים יכולים להירשם ולקבל טוקן ייחודי שמאוחסן במערך בזיכרון השרת.  
2. כל בקשה לשרת חייבת להכיל כותרת Authorization עם הטוקן שניתן למשתמש.  
3. Middleware מיוחד בודק את תקינות הטוקן ומאפשר גישה רק למשתמשים מורשים.  
4. האפליקציה שולחת קריאות ל-TheMealDB API כדי לקבל מידע על מנות ומתכונים ומחזירה את המידע ללקוח.  
5. כל בקשה ותגובה מתועדת על ידי לוגר (Winston) כדי לעקוב אחרי פעילות השרת.

---

## Setup
bash
cd node_project_starter
npm install
npm install express cors dotenv winston jsonwebtoken bcrypt
npm install --save-dev nodemon
npm start
npm run dev
node server.js


## מבנה הפרויקט שלי 
project-folder/
│
├── server.js                # נקודת הכניסה לשרת
├── app.js                   # הגדרת Express, Middleware וראוטים
├── routes/                  # ראוטים לאפליקציה
│   ├── index.js             # מרכז ראוטים
│   ├── user.routes.js       # ראוטים לניהול משתמשים
│   └── meal.routes.js       # ראוטים לקריאות ל-TheMealDB
├── controllers/             # לוגיקת הראוטים
│   ├── user.controller.js
│   └── meal.controller.js
├── services/                # שירותים חיצוניים, לדוגמה צריכת API
│   └── meal.service.js
       user.service.js
├── middlewares/             # Middleware – אימות, לוגינג וכו'
│   ├── auth.middleware.js
│   └── logger.middleware.js
├── utils/                   # כלים ועזרים נוספים
│   ├── logger.js            # לוגר (Winston)
│   ├── hash.js              # פונקציה להאש של סיסמאות
│   ├── filter.js            # פונקציה לפילטרים (לבדוק אם נתונים נכונים)
│   └── token.util.js        # פונקציות לניהול טוקנים (JWT)
├── config/                  # קונפיגורציה (כמו משתני סביבה, קובץ הגדרות)
│   └── config.js            # הגדרות כמו secret של JWT וכו'
├── .env                     # משתני סביבה (כגון PORT, JWT_SECRET, TOKEN)
└── package.json             # הגדרות פרויקט ותלויות

POST /users/register  //הרשמה
POST /users/login //התחברות
GET /meals/search?s=Chicken //חיפוש מנות לפי שם 
GET /meals/:id //קבלת מנה לפי מזהה
DELETE /users/:token //מחיקת משתמש לפי טוקן


## דוגמאות להרצה בפאוורשל או בסיאמדי
curl -X POST "http://localhost:5003/api/users/register" -H "Content-Type: application/json" -d "{\"username\": \"or123\", \"password\": \"123456\"}"

--> {"message":"User registered successfully","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yMTIzIiwiaWF0IjoxNzUwNTc3MDIzLCJleHAiOjE3NTA2NjM0MjN9.opb2ZdLsmqkhwERvZI83fyNnFj67v6cvN9KqiHoVxV4"}

curl -X POST "http://localhost:5003/api/users/login" -H "Content-Type: application/json" -d "{\"username\": \"or123\", \"password\": \"123456\"}" 

--> {"message":"Login successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yMTIzIiwiaWF0IjoxNzUwNTc3MDcwLCJleHAiOjE3NTA2NjM0NzB9.RIm8LjaMskS4ZEHxcA2hJL70H-WYSSGeuSgqA8M1uHc"}

curl -X DELETE "http://localhost:5003/api/users/<USERNAME>" -H "Authorization: Bearer <JWT_TOKEN>"

-->{"message":"User deleted successfully"}

curl -X GET "http://localhost:5003/api/meals/search?str=chicken" -H "Authorization: Bearer <JWT_TOKEN>"

--> [{"idMeal":"52795","strMeal":"Chicken Handi","strMealAlternate":null,"strCategory":"Chicken","strArea":"Indian","strInstructions":"Take a large pot or wok, big enough to cook all the chicken, and heat the oil in it. Once the oil is hot, add sliced onion and fry them until deep golden brown....

curl -X GET "http://localhost:5003/api/meals/category/Seafood" -H "Authorization: Bearer <JWT_TOKEN>"

--> [{"strMeal":"Baked salmon with fennel & tomatoes","strMealThumb":"https://www.themealdb.com/images/media/meals/1548772327.jpg","idMeal":"52959"},{"strMeal":"Cajun spiced fish tacos","strMealThumb":"https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg","idMeal":"52819"}....


curl -X GET "http://localhost:5003/api/meals/52772" -H "Authorization: Bearer <JWT_TOKEN>"

--> {"idMeal":"52772","strMeal":"Teriyaki Chicken Casserole","strMealAlternate":null,"strCategory":"Chicken","strArea":"Japanese","strInstructions":"Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat....

## סיכום דוגמאות
GET https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i=52879
POST /users/register
DELETE /users/:username


## הסברים 
Client ➝   // הלקוח שולח בקשה (למשל, חיפוש מנות לפי שם)
  |
Middleware ➝   // המידלוור בודק את הבקשה: 
                // האם יש טוקן? האם הוא תקין? 
                // האם הבקשה מכילה פרמטרים חוקיים?
  |
Route ➝   // הנתיב (Route) בודק את הכתובת שנשלחה 
                // ומפנה את הבקשה ל־Controller המתאים.
                // לדוגמה, אם בקשה היא `GET /meals/search`, היא תופנה ל־meal.controller.js
  |
Controller ➝  // הקונטרולר מקבל את הבקשה ומבצע את הלוגיקה העסקית.
                // לדוגמה, בקשת חיפוש מנות מחברת את הלקוח עם ה־Service המתאים
  |
Service ➝   // השירות מבצע פעולות על הנתונים.
                // לדוגמה, בקריאת API לשליפת מנות מתוך TheMealDB.
  |
API ➝   // שירות ה־API של TheMealDB מקבל את הקריאה, מחפש את המידע הרלוונטי ומחזיר תוצאות.
  |
Service ➝  // השירות מקבל את התשובה מה־API ומבצע עיבוד נוסף אם יש צורך, 
                // ואז מחזיר את התוצאה ל־Controller.
  |
Controller ➝  // הקונטרולר מעבד את התשובה ומחזיר אותה כתגובה ללקוח.
                // לדוגמה, מבצע עיבוד על המידע, רושם אותו בלוג, ומחזיר תוצאה כ־JSON.
  |
Response ➝  // השרת מחזיר את התגובה הסופית ללקוח (למשל, JSON עם המנות שנמצאו).

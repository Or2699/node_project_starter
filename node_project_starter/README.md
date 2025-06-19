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
npm install express cors dotenv winston
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
├── middlewares/             # Middleware – אימות, לוגינג וכו'
│   ├── auth.middleware.js
│   └── logger.middleware.js
├── utils/                   # כלים ועזרים נוספים
│   └── token.util.js        # פונקציה ליצירת טוקן רנדומלי
├── .env                     # משתני סביבה (כגון PORT)
└── package.json             # הגדרות פרויקט ותלויות

POST /users/register  //הרשמה
GET /meals/search?s=Chicken //חיפוש מנות לפי שם 
GET /meals/:id //קבלת מנה לפי מזהה
DELETE /users/:token //מחיקת משתמש לפי טוקן

## דוגמאות 
GET https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i=52879
POST /users/register
DELETE /users/:token
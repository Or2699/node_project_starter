import app from './app.js';   // מייבא את האפליקציה שהגדרתי בקובץ app.js
 import { port } from './config/configuration.js'


//const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Server running on port ${port}`);
});



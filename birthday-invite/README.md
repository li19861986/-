# מחולל הזמנות ליום הולדת (קידוס)

## קבצים
- `index.html`: הבונה. פותחים בדפדפן, ממלאים פרטים, ומורידים את ההזמנה (קובץ HTML אחד לאורחים).
- `apps-script/Code.gs`: השרת לאישורי ההגעה (Google Apps Script + גיליון).

## הפעלה על GitHub Pages
1. בגיטהאב: Settings > Pages > Source: branch `ccr-22a8b37b-ni9d71` (או הענף הראשי אחרי מיזוג), תיקייה `/ (root)`.
2. הדף יהיה זמין בכתובת `https://li19861986.github.io/-/birthday-invite/` (או הדומיין שתחברו).
3. ההזמנה שמורידים מהבונה היא קובץ עצמאי. מעלים אותו לתיקייה באתר (למשל `birthday-invite/guests/<שם>.html`) ושולחים את הקישור לאורחים.

## הפעלת שרת האישורים (Apps Script + Google Sheets)
1. פותחים Google Sheets חדש.
2. Extensions > Apps Script. מדביקים את התוכן של `apps-script/Code.gs` ושומרים.
3. Project Settings > Script properties > Add: `ADMIN_KEY` = מפתח ניהול שתבחרו.
4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. מעתיקים את כתובת ה-Web app.
5. בבונה, בשדה "כתובת שרת האישורים" מדביקים את הכתובת, ובשדה "מפתח ניהול" את המפתח. לוחצים "טענו סיכום".

## אבטחה
- הכתובת של השרת ציבורית, ולכן כל מי שיש לו אותה יכול לשלוח אישור. אפשר להוסיף הגבלות בהמשך.
- רשימת האישורים נקראת רק עם מפתח הניהול.
- הדפדפן לא שומר את מפתח הניהול.

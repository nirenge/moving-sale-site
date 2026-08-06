// 📦 קובץ הנתונים של המוצרים — זהו המקום היחיד שצריך לערוך כדי לעדכן את המוצרים באתר.
// אפשר לערוך את הקובץ ידנית, או להשתמש בעמוד admin.html שמייצא גרסה מעודכנת של קובץ זה.
//
// שדות כל מוצר:
//   id            - מספר ייחודי (לא לשכפל בין מוצרים)
//   name          - שם הפריט
//   price         - מחיר, כטקסט (למשל "500 ₪")
//   dimensions    - מידות, כטקסט
//   condition     - מצב הפריט, כטקסט
//   availableDate - תאריך זמינות, כטקסט
//   image         - נתיב לתמונה (יחסי לתיקיית הפרויקט)
//   sold          - true / false
//   description   - (אופציונלי) תיאור חופשי קצר, מוצג בכרטיס אם קיים
//   category      - (אופציונלי) "giveaway" להצגה בסקשן "למסירה ללא עלות",
//                   כל ערך אחר (או השמטת השדה) = מוצג בסקשן "למכירה"

// קובץ נתוני המוצרים — נוצר אוטומטית ע"י עמוד הניהול (admin.html)
const PRODUCTS = [
  {
    "id": 1,
    "name": "קומודת מגירות צבע בתנור לבן",
    "price": "1000 ₪",
    "dimensions": "רוחב 160, גובה 100 לגבוה, 58 לחלק התחתון, עומק 50",
    "condition": "מצב מעולה",
    "availableDate": "10.08.26",
    "image": "images/dresser.jpg",
    "sold": false
  },
  {
    "id": 2,
    "name": "זוג כורסאות בד טורקיז",
    "price": "1000 ₪",
    "dimensions": "77X70",
    "condition": "מצב מעולה",
    "availableDate": "מיידי",
    "image": "images/armchair-teal-4.jpg",
    "images": [
      "images/armchair-teal-4.jpg",
      "images/armchair-teal-2.jpg",
      "images/armchair-teal-3.jpg"
    ],
    "sold": false
  },
  {
    "id": 3,
    "name": "ספה אפורה פינתית",
    "price": "1000 ₪",
    "dimensions": "1.73 שזלונג 1.35 עומק כולל 75",
    "condition": "מצב מעולה",
    "availableDate": "13.08.26",
    "image": "images/sofa.jpg",
    "images": [
      "images/sofa.jpg",
      "images/sofa-2.jpg"
    ],
    "sold": false
  },
  {
    "id": 5,
    "name": "מיקרוגל Graetz",
    "price": "למסירה",
    "dimensions": "סטנדרטי",
    "condition": "מצב טוב",
    "availableDate": "16.08.26",
    "image": "images/microwave.jpg",
    "sold": false
  },
  {
    "id": 6,
    "name": "6 כיסאות  אוכל מרופד בד פטרול",
    "price": "600 ₪",
    "dimensions": "",
    "condition": "מצב מעולה",
    "availableDate": "10.08.26",
    "image": "images/dining-chair.jpg",
    "images": [
      "images/dining-chair.jpg",
      "images/dining-chair-2.jpg"
    ],
    "sold": false
  },
  {
    "id": 8,
    "name": "4 כיסאות מעוצבים שחורים לפינת אוכל",
    "price": "100 ₪ לכיסא",
    "dimensions": " סטנדרטי",
    "condition": "מצב מעולה",
    "availableDate": "16.08.26",
    "image": "images/chair-black.jpg",
    "sold": false
  },
  {
    "id": 9,
    "name": "זוג תמונות דקורטיביות לקיר",
    "price": "60 ₪",
    "dimensions": "A3",
    "condition": "מצב מעולה",
    "availableDate": "מיידי",
    "image": "images/wall-art.jpg",
    "sold": false
  },
  {
    "id": 10,
    "name": "זוג מדפי קיר משושים שחורים",
    "price": "50 ₪",
    "dimensions": "קוטר 20 סמ",
    "condition": "מצב מעולה",
    "availableDate": "מיידי",
    "image": "images/shelves-hex.jpg",
    "sold": false
  },
  {
    "id": 11,
    "name": "מנורת לילה (זוג, 2 יחידות)",
    "price": "50 ₪ למנורה",
    "dimensions": "",
    "condition": "כמו חדש, שימוש מועט",
    "availableDate": "מיידי",
    "image": "images/night-lamp.jpg",
    "sold": false
  },
  {
    "id": 12,
    "name": "תנור בילד-אין בוש",
    "price": "500 ₪",
    "dimensions": "60X60",
    "condition": "משומש",
    "availableDate": "16.08.26",
    "image": "images/oven-bosch.jpg",
    "sold": false
  },
  {
    "id": 13,
    "name": "2 לוחות מגנטיים איקאה (חדשים באריזה)",
    "price": "40 ₪ ללוח",
    "dimensions": "40X60",
    "condition": "חדש, באריזה מקורית וניילון",
    "availableDate": "מיידי",
    "image": "images/magnetic-board.jpg",
    "sold": true
  },
  {
    "id": 14,
    "name": "מדיח כלים",
    "price": "1200 ₪",
    "dimensions": "",
    "condition": "חדש",
    "availableDate": "16.08.26",
    "image": "images/dishwasher.jpg",
    "description": "מדיח של BEKO, נקנה לפני 9 חודשים",
    "sold": false
  }
];

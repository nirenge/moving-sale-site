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

const PRODUCTS = [
  {
    id: 1,
    name: "קומודת מגירות צבע בתנור לבן",
    price: "1200",
    dimensions: "רוחב 160, גובה 100 לגבוה, 58 לחלק התחתון, עומק 50",
    condition: "מצב מעולה",
    availableDate: "10.08.26",
    image: "images/dresser.jpg",
    sold: false,
  },
  {
    id: 2,
    name: "זוג כורסאות בד טורקיז",
    price: "1000",
    dimensions: "77 X 70",
    condition: "מצב מעולה",
    availableDate: "מיידי",
    image: "images/armchair-teal.jpg",
    images: ["images/armchair-teal.jpg", "images/armchair-teal-2.jpg", "images/armchair-teal-3.jpg"],
    sold: false,
  },
  {
    id: 3,
    name: "ספה אפורה פינתית",
    price: "1200",
    dimensions: "1.73 שזלונג 1.35",
    condition: "מצב מעולה",
    availableDate: "13.08.26",
    image: "images/sofa.jpg",
    sold: false,
  },

  {
    id: 5,
    name: "מיקרוגל Graetz",
    price: "100",
    dimensions: "N.A",
    condition: "מצב טוב",
    availableDate: "16.08.26",
    image: "images/microwave.jpg",
    sold: false,
  },
  {
    id: 6,
    name: "6 כיסאות  אוכל מרופד בד פטרול",
    price: "600",
    dimensions: "לעדכן",
    condition: "מצב מעולה",
    availableDate: "10.08.26",
    image: "images/dining-chair.jpg",
    images: ["images/dining-chair.jpg", "images/dining-chair-2.jpg"],
    sold: false,
  },

  {
    id: 8,
    name: "כיסא מעוצב שחור",
    price: "100 שח לכיסא",
    dimensions: " סטנדרטי",
    condition: "מצב מעולה",
    availableDate: "16.08.26",
    image: "images/chair-black.jpg",
    sold: false,
  },
  {
    id: 9,
    name: "זוג תמונות דקורטיביות לקיר",
    price: "70",
    dimensions: "A3",
    condition: "מצב מעולה",
    availableDate: "מיידי",
    image: "images/wall-art.jpg",
    sold: false,
  },
  {
    id: 10,
    name: "זוג מדפי קיר משושים שחורים",
    price: "60",
    dimensions: "קוטר 20 סמ",
    condition: "מצב מעולה",
    availableDate: "מיידי",
    image: "images/shelves-hex.jpg",
    sold: false,
  },
];

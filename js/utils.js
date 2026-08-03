// כלים משותפים בין index.html ל-admin.html

const STORAGE_KEY = "productsOverride";

// בונה קישור וואטסאפ עם הודעה מוכנה מראש עבור מוצר נתון
function buildWhatsAppLink(phone, productName) {
  const message = `היי, אני מעוניינ/ת ב${productName} שראיתי באתר המכירה. האם עדיין זמין?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// מונע הזרקת HTML דרך שדות טקסט של מוצרים
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// שינויים שנעשו בעמוד admin.html נשמרים בדפדפן (localStorage) כטיוטה,
// כדי לאפשר תצוגה מקדימה מיידית לפני ייצוא קובץ products.js מעודכן.
function getEffectiveProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("שגיאה בקריאת טיוטת מוצרים מה-localStorage:", e);
  }
  return PRODUCTS;
}

// מחזיר את רשימת התמונות של מוצר (שדה images אם קיים, אחרת תמונה בודדת)
function getGalleryImages(product) {
  if (Array.isArray(product.images) && product.images.length) return product.images;
  return [product.image];
}

function saveDraftProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function clearDraftProducts() {
  localStorage.removeItem(STORAGE_KEY);
}

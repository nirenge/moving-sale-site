// לוגיקת עמוד הניהול (admin.html)

let state = getEffectiveProducts().map((p) => ({ ...p }));

const listEl = document.getElementById("admin-list");
const exportPreview = document.getElementById("export-preview");

const FIELDS = [
  { key: "name", label: "שם הפריט", full: true },
  { key: "price", label: "מחיר" },
  { key: "dimensions", label: "מידות" },
  { key: "condition", label: "מצב הפריט" },
  { key: "availableDate", label: "תאריך זמינות" },
  { key: "image", label: "נתיב תמונה", full: true },
  { key: "description", label: "תיאור (אופציונלי)", full: true },
];

function fieldHtml(product, field) {
  const value = escapeHtml(product[field.key]);
  return `
    <label class="field${field.full ? " field--full" : ""}">
      ${field.label}
      <input
        type="text"
        autocomplete="off"
        spellcheck="false"
        data-id="${product.id}"
        data-field="${field.key}"
        value="${value}"
      />
    </label>
  `;
}

function extraImagesValue(product) {
  const extra = (product.images || []).filter((img) => img !== product.image);
  return extra.join(", ");
}

function adminCardHtml(product) {
  return `
    <article class="admin-card${product.sold ? " is-sold" : ""}" data-card-id="${product.id}">
      <img class="admin-card__thumb" src="${escapeHtml(product.image)}" alt=""
           onerror="this.onerror=null;this.src='images/placeholder.svg';" />
      <div class="admin-card__fields">
        ${FIELDS.map((f) => fieldHtml(product, f)).join("")}
        <label class="field field--full">
          תמונות נוספות לאותו פריט (קבצים מופרדים בפסיק, לא כולל התמונה הראשית)
          <input
            type="text"
            autocomplete="off"
            spellcheck="false"
            data-id="${product.id}"
            data-field="imagesExtra"
            value="${escapeHtml(extraImagesValue(product))}"
          />
        </label>
        <div class="admin-card__row">
          <label class="category-select">
            קטגוריה:
            <select data-id="${product.id}" data-field="category">
              <option value="sale" ${product.category !== "giveaway" ? "selected" : ""}>למכירה</option>
              <option value="giveaway" ${product.category === "giveaway" ? "selected" : ""}>למסירה (בחינם)</option>
            </select>
          </label>
          <label class="sold-toggle">
            <input type="checkbox" data-id="${product.id}" data-field="sold" ${product.sold ? "checked" : ""} />
            סומן כנמכר
          </label>
          <button type="button" class="btn btn--danger btn--small" data-action="delete" data-id="${product.id}">
            מחיקת מוצר
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderList() {
  if (!state.length) {
    listEl.innerHTML = '<p class="empty-state">אין מוצרים. לחצו על "הוספת מוצר חדש" כדי להתחיל.</p>';
  } else {
    listEl.innerHTML = state.map(adminCardHtml).join("");
  }
  updateExportPreview();
}

function persist() {
  saveDraftProducts(state);
  updateExportPreview();
}

function updateExportPreview() {
  const fileContent = buildProductsFileContent(state);
  exportPreview.value = fileContent;
}

function buildProductsFileContent(products) {
  return `// קובץ נתוני המוצרים — נוצר אוטומטית ע"י עמוד הניהול (admin.html)
const PRODUCTS = ${JSON.stringify(products, null, 2)};
`;
}

function findProduct(id) {
  return state.find((p) => String(p.id) === String(id));
}

// עדכון שדה טקסט — בלי רינדור מחדש של הרשימה, כדי לא לאבד פוקוס בזמן הקלדה
listEl.addEventListener("input", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  const field = target.dataset.field;
  if (!id || !field) return;

  const product = findProduct(id);
  if (!product) return;

  if (field === "imagesExtra") {
    const extra = target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (extra.length) {
      product.images = [product.image, ...extra];
    } else {
      delete product.images;
    }
    persist();
    return;
  }

  product[field] = target.value;

  if (field === "image") {
    if (product.images) product.images[0] = target.value;
    const card = target.closest(".admin-card");
    const thumb = card.querySelector(".admin-card__thumb");
    thumb.src = target.value || "images/placeholder.svg";
  }

  persist();
});

// checkbox "נמכר" ומחיקה
listEl.addEventListener("change", (e) => {
  const target = e.target;
  if (target.dataset.field === "sold") {
    const product = findProduct(target.dataset.id);
    if (!product) return;
    product.sold = target.checked;
    target.closest(".admin-card").classList.toggle("is-sold", product.sold);
    persist();
  } else if (target.dataset.field === "category") {
    const product = findProduct(target.dataset.id);
    if (!product) return;
    if (target.value === "giveaway") product.category = "giveaway";
    else delete product.category;
    persist();
  }
});

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest('[data-action="delete"]');
  if (!btn) return;
  const id = btn.dataset.id;
  const product = findProduct(id);
  if (!product) return;
  if (!confirm(`למחוק את "${product.name}"?`)) return;
  state = state.filter((p) => String(p.id) !== String(id));
  persist();
  renderList();
});

document.getElementById("btn-add").addEventListener("click", () => {
  const nextId = state.length ? Math.max(...state.map((p) => Number(p.id) || 0)) + 1 : 1;
  state.push({
    id: nextId,
    name: "מוצר חדש",
    price: "לעדכן",
    dimensions: "לעדכן",
    condition: "לעדכן",
    availableDate: "לעדכן",
    image: "images/placeholder.svg",
    sold: false,
  });
  persist();
  renderList();
});

document.getElementById("btn-reset").addEventListener("click", () => {
  if (!confirm("לאפס את כל השינויים שנעשו בעמוד הזה ולחזור לנתוני המקור?")) return;
  clearDraftProducts();
  state = PRODUCTS.map((p) => ({ ...p }));
  renderList();
});

document.getElementById("btn-export").addEventListener("click", () => {
  const content = buildProductsFileContent(state);
  const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "products.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

renderList();

// לוגיקת הצגת המוצרים בעמוד הראשי (index.html)

// מיפוי מזהה מוצר -> רשימת תמונותיו, לשימוש ה-lightbox בעת לחיצה על תמונה
let productGalleries = {};

function renderCard(product) {
  const gallery = getGalleryImages(product);
  productGalleries[product.id] = gallery;

  const soldClass = product.sold ? " card--sold" : "";
  const overlay = product.sold ? '<div class="card__overlay">נמכר</div>' : "";
  const galleryBadge =
    gallery.length > 1 ? `<span class="card__gallery-badge">📷 ${gallery.length}</span>` : "";

  const contactButton = product.sold
    ? '<button class="btn btn--sold" disabled>הפריט נמכר</button>'
    : `<a class="btn btn--whatsapp" href="${buildWhatsAppLink(
        CONFIG.whatsappPhone,
        product.name
      )}" target="_blank" rel="noopener noreferrer">
        <svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.001 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.482 1.345 4.997L2 22l5.14-1.338a9.96 9.96 0 0 0 4.86 1.238h.001c5.514 0 9.997-4.483 9.997-9.997s-4.483-9.9-9.997-9.9zm0 18.191h-.001a8.19 8.19 0 0 1-4.174-1.143l-.299-.177-3.05.795.814-2.973-.195-.306a8.19 8.19 0 0 1-1.256-4.39c0-4.528 3.684-8.212 8.212-8.212 4.528 0 8.212 3.684 8.212 8.212-.001 4.528-3.685 8.194-8.263 8.194z"/></svg>
        מעוניינ/ת בפריט
      </a>`;

  const dimensionsRow =
    product.dimensions && product.dimensions.trim()
      ? `<li><span class="card__label">מידות:</span> ${escapeHtml(product.dimensions)}</li>`
      : "";

  return `
    <article class="card${soldClass}">
      <div
        class="card__image-wrap"
        data-product-id="${product.id}"
        role="button"
        tabindex="0"
        aria-label="הגדלת תמונה של ${escapeHtml(product.name)}"
      >
        <img
          class="card__image"
          src="${escapeHtml(gallery[0])}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='images/placeholder.svg';"
        />
        ${overlay}
        ${galleryBadge}
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(product.name)}</h3>
        <p class="card__price">${escapeHtml(product.price)}</p>
        <ul class="card__details">
          ${dimensionsRow}
          <li><span class="card__label">מצב:</span> ${escapeHtml(product.condition)}</li>
          <li><span class="card__label">זמין מ:</span> ${escapeHtml(product.availableDate)}</li>
        </ul>
        ${contactButton}
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  const products = getEffectiveProducts();

  productGalleries = {};

  if (!products.length) {
    grid.innerHTML = '<p class="empty-state">אין כרגע מוצרים להצגה.</p>';
    return;
  }

  grid.innerHTML = products.map(renderCard).join("");
}

function openProductGallery(productId) {
  const gallery = productGalleries[productId];
  if (gallery) openLightbox(gallery, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const grid = document.getElementById("products-grid");
  grid.addEventListener("click", (e) => {
    const wrap = e.target.closest(".card__image-wrap");
    if (wrap) openProductGallery(wrap.dataset.productId);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const wrap = e.target.closest(".card__image-wrap");
    if (!wrap) return;
    e.preventDefault();
    openProductGallery(wrap.dataset.productId);
  });
});

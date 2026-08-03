// תצוגת תמונה מוגדלת (Lightbox) — נפתחת בלחיצה על תמונת מוצר בעמוד המכירה

let lightboxImages = [];
let lightboxIndex = 0;
let lightboxReturnFocusEl = null;

function renderLightbox() {
  const lb = document.getElementById("lightbox");
  const multi = lightboxImages.length > 1;

  lb.querySelector(".lightbox__image").src = lightboxImages[lightboxIndex];
  lb.querySelector(".lightbox__nav--prev").hidden = !multi;
  lb.querySelector(".lightbox__nav--next").hidden = !multi;
  lb.querySelector(".lightbox__counter").hidden = !multi;
  lb.querySelector(".lightbox__counter").textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;

  const dots = lb.querySelector(".lightbox__dots");
  dots.innerHTML = multi
    ? lightboxImages
        .map((_, i) => `<span class="lightbox__dot${i === lightboxIndex ? " is-active" : ""}" data-index="${i}"></span>`)
        .join("")
    : "";
}

function openLightbox(images, startIndex) {
  lightboxImages = images;
  lightboxIndex = startIndex || 0;
  lightboxReturnFocusEl = document.activeElement;

  renderLightbox();
  const lb = document.getElementById("lightbox");
  lb.hidden = false;
  document.body.classList.add("no-scroll");
  lb.querySelector(".lightbox__close").focus();
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lightboxReturnFocusEl) lightboxReturnFocusEl.focus();
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  renderLightbox();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  renderLightbox();
}

document.addEventListener("DOMContentLoaded", () => {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", lightboxPrev);
  lb.querySelector(".lightbox__nav--next").addEventListener("click", lightboxNext);

  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  lb.querySelector(".lightbox__dots").addEventListener("click", (e) => {
    const dot = e.target.closest(".lightbox__dot");
    if (!dot) return;
    lightboxIndex = Number(dot.dataset.index);
    renderLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") lightboxNext();
    else if (e.key === "ArrowLeft") lightboxPrev();
  });

  // תמיכה בהחלקת אצבע (swipe) במובייל
  let touchStartX = null;
  lb.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  lb.addEventListener("touchend", (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? lightboxNext() : lightboxPrev();
    }
    touchStartX = null;
  });
});

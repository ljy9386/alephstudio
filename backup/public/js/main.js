document.addEventListener("DOMContentLoaded", () => {
  const designBox = document.getElementById('designFeature');
  const publishBox = document.getElementById('publishFeature');
  const gallery = document.querySelector('.scroll-design-gallery');
  const publishGallery = document.querySelector('.scroll-publish-gallery');
  const hero = document.querySelector('.hero');

  // Seamless infinite scroll: duplicate contents once so translateY(-50%) loops perfectly
  const duplicateForInfinite = (rootSelector) => {
    const inners = document.querySelectorAll(`${rootSelector} .gallery-side .inner`);
    inners.forEach((inner) => {
      // Avoid duplicating more than once
      if (!inner.dataset.duplicated) {
        inner.innerHTML = inner.innerHTML + inner.innerHTML;
        inner.dataset.duplicated = 'true';
      }
    });
  };

  duplicateForInfinite('.scroll-design-gallery');
  duplicateForInfinite('.scroll-publish-gallery');

  if (designBox && gallery && hero) {
    designBox.addEventListener('mouseenter', () => {
      hero.classList.add('dark-bg');
      gallery.classList.add('active');
    });
    designBox.addEventListener('mouseleave', () => {
      hero.classList.remove('dark-bg');
      gallery.classList.remove('active');
    });
  }

  if (publishBox && publishGallery && hero) {
    publishBox.addEventListener('mouseenter', () => {
      hero.classList.add('dark-bg');
      publishGallery.classList.add('active');
    });
    publishBox.addEventListener('mouseleave', () => {
      hero.classList.remove('dark-bg');
      publishGallery.classList.remove('active');
    });
  }
});



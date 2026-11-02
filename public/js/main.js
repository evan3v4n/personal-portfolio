// Response headers: open by default on wide screens, collapsed on phones.
const response = document.getElementById('response');
if (response && window.matchMedia('(min-width: 720px)').matches) {
    response.open = true;
}

// Lightbox for photo grids.
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const items = [...document.querySelectorAll('.photo-item')];
let current = -1;

function show(index) {
    current = (index + items.length) % items.length;
    const img = items[current].querySelector('img');
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
}

function close() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.classList.remove('no-scroll');
}

if (lightbox && items.length) {
    items.forEach((item, i) => item.addEventListener('click', () => show(i)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
}

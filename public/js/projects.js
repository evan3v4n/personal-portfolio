// Project detail popup: fills a shared modal from the hidden .pd-source in each card.
(function () {
    const modal = document.getElementById('pdModal');
    if (!modal) return;
    // <main> is its own stacking context, so lift the popup above the fixed header.
    document.body.appendChild(modal);

    const title = modal.querySelector('.pd-title');
    const tags = modal.querySelector('.pd-tags');
    const gallery = modal.querySelector('.pd-gallery');
    const content = modal.querySelector('.pd-content');
    const footer = modal.querySelector('.pd-footer');
    let opener = null;

    function open(tile) {
        const source = tile.querySelector('.pd-source');
        if (!source) return;
        opener = tile;

        title.textContent = tile.querySelector('.project-name').textContent;
        tags.innerHTML = tile.querySelector('.tech-tags').innerHTML;
        gallery.innerHTML = source.querySelector('.pd-images').innerHTML;
        content.innerHTML = source.querySelector('.pd-text')?.innerHTML || '';
        footer.innerHTML = source.querySelector('.pd-links')?.innerHTML || '';

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector('.pd-close').focus();
    }

    function close() {
        modal.hidden = true;
        document.body.style.overflow = '';
        if (opener) opener.focus();
    }

    document.querySelectorAll('.project-tile').forEach(tile => {
        tile.addEventListener('click', e => {
            if (e.target.closest('a')) return;
            open(tile);
        });
        tile.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(tile);
            }
        });
    });

    modal.querySelector('.pd-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.hidden) close();
    });
})();

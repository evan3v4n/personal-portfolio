document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalContent = projectModal.querySelector('.modal-content');

    function showProjectModal(card) {
        const title = card.querySelector('.project-title').textContent;
        const tech = card.querySelector('.project-tech').innerHTML;
        const status = card.querySelector('.project-status').outerHTML;
        const description = card.querySelector('.project-description').textContent;
        const image = card.querySelector('.project-image img')?.src || '';
        const links = card.querySelector('.project-links')?.innerHTML || '';

        // Update modal content
        modalContent.querySelector('.modal-title').textContent = title;
        modalContent.querySelector('.modal-tech').innerHTML = tech;
        modalContent.querySelector('.modal-status').outerHTML = status;
        modalContent.querySelector('.modal-description').textContent = description;
        modalContent.querySelector('.modal-image').src = image;
        modalContent.querySelector('.modal-links').innerHTML = links;

        // Show modal
        projectModal.style.display = 'flex';
    }

    function closeProjectModal() {
        projectModal.style.display = 'none';
    }

    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            showProjectModal(card);
        });
    });

    // Close modal when clicking the close button
    const closeButton = projectModal.querySelector('.modal-close');
    closeButton.addEventListener('click', closeProjectModal);

    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}); 
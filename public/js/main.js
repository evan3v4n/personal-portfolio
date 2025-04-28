// Update the current date in the status bar
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        dateElement.textContent = now.toISOString();
    }
}

// Initialize the page
function init() {
    console.log('Initializing page...');
    updateCurrentDate();
    // Update the date every second
    setInterval(updateCurrentDate, 1000);

    // Initialize project modal
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Found project cards:', projectCards.length);
    
    const projectModal = document.getElementById('projectModal');
    console.log('Project modal element:', projectModal);
    
    if (!projectModal) {
        console.error('Project modal element not found!');
        return;
    }

    const modalContent = projectModal.querySelector('.modal-content');
    console.log('Modal content element:', modalContent);

    function showProjectModal(card) {
        console.log('Showing modal for card:', card);
        
        // Debug log all elements we're trying to find
        console.log('Title element:', card.querySelector('.project-title'));
        console.log('Tech element:', card.querySelector('.project-tech'));
        console.log('Description element:', card.querySelector('.project-description'));
        console.log('Image element:', card.querySelector('.project-image img'));
        console.log('Links element:', card.querySelector('.project-links'));
        
        const title = card.querySelector('.project-title')?.textContent || '';
        const tech = card.querySelector('.project-tech')?.innerHTML || '';
        const description = card.querySelector('.project-description')?.textContent || '';
        
        // Handle image with error checking
        const imageElement = card.querySelector('.project-image img');
        const image = imageElement ? imageElement.src : '';
        console.log('Found image:', image);
        
        // Debug log all content before updating modal
        console.log('Modal content to be set:', {
            title,
            tech,
            description,
            image,
            links: card.querySelector('.project-links')?.innerHTML || ''
        });

        // Safely update modal content
        const updateModalElement = (selector, content, isHtml = false) => {
            const element = modalContent.querySelector(selector);
            if (element) {
                if (isHtml) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            } else {
                console.warn(`Modal element not found: ${selector}`);
            }
        };

        // Update modal content safely
        updateModalElement('.modal-title', title);
        updateModalElement('.modal-tech', tech, true);
        updateModalElement('.modal-description', description);
        updateModalElement('.modal-links', card.querySelector('.project-links')?.innerHTML || '', true);

        // Handle image
        const modalImage = modalContent.querySelector('.project-modal-image img');
        const projectModalImage = modalContent.querySelector('.project-modal-image');
        
        if (modalImage && projectModalImage) {
            if (image) {
                // Preload image to check if it exists
                const img = new Image();
                img.onerror = () => {
                    console.log('Image not found:', image);
                    modalImage.style.display = 'none';
                    projectModalImage.style.display = 'none';
                };
                img.onload = () => {
                    console.log('Image loaded successfully');
                    modalImage.style.display = 'block';
                    modalImage.src = image;
                    projectModalImage.style.display = 'block';
                    
                    // Add ASCII art effect class
                    modalImage.classList.add('console-image');
                };
                img.src = image;
            } else {
                console.log('No image found');
                modalImage.style.display = 'none';
                projectModalImage.style.display = 'none';
            }
        } else {
            console.warn('Modal image elements not found:', { modalImage, projectModalImage });
        }

        // Show modal
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        console.log('Modal displayed');
    }

    function closeProjectModal() {
        projectModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Modal closed');
    }

    // Add click event to project cards
    projectCards.forEach(card => {
        console.log('Adding click listener to card:', card);
        card.addEventListener('click', () => {
            console.log('Card clicked');
            showProjectModal(card);
        });
    });

    // Close modal when clicking the close button
    const closeButton = projectModal.querySelector('.modal-close');
    console.log('Close button:', closeButton);
    
    if (closeButton) {
        closeButton.addEventListener('click', closeProjectModal);
        console.log('Added click listener to close button');
    } else {
        console.error('Close button not found!');
    }

    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });

    // Initialize image modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    // Add click event to all photo items and their images
    document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const img = this.querySelector('img');
            if (img) {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalImg.alt = img.alt || 'Modal Image';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
    }

    // Add click handler to close button
    const imageModalCloseButton = modal.querySelector('.modal-close');
    if (imageModalCloseButton) {
        imageModalCloseButton.addEventListener('click', closeModal);
        console.log('Added click listener to image modal close button');
    } else {
        console.error('Image modal close button not found!');
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Start when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 
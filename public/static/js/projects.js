document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'project-modal';
            
            // Get project details from the card
            const title = card.querySelector('.project-title').textContent;
            const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
            
            // Create modal content
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>${title}</h2>
                    <div class="modal-tech">
                        ${techTags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="modal-description">
                        <p>Project description goes here. This would be populated with actual project details.</p>
                    </div>
                </div>
            `;
            
            // Add modal to the page
            document.body.appendChild(modal);
            
            // Add close functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
}); 
document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const totalPages = 7;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const tocItems = document.querySelectorAll('.toc-item');

    function updatePage(pageNumber) {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        
        currentPage = pageNumber;

        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });

        // Show current page
        const activePage = document.getElementById(`page-${currentPage}`);
        if (activePage) {
            activePage.classList.add('active');
        }

        // Update sidebar TOC active state
        tocItems.forEach(item => {
            const itemPage = parseInt(item.getAttribute('data-page'));
            if (itemPage === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update header page indicator
        pageIndicator.textContent = `Halaman ${currentPage} / ${totalPages}`;

        // Disable / Enable Navigation Buttons
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);

        // Scroll to top of viewer
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Button event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            updatePage(currentPage + 1);
        }
    });

    // TOC item click listeners
    tocItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageNum = parseInt(item.getAttribute('data-page'));
            updatePage(pageNum);
        });
    });

    // Initialize state
    updatePage(1);
});

document.addEventListener('DOMContentLoaded', function() {
    // Wait for everything to be fully loaded
    window.addEventListener('load', function() {
        // Get the progress bar and header elements
        const progressBar = document.getElementById('progressBar');
        const header = document.querySelector('.header');
        
        // Make sure elements exist
        if (!progressBar || !header) return;
        
        // Show the progress bar
        progressBar.style.display = 'block';
        
        // Function to update the progress bar
        function updateProgressBar() {
            // Calculate scroll progress
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight - windowHeight;
            let scrolled = (window.scrollY / docHeight) * 100;
            
            // Ensure the value is between 0 and 100
            scrolled = Math.min(100, Math.max(0, scrolled));
            
            // Update the width of the progress bar
            progressBar.style.width = scrolled + '%';
            
            // Add/remove class to header when scrolled
            if (window.scrollY > 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
        
        // Add scroll event listener with debounce for better performance
        let isScrolling;
        window.addEventListener('scroll', function() {
            window.cancelAnimationFrame(isScrolling);
            isScrolling = window.requestAnimationFrame(updateProgressBar);
        }, false);
        
        // Initialize progress bar
        updateProgressBar();
    });
});

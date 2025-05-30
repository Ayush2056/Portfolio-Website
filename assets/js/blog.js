document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data (in a real app, this would come from an API)
    const blogPosts = [
        {
            id: 1,
            title: 'Building a Portfolio Website with HTML, CSS, and JavaScript',
            excerpt: 'Learn how I built my personal portfolio website from scratch using modern web technologies.',
            image: 'assets/img/portfolio1.png',
            date: 'May 28, 2025',
            category: 'Web Development',
            content: `
                <p>Building a personal portfolio website is a great way to showcase your work and skills to potential employers or clients. In this post, I'll walk you through the process of building a responsive portfolio website using HTML, CSS, and JavaScript.</p>
                <h3>Planning the Layout</h3>
                <p>Before writing any code, I planned the layout of my portfolio website. I wanted it to include sections for my projects, skills, experience, and contact information.</p>
                <h3>Designing with CSS</h3>
                <p>I used CSS Grid and Flexbox to create a responsive layout that works well on all devices. I also added smooth animations and transitions to enhance the user experience.</p>
                <h3>Adding Interactivity with JavaScript</h3>
                <p>I used JavaScript to add interactive elements like a dark mode toggle, smooth scrolling, and a contact form. I also implemented a blog section to share my thoughts and experiences.</p>
                <p>Building this portfolio website was a great learning experience, and I'm excited to continue improving it as I learn new technologies and work on new projects!</p>
            `
        },
        {
            id: 2,
            title: 'Mastering CSS Grid for Modern Layouts',
            excerpt: 'Learn how to create complex layouts with CSS Grid and take your web design skills to the next level.',
            image: 'assets/img/portfolio2.png',
           date: 'May 25, 2025',
            category: 'CSS',
            content: `
                <p>CSS Grid has revolutionized the way we create layouts on the web. In this post, I'll share some tips and tricks for mastering CSS Grid and creating modern, responsive layouts.</p>
                <h3>Grid Basics</h3>
                <p>CSS Grid allows you to create two-dimensional layouts with rows and columns. You can define the size of each row and column, and place items anywhere in the grid.</p>
                <h3>Responsive Design</h3>
                <p>One of the best things about CSS Grid is how easy it makes creating responsive layouts. You can use media queries to change the grid layout based on the viewport size.</p>
                <h3>Advanced Techniques</h3>
                <p>CSS Grid also includes powerful features like grid areas, auto-placement, and grid template areas that make it easy to create complex layouts with minimal code.</p>
                <p>With CSS Grid, the possibilities are endless. Start experimenting with it in your projects today!</p>
            `
        },
        {
            id: 3,
            title: 'JavaScript Best Practices for Clean Code',
            excerpt: 'Learn the best practices for writing clean, maintainable, and efficient JavaScript code.',
            image: 'assets/img/portfolio3.png',
            date: 'May 20, 2025',
            category: 'JavaScript',
            content: `
                <p>Writing clean, maintainable JavaScript code is essential for any web developer. In this post, I'll share some best practices that I've learned over the years.</p>
                <h3>Variable Naming</h3>
                <p>Use descriptive variable names that clearly indicate the purpose of the variable. Avoid single-letter variable names (except in loops) and use camelCase for variable names.</p>
                <h3>Functions</h3>
                <p>Keep your functions small and focused on doing one thing. This makes them easier to test and reuse. Also, use default parameters and destructuring to make your functions more flexible.</p>
                <h3>Error Handling</h3>
                <p>Always handle errors in your code. Use try/catch blocks for synchronous code and .catch() for Promises. Provide meaningful error messages that will help you debug issues.</p>
                <p>By following these best practices, you'll write better JavaScript code that's easier to read, maintain, and debug.</p>
            `
        }
    ];

    // DOM Elements
    const blogContainer = document.querySelector('.blog__container');
    const blogModal = document.getElementById('blog-modal');
    const modalClose = document.querySelector('.blog__modal-close');
    const modalTitle = document.querySelector('.blog__modal-title');
    const modalDate = document.querySelector('.blog__modal-date');
    const modalCategory = document.querySelector('.blog__modal-category');
    const modalBody = document.querySelector('.blog__modal-body');

    // Function to display blog posts
    function displayBlogPosts() {
        // Clear loading message
        blogContainer.innerHTML = '';

        // Create blog post cards
        blogPosts.forEach(post => {
            const blogPost = document.createElement('article');
            blogPost.className = 'blog__card';
            blogPost.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog__img">
                <div class="blog__content">
                    <h3 class="blog__title">${post.title}</h3>
                    <div class="blog__meta">
                        <span class="blog__date">${post.date}</span>
                        <span class="blog__category">${post.category}</span>
                    </div>
                    <p class="blog__excerpt">${post.excerpt}</p>
                    <a href="#" class="blog__read-more" data-id="${post.id}">
                        Read More <i class="uil uil-arrow-right"></i>
                    </a>
                </div>
            `;
            blogContainer.appendChild(blogPost);
        });

        // Add event listeners to read more buttons
        document.querySelectorAll('.blog__read-more').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = parseInt(this.getAttribute('data-id'));
                const post = blogPosts.find(p => p.id === postId);
                if (post) {
                    openModal(post);
                }
            });
        });
    }

    // Function to open modal with blog post
    function openModal(post) {
        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalCategory.textContent = post.category;
        modalBody.innerHTML = post.content;
        
        blogModal.classList.add('active-modal');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Function to close modal
    function closeModal() {
        blogModal.classList.remove('active-modal');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Event Listeners
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content
    blogModal.addEventListener('click', function(e) {
        if (e.target === blogModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && blogModal.classList.contains('active-modal')) {
            closeModal();
        }
    });

    // Display blog posts when the page loads
    // Simulate loading delay
    setTimeout(displayBlogPosts, 1000);
});


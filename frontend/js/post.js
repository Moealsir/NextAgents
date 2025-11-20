// NextAgent.tech - Single Post JavaScript
// ==================================

(function() {
    'use strict';

    let currentLang = 'ar';

    // ============ Utility Functions ============
    function getPostIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        
        if (currentLang === 'ar') {
            return date.toLocaleDateString('ar-EG', options);
        } else {
            return date.toLocaleDateString('en-US', options);
        }
    }

    // ============ Load Single Post ============
    async function loadPost() {
        const postId = getPostIdFromUrl();
        const postContainer = document.getElementById('postContainer');
        
        if (!postId) {
            postContainer.innerHTML = `<p class="error">Post ID is missing.</p>`;
            return;
        }

        try {
            const response = await fetch('/api/blogs/' + postId);
            
            if (response.status === 404) {
                postContainer.innerHTML = `<p class="error">Post not found.</p>`;
                return;
            }

            const post = await response.json();
            
            if (post) {
                console.log('Post data received:', post); // Debug log
                renderPost(post);
            } else {
                postContainer.innerHTML = `<p class="error">Error loading post data.</p>`;
            }
        } catch (error) {
            console.error('Error loading single post:', error);
            postContainer.innerHTML = `<p class="error">An error occurred while fetching the post.</p>`;
        }
    }

    // ============ Render Post ============
    function renderPost(post) {
        const postContainer = document.getElementById('postContainer');
        
        // Set language
        currentLang = localStorage.getItem('language') || 'ar';

        const title = currentLang === 'ar' ? post.title_ar : post.title_en;
        const content = currentLang === 'ar' ? post.content_ar : post.content_en;
        const date = formatDate(post.created_at);
        
        // Update page title
        document.title = title + ' - NextAgent.tech';

        // Render the post content
        postContainer.innerHTML = `
            <article class="single-post">
                <div class="post-header">
                    <h1 class="post-title">${title}</h1>
                    <div class="post-meta">
                        <span class="post-author">
                            <i class="fas fa-user"></i>
                            ${post.author}
                        </span>
                        <span class="post-date">
                            <i class="fas fa-calendar"></i>
                            ${date}
                        </span>
                        <span class="post-category">
                            <i class="fas fa-tag"></i>
                            ${post.category}
                        </span>
                    </div>
                </div>
                <div class="post-image-wrapper">
                    <img src="${post.image_url}" alt="${title}" class="post-image">
                </div>
                <div class="post-content">
                    ${content}
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
            </article>
        `;
    }

    // ============ Initialize ============
    document.addEventListener('DOMContentLoaded', () => {
        loadPost();
    });

})();

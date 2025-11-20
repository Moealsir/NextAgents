// NextAgent.tech - Admin Dashboard JavaScript
// ===========================================

(function() {
    'use strict';

    // --- Configuration ---
    const API_BASE = '/api';
    const ADMIN_PASSWORD = 'admin'; // Simple hardcoded password for demo
    let currentLang = 'ar';
    let activeSection = 'dashboard';
    let editingBlogId = null;
    let editingProductId = null;
    let editingTestimonialId = null;

    // --- DOM Elements ---
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const mainContent = document.querySelector('.admin-main');
    const html = document.documentElement;
    const blogModal = document.getElementById('blogModal');
    const productModal = document.getElementById('productModal');
    const testimonialModal = document.getElementById('testimonialModal');
    const blogForm = document.getElementById('blogForm');
    const productForm = document.getElementById('productForm');
    const testimonialForm = document.getElementById('testimonialForm');

    // --- Utility Functions ---
    function showMessage(message, type = 'error') {
        loginError.textContent = message;
        loginError.className = 'error-message ' + type;
    }

    function getElement(id) {
        return document.getElementById(id);
    }

    function updateTranslations() {
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(element => {
            const arText = element.getAttribute('data-ar');
            const enText = element.getAttribute('data-en');
            element.textContent = currentLang === 'ar' ? arText : enText;
        });
    }

    function applyLanguage(lang) {
        currentLang = lang;
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
        } else {
            html.setAttribute('dir', 'ltr');
        }
        updateTranslations();
    }

    function openModal(modal) {
        modal.classList.add('active');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
    }

    // --- Authentication ---
    function checkAuth() {
        const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
        if (isAuthenticated) {
            loginScreen.style.display = 'none';
            mainContent.style.display = 'block';
            initializeDashboard();
        } else {
            loginScreen.style.display = 'flex';
            mainContent.style.display = 'none';
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const password = passwordInput.value;
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminAuth', 'true');
            checkAuth();
        } else {
            showMessage('Incorrect password. Please try again.');
        }
    }

    function handleLogout() {
        localStorage.removeItem('adminAuth');
        checkAuth();
    }

    // --- Navigation ---
    function setupNavigation() {
        sidebarNav.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (!navItem) return;

            e.preventDefault();
            const targetSection = navItem.getAttribute('data-section');
            
            // Update active state in sidebar
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            navItem.classList.add('active');

            // Show/Hide sections
            document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
            getElement(targetSection).classList.add('active');
            
            activeSection = targetSection;
            
            // Load data for the section
            loadSectionData(targetSection);
        });
    }

    function loadSectionData(section) {
        switch (section) {
            case 'dashboard':
                loadDashboardStats();
                break;
            case 'blog':
                loadBlogPosts();
                break;
            case 'products':
                loadProducts();
                break;
            case 'testimonials':
                loadTestimonials();
                break;
            // Forms, Surveys, Messages are placeholders for now
            default:
                break;
        }
    }

    // --- Dashboard Stats ---
    async function loadDashboardStats() {
        // Blog Count
        try {
            const response = await fetch(\`\${API_BASE}/blog-count\`);
            const data = await response.json();
            getElement('blogBadge').textContent = data.count;
        } catch (error) {
            console.error('Error loading blog count:', error);
        }
        
        // Products Count
        try {
            const response = await fetch(`${API_BASE}/product-count`);
            const data = await response.json();
            getElement('productsBadge').textContent = data.count;
        } catch (error) {
            console.error('Error loading product count:', error);
        }

        // Testimonials Count
        try {
            const response = await fetch(`${API_BASE}/testimonial-count`);
            const data = await response.json();
            getElement('testimonialsBadge').textContent = data.count;
        } catch (error) {
            console.error('Error loading testimonial count:', error);
        }
        
        // Other stats are placeholders for now
        getElement('surveysBadge').textContent = '0';
        getElement('messagesBadge').textContent = '0';

        // Latest Activity
        try {
            const response = await fetch(`${API_BASE}/admin/blogs?limit=5`);
            const recentPosts = await response.json();
            const activityList = getElement('latestActivity');
            activityList.innerHTML = ''; // Clear previous entries
            if (recentPosts.length > 0) {
                recentPosts.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>New Post:</strong> ${post.title_en || post.title_ar}`;
                    activityList.appendChild(li);
                });
            } else {
                activityList.innerHTML = '<li>No recent activity.</li>';
            }
        } catch (error) {
            console.error('Error loading latest activity:', error);
            getElement('latestActivity').innerHTML = '<li>Error loading activity.</li>';
        }
    }

    // --- Blog Posts CRUD (Read) ---
    // Helper to get form data
    function getBlogFormData() {
        const data = {
            title_ar: getElement('blogTitleAr').value,
            title_en: getElement('blogTitleEn').value,
            excerpt_ar: getElement('blogExcerptAr').value,
            excerpt_en: getElement('blogExcerptEn').value,
            content_ar: tinymce.get('blogContentAr').getContent(),
            content_en: tinymce.get('blogContentEn').getContent(),
            slug: getElement('blogSlug').value,
            category: getElement('blogCategory').value,
            author: getElement('blogAuthor').value,
            image_url: getElement('blogImageUrl').value,
            tags: getElement('blogTags').value.split(',').map(t => t.trim()),
            published: getElement('blogPublished').checked,
        };
        return data;
    }

    // Helper to fill form
    function fillBlogForm(post) {
        getElement('blogTitleAr').value = post.title_ar || '';
        getElement('blogTitleEn').value = post.title_en || '';
        getElement('blogExcerptAr').value = post.excerpt_ar || '';
        getElement('blogExcerptEn').value = post.excerpt_en || '';
        tinymce.get('blogContentAr').setContent(post.content_ar || '');
        tinymce.get('blogContentEn').setContent(post.content_en || '');
        getElement('blogSlug').value = post.slug || '';
        getElement('blogCategory').value = post.category || '';
        getElement('blogAuthor').value = post.author || '';
        getElement('blogImageUrl').value = post.image_url || '';
        getElement('blogTags').value = (post.tags || []).join(', ');
        getElement('blogPublished').checked = post.published || false;
    }

    // Helper to open modal for new post
    function openNewBlogModal() {
        editingBlogId = null;
        blogForm.reset();
        tinymce.get('blogContentAr').setContent('');
        tinymce.get('blogContentEn').setContent('');
        getElement('blogModalTitle').textContent = 'إضافة مقال جديد';
        openModal(blogModal);
    }

    // Helper to open modal for editing
    async function openEditBlogModal(id) {
        try {
            const response = await fetch(\`\${API_BASE}/blogs/\${id}\`);
            const post = await response.json();
            
            editingBlogId = id;
            fillBlogForm(post);
            getElement('blogModalTitle').textContent = 'تعديل المقال';
            openModal(blogModal);
        } catch (error) {
            console.error('Error fetching post for edit:', error);
            alert('Failed to load post data.');
        }
    }

    // Helper to handle form submission
    async function handleBlogSubmit(e) {
        e.preventDefault();
        const data = getBlogFormData();
        const method = editingBlogId ? 'PUT' : 'POST';
        const url = editingBlogId ? \`\${API_BASE}/admin/blogs/\${editingBlogId}\` : \`\${API_BASE}/admin/blogs\`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }

            closeModal(blogModal);
            loadBlogPosts();
            alert('Blog post saved successfully!');
        } catch (error) {
            console.error('Error saving blog post:', error);
            alert('Failed to save blog post. Check console for details.');
        }
    }

    // Helper to handle deletion
    async function deleteBlogPost(id) {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const response = await fetch(\`\${API_BASE}/admin/blogs/\${id}\`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }

            loadBlogPosts();
            alert('Blog post deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog post:', error);
            alert('Failed to delete blog post. Check console for details.');
        }
    }

    // Attach event listeners for CRUD actions
    function setupBlogEventListeners() {
        document.getElementById('addBlogBtn').addEventListener('click', openNewBlogModal);
        blogForm.addEventListener('submit', handleBlogSubmit);
        
        // Delegation for edit/delete buttons
        document.getElementById('blogGrid').addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-icon');
            if (!btn) return;
            
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-action');
            
            if (action === 'editBlog') {
                openEditBlogModal(id);
            } else if (action === 'deleteBlog') {
                deleteBlogPost(id);
            }
        });
    }

    // Read all blog posts
    async function loadBlogPosts() {
    async function loadBlogPosts() {
        const container = getElement('blogGrid');
        container.innerHTML = '<div class="loading">جاري تحميل المقالات...</div>';
        
        try {
            // Using the admin endpoint to get all posts (published or not)
            const response = await fetch(\`\${API_BASE}/admin/blogs\`);
            const posts = await response.json();
            
            getElement('blogBadge').textContent = posts.length;

            if (posts.length === 0) {
                container.innerHTML = \`
                    <div class="empty-state">
                        <i class="fas fa-blog"></i>
                        <h3>لا توجد مقالات</h3>
                        <p>ابدأ بإضافة مقال جديد.</p>
                    </div>
                \`;
                return;
            }

            container.innerHTML = posts.map(post => \`
                <div class="blog-card-admin">
                    <img src="\${post.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="\${post.title_en}" class="blog-card-image">
                    <div class="blog-card-content">
                        <h3 class="blog-card-title">\${post.title_ar}</h3>
                        <p class="blog-card-excerpt">\${post.excerpt_ar}</p>
                        <div class="blog-card-meta">
                            <span><i class="fas fa-user"></i> \${post.author}</span>
                            <span><i class="fas fa-calendar"></i> \${new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
                        </div>
                        <div class="blog-card-actions">
                            <button class="btn-icon edit" data-id="\${post.id}" data-action="editBlog">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" data-id="\${post.id}" data-action="deleteBlog">
                                <i class="fas fa-trash"></i>
                            </button>
                            <span class="badge \${post.published ? 'bg-success' : 'bg-danger'}">\${post.published ? 'منشور' : 'مسودة'}</span>
                        </div>
                    </div>
                </div>
            \`).join('');

        } catch (error) {
            console.error('Error loading blog posts:', error);
            container.innerHTML = '<div class="loading error">حدث خطأ أثناء تحميل المقالات.</div>';
        }
    }

    // --- Products CRUD (Read) ---
    // Helper to get form data
    function getProductFormData() {
        const data = {
            title_ar: getElement('productTitleAr').value,
            title_en: getElement('productTitleEn').value,
            description_ar: getElement('productDescriptionAr').value,
            description_en: getElement('productDescriptionEn').value,
            icon: getElement('productIcon').value,
            file_type: getElement('productFileType').value,
            file_size: getElement('productFileSize').value,
            download_url: getElement('productDownloadUrl').value,
        };
        return data;
    }

    // Helper to fill form
    function fillProductForm(product) {
        getElement('productTitleAr').value = product.title_ar || '';
        getElement('productTitleEn').value = product.title_en || '';
        getElement('productDescriptionAr').value = product.description_ar || '';
        getElement('productDescriptionEn').value = product.description_en || '';
        getElement('productIcon').value = product.icon || '';
        getElement('productFileType').value = product.file_type || '';
        getElement('productFileSize').value = product.file_size || '';
        getElement('productDownloadUrl').value = product.download_url || '';
    }

    // Helper to open modal for new product
    function openNewProductModal() {
        editingProductId = null;
        productForm.reset();
        getElement('productModalTitle').textContent = 'إضافة منتج جديد';
        openModal(productModal);
    }

    // Helper to open modal for editing
    async function openEditProductModal(id) {
        try {
            const response = await fetch(\`\${API_BASE}/products/\${id}\`);
            const product = await response.json();
            
            editingProductId = id;
            fillProductForm(product);
            getElement('productModalTitle').textContent = 'تعديل المنتج';
            openModal(productModal);
        } catch (error) {
            console.error('Error fetching product for edit:', error);
            alert('Failed to load product data.');
        }
    }

    // Helper to handle form submission
    async function handleProductSubmit(e) {
        e.preventDefault();
        const data = getProductFormData();
        const method = editingProductId ? 'PUT' : 'POST';
        const url = editingProductId ? \`\${API_BASE}/products/\${editingProductId}\` : \`\${API_BASE}/products\`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }

            closeModal(productModal);
            loadProducts();
            alert('Product saved successfully!');
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product. Check console for details.');
        }
    }

    // Helper to handle deletion
    async function deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(\`\${API_BASE}/products/\${id}\`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }

            loadProducts();
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Check console for details.');
        }
    }

    // Attach event listeners for CRUD actions
    function setupProductEventListeners() {
        document.getElementById('addProductBtn').addEventListener('click', openNewProductModal);
        productForm.addEventListener('submit', handleProductSubmit);
        
        // Delegation for edit/delete buttons
        document.getElementById('productsTableBody').addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-icon');
            if (!btn) return;
            
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-action');
            
            if (action === 'editProduct') {
                openEditProductModal(id);
            } else if (action === 'deleteProduct') {
                deleteProduct(id);
            }
        });
    }

    // Read all products
    async function loadProducts() {
    async function loadProducts() {
        const container = getElement('productsTableBody');
        container.innerHTML = '<tr><td colspan="6" class="loading">جاري تحميل المنتجات...</td></tr>';
        
        try {
            const response = await fetch(\`\${API_BASE}/products\`);
            const products = await response.json();
            
            getElement('productsBadge').textContent = products.length;

            if (products.length === 0) {
                container.innerHTML = '<tr><td colspan="6" class="empty-state">لا توجد منتجات.</td></tr>';
                return;
            }

            container.innerHTML = products.map(product => \`
                <tr>
                    <td style="font-size: 2rem;">\${product.icon}</td>
                    <td>\${product.title_ar}</td>
                    <td>\${product.file_type}</td>
                    <td>\${product.file_size}</td>
                    <td>\${new Date(product.created_at).toLocaleDateString('ar-EG')}</td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-icon edit" data-id="\${product.id}" data-action="editProduct">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" data-id="\${product.id}" data-action="deleteProduct">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            \`).join('');

        } catch (error) {
            console.error('Error loading products:', error);
            container.innerHTML = '<tr><td colspan="6" class="loading error">حدث خطأ أثناء تحميل المنتجات.</td></tr>';
        }
    }

    // --- Testimonials CRUD (Read) ---
    // Helper to get form data
    function getTestimonialFormData() {
        const data = {
            name_ar: getElement('testimonialNameAr').value,
            name_en: getElement('testimonialNameEn').value,
            company_ar: getElement('testimonialCompanyAr').value,
            company_en: getElement('testimonialCompanyEn').value,
            testimonial_ar: getElement('testimonialTextAr').value,
            testimonial_en: getElement('testimonialTextEn').value,
            rating: parseInt(getElement('testimonialRating').value, 10),
            avatar: getElement('testimonialAvatar').value,
        };
        return data;
    }

    // Helper to fill form
    function fillTestimonialForm(t) {
        getElement('testimonialNameAr').value = t.name_ar || '';
        getElement('testimonialNameEn').value = t.name_en || '';
        getElement('testimonialCompanyAr').value = t.company_ar || '';
        getElement('testimonialCompanyEn').value = t.company_en || '';
        getElement('testimonialTextAr').value = t.testimonial_ar || '';
        getElement('testimonialTextEn').value = t.testimonial_en || '';
        getElement('testimonialRating').value = t.rating || 5;
        getElement('testimonialAvatar').value = t.avatar || '';
    }

    // Helper to open modal for new testimonial
    function openNewTestimonialModal() {
        editingTestimonialId = null;
        testimonialForm.reset();
        getElement('testimonialModalTitle').textContent = 'إضافة رأي جديد';
        openModal(testimonialModal);
    }

    // Helper to open modal for editing
    async function openEditTestimonialModal(id) {
        try {
            const response = await fetch(\`\${API_BASE}/testimonials/\${id}\`);
            const t = await response.json();
            
            editingTestimonialId = id;
            fillTestimonialForm(t);
            getElement('testimonialModalTitle').textContent = 'تعديل الرأي';
            openModal(testimonialModal);
        } catch (error) {
            console.error('Error fetching testimonial for edit:', error);
            alert('Failed to load testimonial data.');
        }
    }

    // Helper to handle form submission
    async function handleTestimonialSubmit(e) {
        e.preventDefault();
        const data = getTestimonialFormData();
        const method = editingTestimonialId ? 'PUT' : 'POST';
        const url = editingTestimonialId ? \`\${API_BASE}/testimonials/\${editingTestimonialId}\` : \`\${API_BASE}/testimonials\`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }

            closeModal(testimonialModal);
            loadTestimonials();
            alert('Testimonial saved successfully!');
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial. Check console for details.');
        }
    }

    // Helper to handle deletion
    async function deleteTestimonial(id) {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const response = await fetch(\`\${API_BASE}/testimonials/\${id}\`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }

            loadTestimonials();
            alert('Testimonial deleted successfully!');
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Failed to delete testimonial. Check console for details.');
        }
    }

    // Attach event listeners for CRUD actions
    function setupTestimonialEventListeners() {
        document.getElementById('addTestimonialBtn').addEventListener('click', openNewTestimonialModal);
        testimonialForm.addEventListener('submit', handleTestimonialSubmit);
        
        // Delegation for edit/delete buttons
        document.getElementById('testimonialsGrid').addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-icon');
            if (!btn) return;
            
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-action');
            
            if (action === 'editTestimonial') {
                openEditTestimonialModal(id);
            } else if (action === 'deleteTestimonial') {
                deleteTestimonial(id);
            }
        });
    }

    // Read all testimonials
    async function loadTestimonials() {
    async function loadTestimonials() {
        const container = getElement('testimonialsGrid');
        container.innerHTML = '<div class="loading">جاري تحميل آراء العملاء...</div>';
        
        try {
            const response = await fetch(\`\${API_BASE}/testimonials\`);
            const testimonials = await response.json();
            
            getElement('testimonialsBadge').textContent = testimonials.length;

            if (testimonials.length === 0) {
                container.innerHTML = \`
                    <div class="empty-state">
                        <i class="fas fa-star"></i>
                        <h3>لا توجد آراء عملاء</h3>
                        <p>ابدأ بإضافة رأي جديد.</p>
                    </div>
                \`;
                return;
            }

            container.innerHTML = testimonials.map(t => \`
                <div class="testimonial-card-admin">
                    <div class="card-actions">
                        <button class="btn-icon edit" data-id="\${t.id}" data-action="editTestimonial">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" data-id="\${t.id}" data-action="deleteTestimonial">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="testimonial-content">
                        <p class="testimonial-text">\${t.testimonial_ar}</p>
                        <div class="testimonial-author">
                            <h4>\${t.name_ar}</h4>
                            <p>\${t.company_ar}</p>
                        </div>
                        <div class="testimonial-rating">\${'⭐'.repeat(t.rating)}</div>
                    </div>
                </div>
            \`).join('');

        } catch (error) {
            console.error('Error loading testimonials:', error);
            container.innerHTML = '<div class="loading error">حدث خطأ أثناء تحميل آراء العملاء.</div>';
        }
    }

    // --- Initialization ---
    function initializeDashboard() {
        // Setup language
        const savedLang = localStorage.getItem('language') || 'ar';
        applyLanguage(savedLang);

        // Setup navigation
        setupNavigation();
        
        // Load initial data (Dashboard)
        loadSectionData(activeSection);
        
        // Setup logout button
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        
        // Setup modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.closest('.modal').id;
                closeModal(getElement(modalId));
            });
        });
        
        // Setup TinyMCE
        tinymce.init({
            selector: '#blogContentAr, #blogContentEn',
            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            height: 300
        });
        
        // Setup CRUD Event Listeners
        setupBlogEventListeners();
        setupProductEventListeners();
        setupTestimonialEventListeners();
    }

    // --- Main Entry Point ---
    function initializeDashboard() {
        // Setup language
        const savedLang = localStorage.getItem('language') || 'ar';
        applyLanguage(savedLang);

        // Setup navigation
        setupNavigation();
        
        // Load initial data (Dashboard)
        loadSectionData(activeSection);
        
        // Setup logout button
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        
        // Setup modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.closest('.modal').id;
                closeModal(getElement(modalId));
            });
        });
        
        // Setup TinyMCE
        tinymce.init({
            selector: '#blogContentAr, #blogContentEn',
            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            height: 300
        });
    }

    // --- Main Entry Point ---
    document.addEventListener('DOMContentLoaded', () => {
        // Setup login form
        loginForm.addEventListener('submit', handleLogin);
        
        // Check authentication status
        checkAuth();
    });

})();


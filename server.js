const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// IMPORTANT: The DATABASE_URL is hardcoded here for demonstration.
// In a production environment, you MUST use environment variables (e.g., process.env.DATABASE_URL).
const DATABASE_URL = "postgres://nextagents:AiAgents123@143.110.226.0:5432/nextdb";

const pool = new Pool({
    connectionString: DATABASE_URL,
});

const app = express();
const port = 3010; // Using 3010 as per user's last successful run

// Middleware
app.use(cors()); // Allow frontend to access the API
app.use(express.json()); // To parse JSON request bodies

// Serve static files from the 'frontend' directory
app.use(express.static('frontend'));

// --- API Endpoints ---

// #region Blog Posts CRUD

// Fetch all published blog posts (for blog.html)
app.get('/api/blogs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC LIMIT 100');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// Fetch a single blog post by ID (for post.html)
app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Error fetching single blog [${id}]:`, err);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

// Fetch all blog posts (for admin dashboard)
app.get('/api/admin/blogs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching admin blogs:', err);
        res.status(500).json({ error: 'Failed to fetch admin blog posts' });
    }
});

// Create a new blog post
app.post('/api/admin/blogs', async (req, res) => {
    const { title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, slug, category, author, image_url, tags, published } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO blog_posts (title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, slug, category, author, image_url, tags, published) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, slug, category, author, image_url, tags, published]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating blog post:', err);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

// Update a blog post
app.put('/api/admin/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const { title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, slug, category, author, image_url, tags, published } = req.body;
    try {
        const result = await pool.query(
            `UPDATE blog_posts SET 
                title_ar = $1, title_en = $2, excerpt_ar = $3, excerpt_en = $4, content_ar = $5, content_en = $6, 
                slug = $7, category = $8, author = $9, image_url = $10, tags = $11, published = $12, updated_at = NOW() 
             WHERE id = $13 RETURNING *`,
            [title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, slug, category, author, image_url, tags, published, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Error updating blog post [${id}]:`, err);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// Delete a blog post
app.delete('/api/admin/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(`Error deleting blog post [${id}]:`, err);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

// #endregion

// #region Products CRUD

// Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Create a new product
app.post('/api/products', async (req, res) => {
    const { title_ar, title_en, description_ar, description_en, icon, file_type, file_size, download_url } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO products (title_ar, title_en, description_ar, description_en, icon, file_type, file_size, download_url) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [title_ar, title_en, description_ar, description_en, icon, file_type, file_size, download_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { title_ar, title_en, description_ar, description_en, icon, file_type, file_size, download_url } = req.body;
    try {
        const result = await pool.query(
            `UPDATE products SET 
                title_ar = $1, title_en = $2, description_ar = $3, description_en = $4, 
                icon = $5, file_type = $6, file_size = $7, download_url = $8 
             WHERE id = $9 RETURNING *`,
            [title_ar, title_en, description_ar, description_en, icon, file_type, file_size, download_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Error updating product [${id}]:`, err);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(`Error deleting product [${id}]:`, err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// #endregion

// #region Testimonials CRUD

// Fetch all testimonials
app.get('/api/testimonials', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

// Create a new testimonial
app.post('/api/testimonials', async (req, res) => {
    const { name_ar, name_en, company_ar, company_en, testimonial_ar, testimonial_en, rating, avatar } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO testimonials (name_ar, name_en, company_ar, company_en, testimonial_ar, testimonial_en, rating, avatar) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name_ar, name_en, company_ar, company_en, testimonial_ar, testimonial_en, rating, avatar]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating testimonial:', err);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
});

// Update a testimonial
app.put('/api/testimonials/:id', async (req, res) => {
    const { id } = req.params;
    const { name_ar, name_en, company_ar, company_en, testimonial_ar, testimonial_en, rating, avatar } = req.body;
    try {
        const result = await pool.query(
            `UPDATE testimonials SET 
                name_ar = $1, name_en = $2, company_ar = $3, company_en = $4, 
                testimonial_ar = $5, testimonial_en = $6, rating = $7, avatar = $8 
             WHERE id = $9 RETURNING *`,
            [name_ar, name_en, company_ar, company_en, testimonial_ar, testimonial_en, rating, avatar, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Error updating testimonial [${id}]:`, err);
        res.status(500).json({ error: 'Failed to update testimonial' });
    }
});

// Delete a testimonial
app.delete('/api/testimonials/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(`Error deleting testimonial [${id}]:`, err);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

// #endregion

// #region Count Endpoints

// Count all blog posts
app.get('/api/blog-count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM blog_posts');
        res.json({ count: parseInt(result.rows[0].count, 10) });
    } catch (err) {
        console.error('Error counting blogs:', err);
        res.status(500).json({ error: 'Failed to count blog posts' });
    }
});

// Count all products
app.get('/api/product-count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM products');
        res.json({ count: parseInt(result.rows[0].count, 10) });
    } catch (err) {
        console.error('Error counting products:', err);
        res.status(500).json({ error: 'Failed to count products' });
    }
});

// Count all testimonials
app.get('/api/testimonial-count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM testimonials');
        res.json({ count: parseInt(result.rows[0].count, 10) });
    } catch (err) {
        console.error('Error counting testimonials:', err);
        res.status(500).json({ error: 'Failed to count testimonials' });
    }
});

// #endregion

// --- Server Startup ---

pool.connect()
    .then(client => {
        console.log("Successfully connected to PostgreSQL!");
        client.release();
        
        const host = '0.0.0.0'; // Listen on all network interfaces
        app.listen(port, host, () => {
            console.log(`Backend server is now listening on all interfaces on port ${port}.`);
            console.log(`Access the application via your domain (after reverse proxy setup): http://nextagents.me/index.html`);
            console.log(`Or locally via: http://localhost:${port}/index.html`);
        });
    })
    .catch(err => {
        console.error("FATAL ERROR: Failed to connect to PostgreSQL.");
        console.error("Please ensure your PostgreSQL server is running and the DATABASE_URL is correct.");
        console.error("Connection Error:", err.message);
        process.exit(1);
    });


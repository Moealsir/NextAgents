-- NextAgent.tech Database Seed Script
-- This script populates the products and blog_posts tables with initial content
-- Run this manually if you need to reset or seed the database

-- ============================================
-- SEED PRODUCTS (Free Resources)
-- ============================================

-- Clear existing products (optional - remove this if you want to keep existing data)
-- DELETE FROM products;

-- Insert 5 Free Products
INSERT INTO products (title_ar, title_en, description_ar, description_en, icon, file_type, file_size, download_url) VALUES
(
    'دليل الأتمتة للمنشآت الصغيرة والمتوسطة',
    'Automation Starter Guide for Small Businesses',
    'دليل عملي خطوة بخطوة يساعد العيادات، مراكز التجميل، ومكاتب الخدمات على رسم عملياتهم الحالية، اختيار ما يجب أتمتته أولاً، وتجنب أخطاء الأتمتة الشائعة.',
    'A practical step-by-step guide that helps clinics, beauty centers, and service offices map their current operations, choose the right processes to automate, and avoid the most common automation mistakes.',
    'fas fa-robot',
    'PDF',
    '2.5 MB',
    '/downloads/automation-starter-guide.pdf'
),
(
    'قوالب محادثات واتساب ذكية للعيادات الطبية',
    'AI WhatsApp Conversation Flows for Clinics',
    'قوالب جاهزة لمحادثات واتساب تدير حجز المواعيد، التذكير، المتابعة، والرد على الأسئلة المتكررة للعيادات والمراكز الطبية.',
    'Ready-made WhatsApp conversation flows that handle appointment booking, reminders, follow-ups, and basic FAQs for medical clinics and healthcare centers.',
    'fas fa-comments',
    'DOCX',
    '500 KB',
    '/downloads/ai-whatsapp-flows-clinics.docx'
),
(
    'قالب خطة عمل لمشاريع الأتمتة والذكاء الاصطناعي',
    'AI & Automation Business Plan Template',
    'قالب منظم لخطة عمل مخصص لوكالات التسويق، المستشارين، واستديوهات الأتمتة لعرض حلول الذكاء الاصطناعي والأتمتة للمنشآت الصغيرة والمتوسطة.',
    'A structured business plan template tailored for agencies, consultants, and automation studios that want to pitch AI and automation solutions to SMEs.',
    'fas fa-lightbulb',
    'DOCX',
    '600 KB',
    '/downloads/ai-business-plan-template.docx'
),
(
    'حزمة Workflows n8n جاهزة للمنشآت الخدمية',
    'n8n Workflow Pack for Service Businesses',
    'مجموعة من مسارات العمل الجاهزة في n8n لتذكير المواعيد، التقاط العملاء المحتملين، مزامنة الـ CRM، وإرسال الإشعارات البريدية – مخصصة للعيادات، صالونات التجميل، ومكاتب الاستشارات.',
    'A collection of ready-to-use n8n workflows for appointment reminders, lead capture, CRM sync, and email notifications — designed for clinics, salons, and consulting offices.',
    'fas fa-network-wired',
    'JSON',
    '850 KB',
    '/downloads/n8n-service-workflow-pack.json'
),
(
    'قالب لوحة مؤشرات للأتمتة وقياس الأداء',
    'KPI & Automation Dashboard Template',
    'قالب لوحة مؤشرات جاهز للاستخدام في Google Sheets أو Excel لقياس الحجوزات، أوقات الرد، وقت العمل الذي تم توفيره بواسطة الأتمتة، وأداء الحملات في مكان واحد.',
    'A Google Sheets / Excel-ready dashboard template to track bookings, response times, automation savings, and campaign performance in one place.',
    'fas fa-chart-line',
    'XLSX',
    '350 KB',
    '/downloads/kpi-automation-dashboard.xlsx'
);

-- ============================================
-- SEED BLOG POSTS
-- ============================================

-- Clear existing blog posts (optional - remove this if you want to keep existing data)
-- DELETE FROM blog_posts;

-- Insert 5 Blog Posts
INSERT INTO blog_posts (title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, slug, category, author, image_url, tags, published, created_at) VALUES
(
    'كيف تقلل وكلاء الذكاء الاصطناعي نسبة عدم الحضور في العيادات بنسبة 40٪',
    'How AI Agents Reduce No-Show Rates in Clinics by 40%',
    'شرح عملي لكيف يمكن للعيادات استخدام مساعد مواعيد بالذكاء الاصطناعي وتذكيرات واتساب لتقليل نسبة عدم الحضور وتحسين تجربة المرضى.',
    'A practical breakdown of how clinics can use AI appointment assistants and WhatsApp reminders to cut no-show rates and improve patient experience.',
    'في أغلب العيادات، يقضي موظفو الاستقبال وقتًا طويلًا في تأكيد المواعيد وملاحقة المرضى الذين ينسون أوقات زيارتهم.

في هذا المقال نستعرض سير عمل حقيقي لمساعد مواعيد بالذكاء الاصطناعي:

• كيف يتم إرسال تذكيرات واتساب وSMS في التوقيت المناسب،
• كيف يتعامل النظام مع الإلغاء ويعيد فتح الوقت لمريض آخر،
• وكيف يمكن للعيادة متابعة نسبة عدم الحضور عبر لوحة مؤشرات بسيطة.

في النهاية نشارك قائمة خطوات عملية يمكن لأي عيادة تطبيقها قبل البدء في بناء حل الأتمتة الخاص بها.',
    'In most clinics, front-desk teams spend a huge amount of time confirming appointments and chasing patients who forget their visit times.

In this article, we walk through a real AI appointment assistant workflow:

• how SMS and WhatsApp reminders are triggered,
• how the system detects cancellations and frees time slots,
• and how the clinic can track no-show statistics in a simple dashboard.

We also share a step-by-step checklist that any clinic can follow before building its own automation.',
    'ai-agents-reduce-no-show-clinics',
    'Healthcare',
    'NextAgent Team',
    '/images/blog/clinic-no-show.jpg',
    'ai,automation,healthcare,appointments',
    TRUE,
    NOW() - INTERVAL '15 days'
),
(
    'من فوضى الواتساب إلى حجوزات منظمة في صالونات التجميل',
    'From WhatsApp Chaos to Organized Bookings for Beauty Salons',
    'الكثير من صالونات التجميل تدير كامل عملها عن طريق الواتساب. في هذا المقال نشرح كيف يمكن لطبقة أتمتة بسيطة تحويل محادثات متناثرة إلى نظام حجز منظم.',
    'Many beauty salons run their entire business from WhatsApp. We show how a simple automation layer can turn scattered chats into a clean booking system.',
    'هذا المقال مبني على مشروع أتمتة حقيقي لمركز تجميل نسائي.

نوضح فيه:

• كيف قمنا برسم محادثات الواتساب الحالية وتحليلها،
• أي الرسائل تم أتمتتها وأيها بقيت مع موظفات الاستقبال،
• كيف يتم جدولة التذكيرات وتأكيد الحجز،
• وما هي مؤشرات الأداء التي يتابعها المركز أسبوعيًا الآن.

بنهاية المقال، ستعرف شكل "أقل حل أتمتة عملي" يمكن تطبيقه في صالون تجميل بدون تعقيد.',
    'This article is based on a real automation project for a women''s beauty center.

We cover:

• how we mapped the existing WhatsApp conversations,
• which messages were automated and which stayed human,
• how reminders and confirmations are scheduled,
• and what KPIs the salon now tracks every week.

By the end, you will understand exactly what a "minimum viable automation" looks like for a beauty salon.',
    'whatsapp-to-organized-bookings-beauty-salons',
    'Business',
    'NextAgent Team',
    '/images/blog/beauty-salon-automation.jpg',
    'whatsapp,automation,beauty,bookings',
    TRUE,
    NOW() - INTERVAL '12 days'
),
(
    'ما هو وكيل الذكاء الاصطناعي وأين يناسب فعليًا في المنشآت الصغيرة والمتوسطة؟',
    'What Is an AI Agent and Where Does It Actually Make Sense in SMEs?',
    'شرح مبسط لوكلاء الذكاء الاصطناعي بدون مصطلحات معقدة، مع أمثلة واضحة من عيادات، صالونات، ومكاتب خدمات.',
    'A clear, non-technical explanation of AI agents, with concrete examples from clinics, salons, and service offices.',
    'وكلاء الذكاء الاصطناعي ليسوا روبوتات سحرية، بل هم مسارات عمل تربط نماذج اللغة مع الأدوات الموجودة لديك.

في هذا المقال نشرح:

• الفرق بين "شات بوت" تقليدي و"وكيل ذكاء اصطناعي"،
• ما هي المهام التي تناسب الأتمتة عبر الوكلاء وما هي المهام التي يفضل أن تبقى بشرية،
• ثلاث حالات استخدام حقيقية يتم فيها توفير الوقت وتقليل الأخطاء بشكل واضح.

الهدف هو مساعدة صاحب المنشأة على اختيار نقطة بداية واضحة بدل محاولة أتمتة كل شيء مرة واحدة.',
    'AI agents are not magic robots; they are workflows that combine language models with your existing tools.

In this article we explain:

• the difference between a chatbot and an AI agent,
• which tasks are ideal for agents (and which are not),
• and three real use cases where agents consistently save time and reduce errors.

The goal is to help business owners decide where to start instead of trying to automate everything at once.',
    'what-is-an-ai-agent-for-smes',
    'AI & Technology',
    'NextAgent Team',
    '/images/blog/ai-agent-for-smes.jpg',
    'ai,agents,smes,explainer',
    TRUE,
    NOW() - INTERVAL '8 days'
),
(
    'بناء نظام متابعة تلقائي للعملاء المحتملين باستخدام n8n',
    'Building an Always-On Follow-Up System for Leads Using n8n',
    'الكثير من الشركات تخسر عملاء محتملين فقط لأن المتابعة لا تتم في الوقت المناسب. في هذا المقال نشرح كيف تبني نظام متابعة تلقائي باستخدام n8n وأدوات بسيطة لديك بالفعل.',
    'Most businesses lose leads simply because nobody follows up on time. We show how to build an always-on follow-up system using n8n and simple tools you already have.',
    'نستعرض مسار عمل كامل في n8n يربط نماذج الموقع، أنظمة الـ CRM، والواتساب/الإيميل لضمان أن كل عميل محتمل يتلقى متابعة في الوقت المناسب.

سترى كيف يتم تقييم العملاء المحتملين، وكيف تُنشأ مهام لمندوبي المبيعات، وكيف يمكن قياس زمن الاستجابة بدون إضافة أنظمة جديدة معقدة.',
    'We walk through a full n8n workflow that connects web forms, CRMs, and WhatsApp/email to ensure every lead receives a timely follow-up.

You will see how leads are scored, how tasks are created for sales teams, and how to measure response times without adding new software.',
    'always-on-follow-up-system-n8n',
    'Marketing',
    'NextAgent Team',
    '/images/blog/lead-followup-n8n.jpg',
    'n8n,automation,leads,marketing',
    TRUE,
    NOW() - INTERVAL '5 days'
),
(
    'خارطة طريق الأتمتة للعيادات، صالونات التجميل، ومكاتب الخدمات',
    'Automation Roadmap for Clinics, Salons, and Service Offices',
    'بدل شراء أدوات عشوائية، يقدم هذا المقال خارطة طريق من ثلاث مراحل لإدخال الأتمتة إلى منشأتك بطريقة آمنة ومدروسة.',
    'Instead of buying random tools, this article shows a simple 3-phase roadmap to introduce automation safely into your business.',
    'نقسم رحلة الأتمتة إلى ثلاث مراحل واضحة:

1. فهم ورسم العمليات الحالية داخل المنشأة،
2. البدء بأتمتة منخفضة المخاطر مثل التذكيرات والإشعارات والتقارير،
3. الانتقال إلى وكلاء الذكاء الاصطناعي بعد ثبات الأساسيات.

في كل مرحلة نوضح أمثلة عملية، أدوات مقترحة، وأخطاء شائعة يجب تجنبها.',
    'We break the journey into three phases:

1. Understand and map your current workflows,
2. Start with low-risk automations (reminders, notifications, reporting),
3. Move to AI agents once the foundations are stable.

For each phase we provide concrete examples, recommended tools, and typical mistakes to avoid.',
    'automation-roadmap-clinics-salons-service-offices',
    'Business',
    'NextAgent Team',
    '/images/blog/automation-roadmap.jpg',
    'strategy,automation,roadmap',
    TRUE,
    NOW() - INTERVAL '2 days'
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check products count
SELECT COUNT(*) as products_count FROM products;

-- Check blog posts count
SELECT COUNT(*) as blog_posts_count FROM blog_posts WHERE published = TRUE;

-- View all products
SELECT id, title_en, file_type, file_size FROM products ORDER BY id;

-- View all blog posts
SELECT id, title_en, category, slug FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC;

-- Success message
SELECT 'Database seeded successfully! ✅' as status;

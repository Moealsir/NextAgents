// NextAgent.tech - Portfolio JavaScript
// =======================================

// TODO: Phase 2 - Migrate these portfolio projects to PostgreSQL blog_posts table with category='portfolio'
// Store primary_sector in 'category' field and use_cases in 'tags' array field
// Then fetch via: GET /api/blogs?category=case-study or create dedicated endpoint

(function() {
    'use strict';

    let currentLang = 'ar';

    // ============ PORTFOLIO DATA ============
    // Real projects from Upwork portfolio
    const caseStudiesData = [
        {
            id: 'shopify-crm-sync',
            primarySector: { ar: 'متاجر إلكترونية', en: 'E-Commerce Stores' },
            category: 'ecommerce',
            title: {
                ar: 'مزامنة بيانات متجر Shopify مع الـ CRM عبر وكيل ذكاء اصطناعي',
                en: 'AI-Driven Shopify to CRM Data Sync'
            },
            shortClient: {
                ar: 'متجر Shopify متوسط الحجم بعدد طلبات يومية مرتفع',
                en: 'Mid-size Shopify store with high daily order volume'
            },
            challenge: {
                ar: 'الفريق كان يحدث بيانات الطلبات يدويًا بين Shopify وCRM، مما سبب أخطاء متكررة، بيانات غير متناسقة، وتأخير في تقارير المبيعات.',
                en: 'The team manually synced orders between Shopify and the CRM, causing frequent errors, inconsistent data, and delayed sales reporting.'
            },
            solution: {
                ar: 'قمنا ببناء وكيل ذكاء اصطناعي يعالج كل طلب جديد أو ملغي، يتحقق من صحة البيانات، ينشئ سجلات منظمة في الـ CRM، ويحدث قاعدة بيانات PostgreSQL في الوقت الفعلي. كل العملية تعمل تلقائيًا بدون تدخل يدوي.',
                en: 'We built an AI agent that processes every new and cancelled order, validates the data, creates structured CRM records, and updates a PostgreSQL database in real time. The entire flow runs automatically with no manual steps.'
            },
            results: {
                ar: 'زيادة دقة البيانات إلى أكثر من 98٪، إلغاء الحاجة لأي مزامنة يدوية، وتسريع معالجة الطلبات إلى ثلاثة أضعاف مع تقارير مبيعات محدثة دائمًا.',
                en: 'Data accuracy increased to over 98%, manual sync work was completely eliminated, and order processing became 3× faster with always-up-to-date sales reports.'
            },
            useCases: {
                ar: [
                    'منصات اشتراكات (Subscriptions / SaaS Billing)',
                    'متاجر جملة B2B',
                    'شركات لوجستية تتعامل مع أوامر كثيرة',
                    'أي منصة مبيعات تحتاج مزامنة بين المتجر وCRM أو قاعدة بيانات'
                ],
                en: [
                    'Subscription / SaaS billing platforms',
                    'B2B wholesale stores',
                    'Logistics companies with high order volume',
                    'Any business that needs clean sync between store and CRM/DB'
                ]
            }
        },
        {
            id: 'ai-appointment-assistant',
            primarySector: { ar: 'العيادات الطبية', en: 'Medical Clinics' },
            category: 'medical',
            title: {
                ar: 'مساعد مواعيد ذكي لعيادة طبية',
                en: 'AI Appointment Assistant for Medical Clinic'
            },
            shortClient: {
                ar: 'عيادة تخصصية في مدينة كبيرة – 5 أطباء وعدد زيارات يومية مرتفع',
                en: 'Specialized clinic in a major city – 5 doctors, high daily traffic'
            },
            challenge: {
                ar: 'إدارة المواعيد كانت تتم يدويًا عبر مكالمات ورسائل، مما سبب أخطاء في الحجز، تداخل في أوقات المواعيد، ووقت ضائع من فريق الاستقبال.',
                en: 'Appointments were managed manually via calls and messages, leading to booking errors, double-booked slots, and a lot of wasted time for the front-desk team.'
            },
            solution: {
                ar: 'قمنا ببناء مساعد مواعيد بالذكاء الاصطناعي يربط Google Calendar وGoogle Sheets مع النظام الداخلي، يدير محادثات العملاء، يثبت المواعيد، ويرسل تذكيرات آلية قبل الموعد مع مراعاة فروق التوقيت.',
                en: 'We built an AI-powered appointment assistant that connects Google Calendar, Google Sheets, and the internal system, handles client conversations, confirms bookings, and sends automated reminders with full time-zone awareness.'
            },
            results: {
                ar: 'انخفاض ملحوظ في المواعيد الملغاة والمتداخلة، تقليل الضغط على موظفي الاستقبال، وتحسين تجربة المريض في الحجز والمتابعة.',
                en: 'Cancellations and overlapping bookings dropped significantly, front-desk workload was reduced, and patients enjoyed a smoother booking and follow-up experience.'
            },
            useCases: {
                ar: [
                    'عيادات الأسنان',
                    'مراكز العلاج الطبيعي',
                    'مكاتب الاستشارات (قانونية، مالية، إدارية)',
                    'مراكز التدريب والدورات',
                    'أي نشاط يعتمد على مواعيد واستشارات فردية'
                ],
                en: [
                    'Dental clinics',
                    'Physiotherapy centers',
                    'Consulting offices (legal, financial, business)',
                    'Training centers and coaching services',
                    'Any business that runs 1:1 appointments or sessions'
                ]
            }
        },
        {
            id: 'whatsapp-booking-bot',
            primarySector: { ar: 'مراكز التجميل والصالونات', en: 'Beauty Centers و Salons' },
            category: 'beauty',
            title: {
                ar: 'شات بوت حجز وتذكير عبر واتساب',
                en: 'Smart WhatsApp Booking و Reminder Bot'
            },
            shortClient: {
                ar: 'مركز تجميل نسائي بعدد موظفات كبير وحجوزات يومية عالية',
                en: 'Women\'s beauty center with high daily booking volume'
            },
            challenge: {
                ar: 'الاتصالات على الواتساب والمكالمات كانت مضغوطة، والردود تتأخر خصوصًا خارج أوقات الدوام، وهذا سبب ضياع حجوزات وإلغاءات متأخرة.',
                en: 'WhatsApp and phone communication were overloaded, with slow responses especially outside working hours, causing lost bookings and late cancellations.'
            },
            solution: {
                ar: 'طوّرنا بوت واتساب ثنائي اللغة (عربي/إنجليزي) يعمل 24/7، يستقبل طلبات الحجز، يقترح أوقات متاحة، يرسل رسائل تأكيد، ويذكّر العميل قبل الموعد تلقائيًا.',
                en: 'We developed a bilingual (Arabic/English) WhatsApp bot that runs 24/7, handles booking requests, suggests available time slots, sends confirmations, and automatically reminds clients before their appointments.'
            },
            results: {
                ar: 'ارتفاع معدل الاستجابة إلى أكثر من 90٪، انخفاض الإلغاءات المتأخرة، وتخفيض العبء اليدوي على الفريق بنسبة تصل إلى 70٪.',
                en: 'Response rate increased to over 90%, late cancellations dropped significantly, and manual workload for the team was reduced by up to 70%.'
            },
            useCases: {
                ar: [
                    'نوادي رياضية (Gym, Fitness)',
                    'عيادات طبية صغيرة',
                    'مكاتب خدمات واستشارات',
                    'مدربي كوتشينغ فردي (Coaches)',
                    'مراكز تعليم ودورات قصيرة'
                ],
                en: [
                    'Gyms and fitness centers',
                    'Small medical clinics',
                    'Service and consulting offices',
                    'One-to-one coaching businesses',
                    'Training centers and short courses'
                ]
            }
        },
        {
            id: 'ai-video-workflow',
            primarySector: { ar: 'وكالات التسويق وصناع المحتوى', en: 'Marketing Agencies و Content Creators' },
            category: 'marketing',
            title: {
                ar: 'نظام تلقائي بالكامل لإنشاء الفيديوهات باستخدام n8n وتيليجرام',
                en: 'Fully Automated AI Video Creation Workflow (n8n + Telegram Bot)'
            },
            shortClient: {
                ar: 'شركة محتوى ترغب في إنتاج فيديوهات ترويجية بشكل يومي بدون فريق مونتاج كبير',
                en: 'Content-focused business needing daily promotional videos without a large editing team'
            },
            challenge: {
                ar: 'إنتاج كل فيديو كان يتطلب ساعات من الكتابة، اختيار الصور، التسجيل الصوتي، والمونتاج، مما أدى إلى هدر 20–40 ساعة أسبوعيًا.',
                en: 'Producing each video required hours of scripting, image selection, voice recording, and editing, wasting 20–40 hours every week.'
            },
            solution: {
                ar: 'بنينا نظام آلي يبدأ من رسالة في تيليجرام، ثم يولد السكربت، يختار العناصر البصرية، ينشئ الفيديو مع التعليق الصوتي، ويصدر النسخة النهائية جاهزة للنشر – بدون أي تدخل يدوي.',
                en: 'We built a fully automated workflow that starts from a Telegram message, then generates the script, selects visual assets, creates the video with voice-over, and exports a final version ready to publish — with zero manual editing.'
            },
            results: {
                ar: 'توفير ما بين 20 إلى 40 ساعة عمل أسبوعيًا، تسريع إنتاج المحتوى، والحفاظ على جودة ثابتة في كل الفيديوهات.',
                en: 'The client saved 20–40 working hours per week, accelerated content production, and maintained consistent video quality across all outputs.'
            },
            useCases: {
                ar: [
                    'عيادات طبية ترغب في محتوى توعوي منتظم',
                    'منصات تعليمية أونلاين',
                    'شركات SaaS تحتاج فيديوهات شرح للمنتج',
                    'براندات شخصية تنشر محتوى يومي على السوشال ميديا'
                ],
                en: [
                    'Medical clinics producing frequent educational content',
                    'Online education platforms',
                    'SaaS companies needing product explainers',
                    'Personal brands posting daily content on social media'
                ]
            }
        },
        {
            id: 'ai-email-campaign-automation',
            primarySector: { ar: 'وكالات التسويق والمبيعات', en: 'Marketing و Sales Agencies' },
            category: 'marketing',
            title: {
                ar: 'أتمتة حملات البريد الإلكتروني باستخدام SuperOffice CR وAzure & Mailgun',
                en: 'AI Email Campaign Automation using SuperOffice CRM, Azure DB و Mailgun'
            },
            shortClient: {
                ar: 'شركة تسويق B2B تدير حملات بريدية لعدة عملاء',
                en: 'B2B marketing agency managing email campaigns for multiple clients'
            },
            challenge: {
                ar: 'الحملات البريدية كانت تستغرق أيامًا للإعداد. ضعف segmentation وعدم دقة تقسيم العملاء. وجود أخطاء بشرية في المحتوى والبيانات. نقص في آلية الاعتماد قبل الإرسال.',
                en: 'Manual creation taking days, poor segmentation, frequent human errors, no automated approval process.'
            },
            solution: {
                ar: 'نظام احترافي متكامل يربط SuperOffice CRM مع Azure Cosmos DB، ويستخدم الذكاء الاصطناعي لتوليد حملات بريدية عالية الجودة مخصّصة لكل فئة من العملاء. يعتمد النظام على تحليل البيانات، ومعايير segmentation دقيقة، ثم يولّد محتوى بريد متسق وفعّال عبر GPT، ويقوم بمراجعته واعتماده تلقائياً قبل إرساله عبر Mailgun. النظام يعالج دورة حياة الحملة بالكامل: من تحليل البيانات → توليد المحتوى → الاعتماد الذكي → الإرسال → التتبع، بدون تدخل يدوي تقريباً.',
                en: 'A fully automated email marketing workflow integrating SuperOffice CRM, Azure Cosmos DB, GPT-powered content generation, and Mailgun delivery. The system performs deep segmentation, generates personalized emails with AI, validates tone/style automatically, and dispatches them with advanced retry and tracking mechanisms. The entire email lifecycle is automated end-to-end.'
            },
            results: {
                ar: 'تقليص وقت إعداد الحملات من 3 أيام إلى 15 دقيقة. زيادة معدل فتح البريد بنسبة 42%. تقليل الأخطاء البشرية بنسبة 100%. إنشاء وإرسال أكثر من 50 رسالة بريدية آلياً.',
                en: 'Preparation time reduced 3 days → 15 minutes. +42% open-rate improvement. Zero human errors. 50+ emails sent automatically.'
            },
            useCases: {
                ar: [
                    'العيادات الطبية (حملات توعوية)',
                    'الشركات العقارية (متابعة العملاء المحتملين)',
                    'مكاتب الخدمات (عروض موسمية)',
                    'المتاجر الإلكترونية (abandoned cart campaigns)',
                    'شركات تعتمد CRM كبير',
                    'B2B pre-sales automation'
                ],
                en: [
                    'Medical clinics (awareness campaigns)',
                    'Real estate companies (lead nurturing)',
                    'Service offices (seasonal offers)',
                    'E-commerce (abandoned cart campaigns)',
                    'Large CRM-dependent businesses',
                    'B2B pre-sales automation'
                ]
            }
        },
        {
            id: 'hr-contracts-automation',
            primarySector: { ar: 'الموارد البشرية والشركات', en: 'HR Departments و Corporations' },
            category: 'automation',
            title: {
                ar: 'أتمتة عقود الموارد البشرية باستخدام الذكاء الاصطناعي وn8n',
                en: 'Automated HR Contract Generation using AI و n8n'
            },
            shortClient: {
                ar: 'شركة متوسطة الحجم مع onboarding مستمر للموظفين الجدد',
                en: 'Mid-sized company with continuous employee onboarding'
            },
            challenge: {
                ar: 'تأخير كبير في تجهيز العقود. اختلاف الصيغ وتفاوت الجودة. ضغط شديد على فريق HR. احتمالية أخطاء عالية في الإدخال.',
                en: 'Slow onboarding, inconsistent templates, repetitive manual work.'
            },
            solution: {
                ar: 'نظام شامل لإدارة عقود الموظفين بشكل تلقائي بالكامل. يحول عملية إعداد العقود من مهام يدوية بطيئة إلى عملية ذكية وسريعة تعتمد على الذكاء الاصطناعي وn8n. يقوم النظام بجمع بيانات الموظف، توليد عقد PDF مناسب لنوع الوظيفة، حفظ البيانات في Google Sheets وAirTable، ثم إرسال العقد فورياً للموظف وإدارة HR عبر WhatsApp مع سجل تدقيق كامل.',
                en: 'A complete AI-powered HR automation workflow that generates employee contracts, stores structured HR data, and sends instant WhatsApp alerts. This system eliminates manual contract preparation and standardizes onboarding across the entire company.'
            },
            results: {
                ar: 'تجهيز العقد في دقيقة واحدة بدل ساعتين. تقليل الأخطاء بنسبة 98%. تحسين onboarding بالكامل.',
                en: 'Contract creation 2 hours → 1 minute. 98% fewer errors. Smooth onboarding experience.'
            },
            useCases: {
                ar: [
                    'المدارس ومراكز التدريب',
                    'شركات التوصيل والشحن',
                    'العيادات الطبية (عقود الأطباء والموظفين)',
                    'مراكز الخدمات اللوجستية',
                    'أي جهة لديها onboarding مستمر'
                ],
                en: [
                    'Schools and training centers',
                    'Delivery and logistics companies',
                    'Medical clinics (doctor and staff contracts)',
                    'Service centers',
                    'Any organization with continuous onboarding'
                ]
            }
        },
        {
            id: 'sms-whatsapp-appointment-alerts',
            primarySector: { ar: 'العيادات والمراكز الطبية', en: 'Clinics و Medical Centers' },
            category: 'medical',
            title: {
                ar: 'تحويل رسائل SMS إلى تذكيرات واتساب للمواعيد',
                en: 'SMS to WhatsApp Appointment Reminder Automation'
            },
            shortClient: {
                ar: 'عيادة طبية متوسطة تتلقى مواعيد عبر رسائل SMS',
                en: 'Mid-size medical clinic receiving appointments via SMS'
            },
            challenge: {
                ar: 'نسبة عدم الحضور كانت عالية. SMS لا توفر تفاعل فعلي. عدم وجود نظام متابعة أو إشعارات.',
                en: 'High no-show rates, ineffective SMS reminders.'
            },
            solution: {
                ar: 'نظام يقرأ رسائل SMS الخاصة بالمواعيد، يستخرج المعلومات تلقائياً، يحفظها في Airtable، ويرسل تذكيرات WhatsApp ذكية للعميل. مثالي للعيادات والصيدليات والمراكز التي تحتاج نظام تذكير فعّال لتقليل عدم الحضور.',
                en: 'An automation system that reads incoming SMS appointment messages, parses the data, stores it in Airtable, and sends automated WhatsApp reminders. Designed for clinics, pharmacies, salons, and any business relying on scheduled appointments.'
            },
            results: {
                ar: 'تقليل عدم الحضور بنسبة 40–60%. تحسين رضا العملاء. إزالة الحاجة للتذكير اليدوي.',
                en: '40–60% reduction in no-shows. Higher customer satisfaction. Fully automated follow-up.'
            },
            useCases: {
                ar: [
                    'الصيدليات (استشارات صيدلانية)',
                    'صالونات التجميل (تذكيرات الحجز)',
                    'مراكز التدريب (تذكيرات الدورات)',
                    'شركات الصيانة (مواعيد الخدمة)',
                    'المكاتب الاستشارية'
                ],
                en: [
                    'Pharmacies (consultation reminders)',
                    'Beauty salons (booking reminders)',
                    'Training centers (course reminders)',
                    'Repair service companies',
                    'Consulting offices'
                ]
            }
        },
        {
            id: 'ai-job-email-organizer',
            primarySector: { ar: 'التوظيف والموارد البشرية', en: 'Recruitment و HR' },
            category: 'automation',
            title: {
                ar: 'تنظيم بريد الوظائف عبر الذكاء الاصطناعي وتنبيهات واتساب',
                en: 'AI Job Email Organizer with WhatsApp Alerts'
            },
            shortClient: {
                ar: 'وكالة توظيف تتلقى مئات الرسائل يوميًا من منصات التوظيف',
                en: 'Recruitment agency receiving hundreds of daily job-related emails'
            },
            challenge: {
                ar: 'البريد مزدحم وغير منظم. صعوبة اكتشاف الفرص المهمة. تأخر الردود بسبب الفحص اليدوي.',
                en: 'Chaotic email inboxes, slow filtering, missed opportunities.'
            },
            solution: {
                ar: 'نظام ذكي يقرأ البريد الوارد، يبحث عن رسائل الوظائف، يصنفها، ويُرسل تنبيهات WhatsApp فورية للفرص المهمة. يساعد الباحثين عن عمل، المستشارين، وشركات التوظيف في عدم تفويت أي فرصة.',
                en: 'An AI-powered workflow that filters job-related emails, extracts key details, and sends prioritized WhatsApp alerts. Ideal for recruiters, HR departments, consultants, and job seekers.'
            },
            results: {
                ar: 'تقليل ضياع الفرص بنسبة 90%. توفير ساعات من الفحص اليدوي. سرعة في الرد على الفرص.',
                en: '90% fewer missed opportunities. Hours saved weekly. Faster follow-ups.'
            },
            useCases: {
                ar: [
                    'مدراء الموارد البشرية (تصفية المرشحين)',
                    'المستشارون المهنيون',
                    'الباحثون عن عمل',
                    'مكاتب التوظيف الكبيرة',
                    'شركات Headhunting'
                ],
                en: [
                    'HR managers (candidate filtering)',
                    'Career consultants',
                    'Job seekers',
                    'Large recruitment offices',
                    'Headhunting firms'
                ]
            }
        }
    ];

    // ============ Initialize Portfolio ============
    document.addEventListener('DOMContentLoaded', () => {
        // Check saved language
        const savedLang = localStorage.getItem('language') || 'ar';
        currentLang = savedLang;

        // Render portfolio projects from data
        renderCaseStudies();

        // Setup filters
        setupFilters();

        // Setup modal
        setupModal();

        // Listen for language changes from main.js
        window.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.language;
            // Re-render portfolio with new language
            renderCaseStudies();
        });
    });

    // ============ Setup Filters ============
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
        const caseCards = document.querySelectorAll('.case-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get filter value
                const filter = btn.getAttribute('data-filter');
                
                // Filter portfolio projects
                filterCaseStudies(filter, caseCards);
            });
        });
    }

    // ============ Filter Portfolio Projects ============
    function filterCaseStudies(filter, cards) {
        cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show card with animation
                card.classList.remove('hidden');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s`;
                }, 10);
            } else {
                // Hide card
                card.classList.add('hidden');
            }
        });
    }

    // ============ Render Portfolio Projects ============
    function renderCaseStudies() {
        const grid = document.getElementById('portfolioGrid');
        if (!grid) return;

        grid.innerHTML = ''; // Clear existing content

        caseStudiesData.forEach(caseStudy => {
            const card = createCaseCard(caseStudy);
            grid.appendChild(card);
        });
    }

    // ============ Create Case Card ============
    function createCaseCard(caseData) {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.setAttribute('data-category', caseData.category);
        card.setAttribute('data-case-id', caseData.id);

        const title = currentLang === 'ar' ? caseData.title.ar : caseData.title.en;
        const client = currentLang === 'ar' ? caseData.shortClient.ar : caseData.shortClient.en;
        const sector = currentLang === 'ar' ? caseData.primarySector.ar : caseData.primarySector.en;
        const challenge = currentLang === 'ar' ? caseData.challenge.ar : caseData.challenge.en;
        const solution = currentLang === 'ar' ? caseData.solution.ar : caseData.solution.en;
        const results = currentLang === 'ar' ? caseData.results.ar : caseData.results.en;

        card.innerHTML = `
            <div class="case-badge" data-ar="${caseData.primarySector.ar}" data-en="${caseData.primarySector.en}">${sector}</div>
            <h3 class="case-title" data-ar="${caseData.title.ar}" data-en="${caseData.title.en}">${title}</h3>
            <p class="case-client" data-ar="${caseData.shortClient.ar}" data-en="${caseData.shortClient.en}">${client}</p>
            
            <div class="case-details">
                <div class="case-point">
                    <strong data-ar="التحدي:" data-en="Challenge:">${currentLang === 'ar' ? 'التحدي:' : 'Challenge:'}</strong>
                    <span>${challenge}</span>
                </div>
                <div class="case-point">
                    <strong data-ar="الحل:" data-en="Solution:">${currentLang === 'ar' ? 'الحل:' : 'Solution:'}</strong>
                    <span>${solution}</span>
                </div>
                <div class="case-point highlight">
                    <strong data-ar="النتائج:" data-en="Results:">${currentLang === 'ar' ? 'النتائج:' : 'Results:'}</strong>
                    <span>${results}</span>
                </div>
            </div>
            
            <button class="case-btn" data-ar="عرض تفاصيل المشروع" data-en="View Project Details">
                ${currentLang === 'ar' ? 'عرض تفاصيل المشروع' : 'View Project Details'}
            </button>
        `;

        return card;
    }

    // ============ Setup Modal ============
    function setupModal() {
        // Listen for button clicks via event delegation
        const grid = document.getElementById('portfolioGrid');
        if (!grid) return;

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.case-btn');
            if (!btn) return;

            e.preventDefault();
            const card = btn.closest('.case-card');
            const caseId = card.getAttribute('data-case-id');
            const caseData = caseStudiesData.find(c => c.id === caseId);

            if (caseData) {
                openModal(caseData);
            }
        });

        // Close modal on overlay click or close button (using event delegation)
        document.body.addEventListener('click', (e) => {
            const modal = document.getElementById('caseModal');
            if (!modal) return;
            
            // Close if clicking overlay or close button
            if (e.target === modal || e.target.closest('.modal-close')) {
                closeModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // ============ Open Modal ============
    function openModal(caseData) {
        let modal = document.getElementById('caseModal');
        
        // Create modal if it doesn't exist
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'caseModal';
            modal.className = 'case-modal';
            document.body.appendChild(modal);
        }

        const title = currentLang === 'ar' ? caseData.title.ar : caseData.title.en;
        const sector = currentLang === 'ar' ? caseData.primarySector.ar : caseData.primarySector.en;
        const client = currentLang === 'ar' ? caseData.shortClient.ar : caseData.shortClient.en;
        const challenge = currentLang === 'ar' ? caseData.challenge.ar : caseData.challenge.en;
        const solution = currentLang === 'ar' ? caseData.solution.ar : caseData.solution.en;
        const results = currentLang === 'ar' ? caseData.results.ar : caseData.results.en;
        const useCases = currentLang === 'ar' ? caseData.useCases.ar : caseData.useCases.en;

        const useCasesHTML = useCases.map(uc => `<li>${uc}</li>`).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close">&times;</button>
                
                <div class="modal-header">
                    <div class="modal-badge">${sector}</div>
                    <h2 class="modal-title">${title}</h2>
                    <p class="modal-client">${client}</p>
                </div>

                <div class="modal-body">
                    <div class="modal-section">
                        <h3 data-ar="التحدي" data-en="Challenge">${currentLang === 'ar' ? 'التحدي' : 'Challenge'}</h3>
                        <p>${challenge}</p>
                    </div>

                    <div class="modal-section">
                        <h3 data-ar="الحل" data-en="Solution">${currentLang === 'ar' ? 'الحل' : 'Solution'}</h3>
                        <p>${solution}</p>
                    </div>

                    <div class="modal-section highlight">
                        <h3 data-ar="النتائج" data-en="Results">${currentLang === 'ar' ? 'النتائج' : 'Results'}</h3>
                        <p>${results}</p>
                    </div>

                    <div class="modal-section">
                        <h3 data-ar="حالات استخدام إضافية" data-en="Additional Use Cases">${currentLang === 'ar' ? 'حالات استخدام إضافية' : 'Additional Use Cases'}</h3>
                        <p data-ar="هذا الحل يناسب أيضًا:" data-en="This solution also works well for:">${currentLang === 'ar' ? 'هذا الحل يناسب أيضًا:' : 'This solution also works well for:'}</p>
                        <ul class="use-cases-list">
                            ${useCasesHTML}
                        </ul>
                    </div>
                </div>

                <div class="modal-footer">
                    <a href="booking.html" class="btn btn-primary" data-ar="احجز استشارة مجانية" data-en="Book Free Consultation">
                        ${currentLang === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                    </a>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // ============ Close Modal ============
    function closeModal() {
        const modal = document.getElementById('caseModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    // ============ Smooth Scroll Animation ============
    // Add smooth reveal animation on scroll (optional enhancement)
    function observeCards() {
        const cards = document.querySelectorAll('.case-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Call on load if you want scroll animations
    // observeCards();

    // ============ Export for debugging (optional) ============
    window.portfolioDebug = {
        filterCaseStudies,
        currentLang: () => currentLang
    };

})();

// ============ Console Welcome Message ============
console.log('%c📂 Portfolio Page Loaded', 'font-size: 14px; font-weight: bold; color: #fca311;');
console.log('%c8 real portfolio projects loaded from Upwork', 'font-size: 12px; color: #274c77;');

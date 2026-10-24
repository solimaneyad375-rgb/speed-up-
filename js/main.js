/**
 * SpeedUp Portfolio - Core Interactive Engine
 * Handles Bilingual (AR/EN), Dark/Light Themes, Portfolio Filters, Modal Previews, and WhatsApp Generator.
 */

// 1. Project Database with Live Links & Details
const projectsData = [
  {
    id: "new-power-global",
    category: "corporate",
    name_ar: "نيو باور جلوبال | معدات وحلول طاقة",
    name_en: "New Power Global | Industrial Energy",
    summary_ar: "المنصة الرسمية الرائدة لحلول الطاقة والمناولة الصناعية، بطاريات الجر والشواحن، وصيانة وتأجير الكلاركات الكهربائية في مصر.",
    summary_en: "Leading corporate portal for industrial handling, traction batteries, chargers, and electric forklift rental in Egypt.",
    url: "https://www.new-power-global.com/",
    tags: ["Industrial", "Energy Systems", "B2B Portal", "Responsive"],
    img: "assets/images/projects/new_power.jpeg",
    icon: "fa-bolt",
    stats: "99.8% Uptime • High Speed",
    details_ar: "موقع تعريفي وتجاري متكامل تم تطويره ببرمجة نظيفة فائقة السرعة مع تحسين كامل لمحركات البحث ونظام عرض الكتالوجات والمواصفات الفنية للمعدات.",
    details_en: "A comprehensive industrial web platform built with ultra-fast clean code, advanced SEO, and technical catalog showcase."
  },
  {
    id: "nile-tex-plus",
    category: "corporate",
    name_ar: "نايل تكس بلس | مصنع الخزانات والأمان",
    name_en: "Nile Tex Plus | Tanks & Safety Barriers",
    summary_ar: "المصنع الرائد لتصنيع خزانات مياه البولي إيثيلين، خزانات الفايبر جلاس، أحواض الاستزراع وحواجز نيوجيرسي للأمان بضمان 10 سنوات.",
    summary_en: "Top manufacturer for polyethylene & fiberglass water tanks, aquaculture basins, and highway safety barriers.",
    url: "https://nile-tex-plus.com/",
    tags: ["Manufacturing", "Industrial Tanks", "Fast SEO", "Catalog"],
    img: "assets/images/projects/nile_tex_fav.png",
    icon: "fa-industry",
    stats: "Top 3 Google Rank • 10 Yr Warranty",
    details_ar: "بنية برمجية معززة بمحركات الفهرسة السريعة، نظام استعراض السعات من 500 حتى 30,000 لتر مع أزرار تواصل وطلبات تسعير فورية.",
    details_en: "Engineered for high search visibility, dynamic capacity filtering from 500L to 30,000L, and instant RFQ leads."
  },
  {
    id: "alsharif-tanks",
    category: "corporate",
    name_ar: "شركة الشريف لصناعة الخزانات",
    name_en: "Al Sharif Tanks Manufacturing",
    summary_ar: "بوابة متخصصة في تصنيع خزانات البولي إيثيلين الرأسية والأفقية وحواجز أمان الطرق بأعلى معايير الجودة المصرية.",
    summary_en: "Specialized corporate platform for vertical & horizontal polyethylene tanks and road safety solutions.",
    url: "https://alsharif-tanks.com/",
    tags: ["Polyethylene", "Road Safety", "Corporate", "Clean UI"],
    img: "assets/images/projects/almutahida.webp",
    icon: "fa-shield-halved",
    stats: "Premium Quality • High Conversion",
    details_ar: "تصميم متقن يركز على بناء الثقة واستعراض معايير الجودة والشهادات المعتمدة مع سرعة تحميل فورية لكافة المتصفحات والأجهزة.",
    details_en: "Tailored UI/UX emphasizing brand credibility, quality certifications, and lightning-fast mobile responsiveness."
  },
  {
    id: "nouryan-travel",
    category: "travel",
    name_ar: "نوريان ترافيل | سياحة وسفر وعمرة",
    name_en: "Nouryan Travel & Tourism",
    summary_ar: "بوابة سياحية راقية لخدمات برامج العمرة الفاخرة، حجز تذاكر الطيران، الفنادق والجولات السياحية المتكاملة محلياً ودولياً.",
    summary_en: "High-end travel and tourism portal for luxury Umrah packages, flight tickets, and worldwide holiday bookings.",
    url: "https://nouryan-travel.com/",
    tags: ["Travel & Tourism", "Umrah Booking", "International", "Dynamic UI"],
    img: "assets/images/projects/nouryan.jpg",
    icon: "fa-plane-departure",
    stats: "Global Reach • Interactive Booking",
    details_ar: "واجهة مستخدم بصرية آسرة تأخذ المسافر في جولة رقمية سلسة، مع نماذج حجز تفاعلية ودمج كامل مع خطط الدعم والواتساب.",
    details_en: "Captivating visual UI providing smooth traveler journeys, interactive package booking, and direct instant support."
  },
  {
    id: "moca-cafe",
    category: "fnb",
    name_ar: "موكا كافيه | لاونج وقهوة مختصة",
    name_en: "Mocha Cafe & Lounge Experience",
    summary_ar: "تجربة رقمية فريدة ولاونج عصري يستعرض قائمة القهوة المختصة، المشروبات الساخنة والباردة، والحلويات وأجواء اللاونج الفاخرة.",
    summary_en: "A modern, vibrant digital cafe and lounge experience showcasing artisan coffee, curated menus, and table reservations.",
    url: "https://medowaled.github.io/moca/",
    tags: ["Hospitality", "Cafe & Lounge", "Interactive Menu", "Visual Aesthetic"],
    img: "assets/images/projects/moca.jpg",
    icon: "fa-mug-hot",
    stats: "Interactive Menu • Table Booking",
    details_ar: "موقع ويب مصمم بأسلوب عصري يبرز روح الضيافة والمذاق الرفيع، مع فلترة وتصفح تفاعلي للمنيو وتجربة مستخدم لا تُنسى.",
    details_en: "Modern visual aesthetic celebrating premium cafe hospitality, interactive menu filtering, and smooth reservation flow."
  },
  {
    id: "lisbon-club",
    category: "software",
    name_ar: "نظام إدارة نادي لشبونة الرياضي",
    name_en: "Lisbon Sports Club Management SaaS",
    summary_ar: "نظام ويب سحابي وإداري متكامل لإدارة اللاعبين، الكباتن والمدربين، الاشتراكات، الحضور، ومتابعة الشؤون المالية للنادي.",
    summary_en: "Full-scale custom SaaS web application for sports club administration, player memberships, coaching staff, and finance tracking.",
    url: "https://www.lisbon-club.com/",
    tags: ["Custom SaaS", "Web Application", "ERP & Finance", "Full Stack"],
    img: "assets/images/projects/lisbon.jpeg",
    icon: "fa-cubes",
    stats: "Full Cloud SaaS • Role-based Security",
    details_ar: "تطبيق ويب متقدم يمثل ذروة الحلول البرمجية (Fast Code) بأداء قوي، حماية عالية للبيانات، ولوحات تحكم تفاعلية لإدارة المنظومة الرياضية.",
    details_en: "Enterprise SaaS software solution built with fast clean code, robust data protection, and responsive dashboards."
  },
  {
    id: "almutahida-puls",
    category: "corporate",
    name_ar: "المتحدة بلس للخزانات والأكشاك",
    name_en: "Al Mutahida Plus Industrial",
    summary_ar: "المصنع المعتمد لخزانات الفايبر جلاس، حواجز نيوجيرسي، وأكشاك الحراسة المعزولة لكبرى المشروعات الإنشائية بمصر.",
    summary_en: "Certified industrial manufacturer for fiberglass tanks, safety barriers, and prefabricated cabins in Egypt.",
    url: "https://almutahida-puls.com/",
    tags: ["Fiberglass", "B2B Contracts", "Industrial Supply", "SEO Engine"],
    img: "assets/images/projects/almutahida.webp",
    icon: "fa-helmet-safety",
    stats: "10-Year Warranty • B2B Lead Engine",
    details_ar: "منصة B2B متخصصة صُممت لاقتناص عملاء المشروعات والمقاولين الكبار، مع استعراض كامل للكتالوجات والشهادات والضمانات.",
    details_en: "High-conversion B2B platform designed for enterprise contractors, technical specifications, and direct quotations."
  },
  {
    id: "best-tours-benha",
    category: "travel",
    name_ar: "بست تورز بنها | رحلات عمرة وتأشيرات",
    name_en: "Best Tours Benha | Travel & Visas",
    summary_ar: "بوابتك الأولى لرحلات الحج والعمرة الفاخرة، استخراج كافة التأشيرات والفيزا، وحجز تذاكر الطيران والفنادق العالمية.",
    summary_en: "Premier travel agency portal in Benha for luxury Umrah tours, international visa processing, and airline ticketing.",
    url: "https://medowaled.github.io/best-tours-benha/",
    tags: ["Travel Agency", "Visa Services", "Pilgrimage", "Local SEO"],
    img: "assets/images/projects/best_tours.png",
    icon: "fa-kaaba",
    stats: "#1 Local SEO • Instant Inquiries",
    details_ar: "تصدرت نتائج البحث المحلية بفضل الهندسة البرمجية الدقيقة وتجربة المستخدم السريعة التي تتيح للعملاء إرسال طلبات التأشيرات والحجز في ثوانٍ.",
    details_en: "Dominating local search results with precision SEO, high-speed mobile UX, and streamlined visa inquiry forms."
  },
  {
    id: "fayrouz-steel",
    category: "corporate",
    name_ar: "الفايروز استيل | تجهيزات المطابخ والستانلس",
    name_en: "Al Fayrouz Steel Engineering",
    summary_ar: "ريادة تصنيع وتوريد تجهيزات مطابخ المطاعم والفنادق والسلالم والدرابزينات المعمارية من خامات الستانلس ستيل 304 و 316.",
    summary_en: "Pioneering manufacturing of commercial kitchen equipment, hotels, and stainless steel architectural handrails.",
    url: "https://eslam123321.github.io/Fayrouz",
    tags: ["Architecture", "Stainless Steel", "Hotel Equipment", "Engineering"],
    img: "assets/images/projects/alfayrouz.webp",
    icon: "fa-utensils",
    stats: "Bilingual Ready • Pure Performance",
    details_ar: "معمارية برمجية متطورة بمحرك ثنائي اللغة فوري (Zero Flash) ومعرض بصري هندسي فائق الأناقة يعكس الحرفية العالية للمصنع.",
    details_en: "Cutting-edge bilingual web architecture with zero flash of language and engineering-grade visual showcase."
  },
  {
    id: "alsherif-alt",
    category: "corporate",
    name_ar: "الشريف للأمان والبلاستيك الصناعي",
    name_en: "Al Sharif Industrial Safety",
    summary_ar: "حلول الأمان للطرق السريعة، الحواجز المرورية وأكشاك الفايبر جلاس المصممة لتحمل أقصى درجات الطقس والضغط.",
    summary_en: "Highway safety solutions, road barriers, and prefabricated weather-proof cabins engineered for durability.",
    url: "https://view96.github.io/alsherif/",
    tags: ["Safety Barriers", "Industrial Identity", "Fast Code", "Clean Design"],
    img: "assets/images/projects/almutahida.webp",
    icon: "fa-road",
    stats: "100% Mobile Ready • Clean Code",
    details_ar: "منصة رقمية رشيقة مبنية وفق كود سبيد اب فائق السرعة، مصممة لعرض المنتجات بسرعة قياسية وتفاعل فوري مع العملاء.",
    details_en: "Agile digital presence engineered with SpeedUp fast code, delivering rapid product discovery and lead capture."
  }
];

// 2. Bilingual Text Translations Dictionary
const translations = {
  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_work: "أعمالنا",
    nav_marketing: "سوشيال ميديا",
    nav_team: "فريق العمل",
    nav_estimator: "حاسبة المشاريع",
    nav_contact: "تواصل معنا",
    btn_talk: "ابدأ مشروعك",
    
    hero_badge: "شركة رائدة في الحلول البرمجية والتسويق الرقمي",
    hero_title_1: "نُسرّع نمو أعمالك بأحدث",
    hero_title_2: "الحلول البرمجية والتسويقية",
    hero_desc: "في سبيد اب (SpeedUp)، نجمع بين البرمجة فائقة السرعة والنظيفة (Fast Code) وقوة استراتيجيات التسويق الرقمي لنصنع لعلامتك التجارية نمواً حقيقياً ومتسارعاً (Fast Growth).",
    btn_start_proj: "ابدأ مشروعك الآن",
    btn_explore_work: "استكشف أعمالنا",
    hero_scroll_down: "مرر للأسفل",
    
    stat_clients_num: "15+",
    stat_clients_label: "عملاء وشركاء نجاح",
    stat_systems_num: "10+",
    stat_systems_label: "مشاريع ومنصات حية أونلاين",
    stat_satisfaction_num: "99%",
    stat_satisfaction_label: "نسبة رضا والتزام بالجودة",
    stat_growth_num: "3.5x",
    stat_growth_label: "متوسط مضاعفة عوائد الحملات",
    
    float_card_1_title: "حلول برمجية وأنظمة ذكية",
    float_card_1_sub: "كود نظيف وأداء فائق السرعة",
    float_card_2_title: "تسويق ونمو رقمي متسارع",
    float_card_2_sub: "استهداف دقيق وعوائد مضاعفة",
    float_card_3_title: "هوية بصرية وإبداع متكامل",
    float_card_3_sub: "تصاميم تترك أثراً دائماً",
    float_card_4_title: "أحدث مشاريعنا الحية",
    float_card_4_sub: "نظام نادي لشبونة الرياضي SaaS",

    marquee_label: "التقنيات ومنصات النمو",

    sec_services_tag: "ماذا نقدم لعلامتك التجارية؟",
    sec_services_title: "خدمات شاملة تدفعك إلى القمة",
    sec_services_sub: "حلول تقنية وتسويقية متكاملة تحت سقف واحد، صُممت خصيصاً لمساعدة الشركات على الهيمنة في سوقها.",

    serv_1_title: "تطوير المواقع والمنصات",
    serv_1_desc: "مواقع إلكترونية سريعة وجذابة للشركات والمصانع ومتاجر البيع، متوافقة 100% مع الهواتف الذكية وبأعلى معايير SEO.",
    serv_1_f1: "صفحات تعريفية عالية التحويل (High-Converting)",
    serv_1_f2: "بوابات شركات وكتالوجات منتجات تفاعلية",
    serv_1_f3: "سرعة تحميل أقل من ثانية وتوافق مع كافة الشاشات",

    serv_2_title: "الأنظمة الإدارية وتطبيقات السحاب",
    serv_2_desc: "أنظمة ويب برمجية متقدمة (ERP / SaaS) مخصصة لإدارة الشركات والأندية الرياضية والاشتراكات والماليات (مثل نظام نادي لشبونة).",
    serv_2_f1: "لوحات تحكم ديناميكية وإدارة صلاحيات دقيقة",
    serv_2_f2: "إدارة الاشتراكات، الحضور، والمصروفات والماليات",
    serv_2_f3: "أمان وحماية بيانات على أعلى مستوى سحابي",

    serv_3_title: "التسويق الرقمي وإدارة الحملات",
    serv_3_desc: "إطلاق وإدارة حملات إعلانية ممولة عبر فيسبوك، انستجرام، تيك توك وجوجل، موجهة لتحقيق أعلى عائد استثماري (ROAS) وجلب عملاء حقيقيين.",
    serv_3_f1: "استهداف دقيق وتقسيم الجماهير المهتمة",
    serv_3_f2: "إدارة ميزانيات إعلانية ذكية لتقليل تكلفة العميل",
    serv_3_f3: "تقارير وتحليلات أسبوعية واضحة للنتائج والمبيعات",

    serv_4_title: "إدارة السوشيال ميديا والمحتوى",
    serv_4_desc: "بناء حضور رقمي قوي من خلال خطط محتوى تسويقية إبداعية، وتصاميم سوشيال ميديا متميزة، ومونتاج فيديوهات وريلز احترافية تجذب المتابعين.",
    serv_4_f1: "خطط نشر شهرية متناسقة ومدروسة",
    serv_4_f2: "تصاميم سوشيال ميديا وبوستات تجذب الانتباه",
    serv_4_f3: "صناعة محتوى الفيديو القصير (Reels & TikTok)",

    serv_5_title: "تصميم الهوية البصرية والبراندنج",
    serv_5_desc: "صياغة وتصميم شعارات احترافية وكروت عمل ومطبوعات وهوية بصرية كاملة ترسخ اسم علامتك في أذهان عملائك وتمنحك مكانة رائدة.",
    serv_5_f1: "تصميم لوجو فريد يعبر عن رسالة وقيم الشركة",
    serv_5_f2: "بطاقات الأعمال (Business Cards) وبروفايلات الشركات",
    serv_5_f3: "دليل إرشادي متكامل للألوان والخطوط (Brand Book)",

    serv_6_title: "تحسين محركات البحث وسرعة المواقع",
    serv_6_desc: "تطبيق استراتيجيات SEO المتقدمة وتجهيز الموقع ليتصدر نتائج البحث الأولى في جوجل، مع تسريع الأداء للوصول لأعلى علامات Google PageSpeed.",
    serv_6_f1: "تهيئة محركات البحث الفنية والمحتوى الموجه",
    serv_6_f2: "كود نظيف ومضغوط بسرعة تحميل فورية",
    serv_6_f3: "ربط أدوات التحليل Google Analytics & Search Console",

    sec_portfolio_tag: "سجل الإنجازات والمشاريع الحية",
    sec_portfolio_title: "أعمال نفخر بتنفيذها بنجاح",
    sec_portfolio_sub: "تصفح باقة من المواقع والمنصات الحقيقية التي صممناها وبرمجناها لعملائنا في مختلف القطاعات.",

    filter_all: "الكل (10 مشاريع)",
    filter_software: "أنظمة وبرمجيات سحابية",
    filter_corporate: "مواقع شركات ومصانع",
    filter_travel: "سياحة وسفر وحج وعمرة",
    filter_fnb: "كافيهات ومطاعم",

    sec_marketing_tag: "معرض السوشيال ميديا وحملات النمو",
    sec_marketing_title: "حملات تسويقية وتصاميم تُحدث فارقاً",
    sec_marketing_sub: "استراتيجيات إعلانية مدروسة وصناعة محتوى إبداعي يربط جمهورك بعلامتك ويضاعف المبيعات.",

    drive_badge: "معرض الملفات والتصميمات الرسمية",
    drive_title: "تصفح معرض تصميمات وحملات السوشيال ميديا على Google Drive",
    drive_desc: "جمعنا لك أرشيفاً يضم نماذج الحملات الإعلانية، تصميمات السوشيال ميديا، الفيديوهات والريلز، وهوية العلامات التجارية التي قمنا بإدارتها وتنميتها عبر منصات التواصل.",
    btn_open_drive: "فتح معرض Google Drive",
    drive_status_ready: "رابط الدرايف جاهز للاستعراض والتحديث الفوري",

    mkt_card1_tag: "حملات إعلانية ونمو رقمي",
    mkt_card1_title: "مضاعفة المبيعات والاستحواذ الإعلاني",
    mkt_card1_desc: "استراتيجيات ميديا بايينج ذكية خفضت تكلفة اكتساب العميل وحققت قفزة استثنائية في عوائد الحملات الإعلانية الممولة.",
    mkt_card1_stat1: "عائد الإنفاق الإعلاني (ROAS)",
    mkt_card1_stat2: "معدل التحويل (CR)",

    mkt_card2_tag: "هوية بصرية وتصاميم سوشيال",
    mkt_card2_title: "تصميم هوية بصرية ومحتوى تفاعلي",
    mkt_card2_desc: "بناء علامات تجارية راسخة عبر تصاميم سوشيال ميديا مبتكرة وهوية متناسقة في كافة نقاط التواصل الرقمية.",
    mkt_card2_stat1: "هوية بصرية حصرية",
    mkt_card2_stat2: "معدل التفاعل والمتابعة",

    sec_testimonials_tag: "شهادات شركاء النجاح",
    sec_testimonials_title: "ماذا يقول عملاؤنا عن SpeedUp؟",
    sec_testimonials_sub: "ثقة عملائنا هي أعظم إنجازاتنا. إليك تجارب حقيقية لقادة الأعمال والشركات الذين رافقناهم في رحلة النمو.",
    testi_1_quote: "نظام نادي لشبونة السحابي الذي طوره فريق سبيد اب نقل إدارة النادي، العضويات، ومتابعة اشتراكات اللاعبين والماليات لمستوى احترافي عالي جداً. السرعة والدقة البرمجية ممتازة.",
    testi_1_name: "إدارة نادي لشبونة الرياضي",
    testi_1_role: "نظام إدارة النادي الرياضي (lisbon-club.com)",
    testi_2_quote: "منصة نيو باور جلوبال للمعدات الصناعية حققت لنا مصداقية كبيرة أمام كبرى المصانع وترتيباً قوياً في محركات البحث. المهندسون أحمد وليد وإسلام سعد نموذج للالتزام والاحتراف.",
    testi_2_name: "إدارة نيو باور جلوبال",
    testi_2_role: "حلول الطاقة والمناولة (new-power-global.com)",
    testi_3_quote: "تصميم موقع نوريان ترافيل مع حملات السوشيال ميديا وربط استفسارات الحجز بواتساب مباشرة ضاعف طلبات برامج العمرة والرحلات لمستويات قياسية. استثمار ناجح 100%.",
    testi_3_name: "نوريان ترافيل للسياحة",
    testi_3_role: "رحلات العمرة والسياحة (nouryan-travel.com)",

    sec_team_tag: "القيادة والإدارة",
    sec_team_title: "فريق الإدارة والمهندسون القائمون على SpeedUp",
    sec_team_sub: "خبرات هندسية وتسويقية متكاملة تقود مشاريعك نحو النجاح بأعلى درجات الالتزام والدقة.",

    manager_1_role: "الإدارة والتطوير البرمجي (Management & Tech)",
    manager_1_name: "م / أحمد وليد (Eng. Ahmed Waled)",
    manager_2_role: "الإدارة والعمليات والتسويق (Management & Operations)",
    manager_2_name: "م / إسلام سعد (Eng. Eslam Saad)",
    btn_whatsapp: "مراسلة واتساب",
    btn_call: "اتصال مباشر",

    card_badge: "بطاقة العمل الرسمية",
    card_showcase_title: "الهوية الرسمية وبطاقة الأعمال",
    card_showcase_desc: "يمكنك الاعتماد علينا كشريكك الرقمي الموثوق. تواصل مع مدرائنا مباشرة أو قم بزيارة مقرنا الرئيسي لمناقشة كافة متطلبات مشروعك القادم.",
    card_loc_label: "المقر الرئيسي:",
    card_loc_val: "قليوب المحطة - برج اسملك السلطان - الدور الخامس، محافظة القليوبية، مصر.",
    card_slogan_label: "شعارنا:",
    card_slogan_val: "Fast Code. Fast Growth.",
    card_spec_label: "مجال التخصص:",
    card_spec_val: "Software Solutions & Digital Marketing & Social Media",

    sec_estimator_tag: "حاسبة وتقدير المشاريع الفورية",
    sec_estimator_title: "احسب خطة ووقت مشروعك بدقة",
    sec_estimator_sub: "حدد نوع مشروعك وحجم متطلباتك لنقدم لك تقديراً مبدئياً للجدول الزمني وحزمة العمل المثالية، مع إمكانية بدء التنفيذ فوراً.",
    est_step1_label: "ما هو نوع المشروع الذي تريده؟",
    est_opt_web: "موقع ويب تعريفي أو منصة",
    est_opt_saas: "نظام إداري سحابي (ERP / SaaS)",
    est_opt_mkt: "حملات تسويق رقمي وميديا بايينج",
    est_opt_full: "باقة متكاملة (برمجة + تسويق)",
    est_step2_label: "ما هو حجم ونطاق العمل المطلوب؟",
    est_scale_starter: "انطلاقة سريعة (Fast-Launch)",
    est_scale_growth: "نمو متقدم وتوسع (Growth Scale)",
    est_scale_enterprise: "حلول مؤسسية متكاملة (Enterprise)",
    est_res_badge: "تقدير مبدئي ذكي",
    est_time_label: "المدة التقديرية للإطلاق:",
    est_features_label: "أبرز المميزات المشمولة:",
    btn_forward_estimate: "إرسال هذه المواصفات وحجز موعد عبر واتساب",

    sec_contact_tag: "تواصل معنا اليوم",
    sec_contact_title: "هل أنت مستعد لنقل عملك إلى المستوى التالي؟",
    sec_contact_sub: "دعنا نناقش فكرتك أو مشروعك ونقدم لك الخطة البرمجية والتسويقية الأنسب لتحقيق أهدافك.",

    contact_hq_title: "العنوان والمقر",
    contact_hq_val: "قليوب المحطة - برج اسملك السلطان - الدور الخامس",
    contact_hq_sub: "محافظة القليوبية، جمهورية مصر العربية",
    contact_phones_title: "أرقام التواصل المباشرة",
    contact_eng_ahmed: "م / أحمد وليد",
    contact_eng_eslam: "م / إسلام سعد",
    contact_support_title: "خدمة العملاء والواتساب",
    contact_support_val: "متاحون على مدار الساعة للرد على استفساراتكم",
    contact_support_sub: "دعم فني واستشارات تقنية وتسويقية مجانية",

    form_name_label: "الاسم الكريم",
    form_name_ph: "اكتب اسمك الكامل أو اسم شركتك",
    form_phone_label: "رقم الهاتف / الواتساب",
    form_phone_ph: "مثال: 01012345678",
    form_service_label: "الخدمة المطلوبة",
    form_service_opt1: "تطوير موقع ويب أو منصة إلكترونية",
    form_service_opt2: "تطوير نظام إداري سحابي مخصص (ERP / SaaS)",
    form_service_opt3: "حملات تسويق رقمي وإعلانات ممولة",
    form_service_opt4: "إدارة صفحات السوشيال ميديا وصناعة المحتوى",
    form_service_opt5: "تصميم هوية بصرية وبراندنج كامل",
    form_service_opt6: "باقة متكاملة (برمجة + تسويق)",
    form_manager_label: "المهندس المراد التواصل معه",
    form_manager_opt1: "م / أحمد وليد (01099444012)",
    form_manager_opt2: "م / إسلام سعد (01095412229)",
    form_msg_label: "تفاصيل المشروع",
    form_msg_ph: "أخبرنا باختصار عن أهدافك والمميزات التي تتطلع إليها...",
    btn_submit_direct: "إرسال الطلب عبر واتساب مباشرة",

    footer_brand_desc: "شركة رائدة متخصصة في تطوير البرمجيات وحلول الويب السحابية، والتسويق الرقمي وإدارة السوشيال ميديا. نصنع لعلامتك التجارية حضوراً يفوق المنافسين.",
    footer_col_links: "روابط سريعة",
    footer_col_projects: "أبرز مشاريعنا",
    footer_col_hq: "المقر والتواصل",
    footer_eng_ahmed: "م / أحمد وليد: 01099444012",
    footer_eng_eslam: "م / إسلام سعد: 01095412229",
    footer_spec_val: "Software Solutions & Digital Marketing & Social Media",
    footer_rights: "جميع الحقوق محفوظة © SpeedUp Solutions. Fast Code. Fast Growth."
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_work: "Portfolio",
    nav_marketing: "Social Media",
    nav_team: "Leadership",
    nav_estimator: "Estimator",
    nav_contact: "Contact",
    btn_talk: "Start Project",

    hero_badge: "Leading Software Solutions & Digital Marketing Agency",
    hero_title_1: "Accelerate Your Business With",
    hero_title_2: "Next-Gen Code & Marketing",
    hero_desc: "At SpeedUp, we fuse ultra-fast, robust programming (Fast Code) with high-ROI digital marketing strategies to drive explosive, measurable expansion (Fast Growth).",
    btn_start_proj: "Start Your Project",
    btn_explore_work: "Explore Portfolio",
    hero_scroll_down: "Scroll Down",

    stat_clients_num: "15+",
    stat_clients_label: "Trusted Partners & Clients",
    stat_systems_num: "10+",
    stat_systems_label: "Live Deployed Web Platforms",
    stat_satisfaction_num: "99%",
    stat_satisfaction_label: "Quality & Delivery Commitment",
    stat_growth_num: "3.5x",
    stat_growth_label: "Average Campaign Growth & ROI",

    float_card_1_title: "Smart Software Solutions",
    float_card_1_sub: "Clean Code & Fast Architecture",
    float_card_2_title: "Digital Growth & Paid Ads",
    float_card_2_sub: "Laser Targeting & High ROI",
    float_card_3_title: "Visual Brand Identity",
    float_card_3_sub: "Memorable Creative Design",
    float_card_4_title: "Latest Live Deployment",
    float_card_4_sub: "Lisbon Sports Club SaaS",

    marquee_label: "Tech Stack & Growth",

    sec_services_tag: "What We Deliver",
    sec_services_title: "Comprehensive Services to Scale Your Brand",
    sec_services_sub: "All-in-one software engineering and digital marketing solutions engineered to help businesses conquer their markets.",

    serv_1_title: "Web & Portal Development",
    serv_1_desc: "High-speed corporate websites, factory portals, and commercial stores optimized for sub-second loads and top SEO.",
    serv_1_f1: "High-converting corporate landing pages",
    serv_1_f2: "Interactive product catalogs & technical specs",
    serv_1_f3: "Sub-second speed & responsive on all viewports",

    serv_2_title: "Custom SaaS & Management Systems",
    serv_2_desc: "Custom cloud software (ERP / SaaS) for enterprises, sports clubs, memberships, and automated finance tracking.",
    serv_2_f1: "Dynamic dashboards & granular RBAC permissions",
    serv_2_f2: "Subscriptions, attendance, revenues, and billing",
    serv_2_f3: "Enterprise-grade cloud data security & encryption",

    serv_3_title: "Performance Marketing & Media Buying",
    serv_3_desc: "Targeted paid advertising on Meta, TikTok, and Google Ads engineered to maximize ROAS and scale qualified inquiries.",
    serv_3_f1: "Laser-targeted audience segmentation & lookalikes",
    serv_3_f2: "Smart budget bidding minimizing customer acquisition cost",
    serv_3_f3: "Weekly transparent performance & conversion reports",

    serv_4_title: "Social Media Management & Content",
    serv_4_desc: "Authoritative digital presence through strategic content planning, thumb-stopping visuals, and viral video reels.",
    serv_4_f1: "Consistent, data-backed monthly editorial calendars",
    serv_4_f2: "High-impact social media creatives and carousels",
    serv_4_f3: "Short-form video production (Reels & TikToks)",

    serv_5_title: "Brand Identity & Corporate Design",
    serv_5_desc: "Crafting memorable logos, business cards, corporate profiles, and brand guidelines that establish market leadership.",
    serv_5_f1: "Distinctive logo design expressing core brand values",
    serv_5_f2: "Executive business cards and corporate brochures",
    serv_5_f3: "Comprehensive brand style guide (colors & typography)",

    serv_6_title: "SEO & Speed Optimization",
    serv_6_desc: "Advanced search engine optimization and code speed tuning to dominate Google rankings with 95+ PageSpeed scores.",
    serv_6_f1: "Technical on-page & off-page SEO optimization",
    serv_6_f2: "Clean, minified code delivering instant page loads",
    serv_6_f3: "Google Analytics 4 & Search Console configuration",

    sec_portfolio_tag: "Verified Client Deployments",
    sec_portfolio_title: "Featured Works & Live Platforms",
    sec_portfolio_sub: "Explore a curated showcase of real-world websites and web applications designed and developed for market leaders.",

    filter_all: "All (10 Projects)",
    filter_software: "Cloud SaaS & Systems",
    filter_corporate: "Corporate & Industrial",
    filter_travel: "Travel, Umrah & Tourism",
    filter_fnb: "Cafes & Dining",

    sec_marketing_tag: "Social Media & Growth Campaigns",
    sec_marketing_title: "Creative Campaigns That Deliver Results",
    sec_marketing_sub: "Data-driven media buying and scroll-stopping creative content that connects audience to conversion.",

    drive_badge: "Official Showcase Archive",
    drive_title: "Explore Social Media Designs & Ad Creatives on Google Drive",
    drive_desc: "We have organized a full archive featuring live social media campaign assets, branding designs, high-converting video reels, and identity packages managed by SpeedUp.",
    btn_open_drive: "Open Google Drive Gallery",
    drive_status_ready: "Google Drive portfolio link ready for instant review and updates",

    mkt_card1_tag: "Paid Ads & Growth",
    mkt_card1_title: "Scaling Sales & Direct Acquisition",
    mkt_card1_desc: "Intelligent media buying strategies cutting customer acquisition cost while driving explosive ROAS returns.",
    mkt_card1_stat1: "Return On Ad Spend (ROAS)",
    mkt_card1_stat2: "Conversion Rate (CR)",

    mkt_card2_tag: "Brand Identity & Social Content",
    mkt_card2_title: "Visual Identity & Social Engagement",
    mkt_card2_desc: "Building unforgettable brands through tailored social media design language across all digital touchpoints.",
    mkt_card2_stat1: "Bespoke Brand Identity",
    mkt_card2_stat2: "Social Engagement Multiplier",

    sec_testimonials_tag: "Client Testimonials",
    sec_testimonials_title: "What Our Partners Say About SpeedUp",
    sec_testimonials_sub: "Client trust is our greatest milestone. Here is direct feedback from business leaders we have scaled.",
    testi_1_quote: "The Lisbon Club SaaS platform engineered by SpeedUp elevated our membership administration, player subscriptions, and finance tracking to enterprise standards.",
    testi_1_name: "Lisbon Sports Club Management",
    testi_1_role: "Sports Club Management SaaS (lisbon-club.com)",
    testi_2_quote: "New Power Global's corporate industrial portal gave us authoritative credibility with factories and commanding Google search rankings.",
    testi_2_name: "New Power Global Management",
    testi_2_role: "Energy & Handling Solutions (new-power-global.com)",
    testi_3_quote: "Nouryan Travel's portal combined with social ads and direct WhatsApp inquiries tripled our seasonal Umrah bookings.",
    testi_3_name: "Nouryan Travel & Tourism",
    testi_3_role: "Luxury Umrah & Tourism (nouryan-travel.com)",

    sec_team_tag: "Leadership & Management",
    sec_team_title: "Meet The Founders & Leadership Behind SpeedUp",
    sec_team_sub: "Combined software engineering and digital marketing expertise dedicated to delivering excellence.",

    manager_1_role: "Management & Tech Direction",
    manager_1_name: "Eng / Ahmed Waled",
    manager_2_role: "Management & Operations / Marketing",
    manager_2_name: "Eng / Eslam Saad",
    btn_whatsapp: "WhatsApp Chat",
    btn_call: "Direct Call",

    card_badge: "Official Business Card",
    card_showcase_title: "Official Brand & Business Card",
    card_showcase_desc: "Count on us as your agile digital partner. Contact our directors directly or visit our headquarters to discuss your upcoming project requirements.",
    card_loc_label: "Headquarters:",
    card_loc_val: "Qalyub Station - Asmalak El Sultan Tower - 5th Floor, Qalyubia, Egypt.",
    card_slogan_label: "Motto:",
    card_slogan_val: "Fast Code. Fast Growth.",
    card_spec_label: "Specialization:",
    card_spec_val: "Software Solutions & Digital Marketing & Social Media",

    sec_estimator_tag: "Instant Project Estimator",
    sec_estimator_title: "Estimate Your Project Scope & Timeline",
    sec_estimator_sub: "Select your project type and scale to get an instant scope estimate and launch trajectory.",
    est_step1_label: "What type of project are you building?",
    est_opt_web: "Corporate Portal or Website",
    est_opt_saas: "Custom SaaS / ERP Web Application",
    est_opt_mkt: "Performance Marketing & Media Buying",
    est_opt_full: "Full Suite (Development + Growth)",
    est_step2_label: "What is the expected scope and scale?",
    est_scale_starter: "Fast-Launch (MVP / Starter)",
    est_scale_growth: "Growth Scale (Advanced)",
    est_scale_enterprise: "Enterprise Custom Architecture",
    est_res_badge: "Smart Scope Estimate",
    est_time_label: "Estimated Time to Launch:",
    est_features_label: "Key Inclusions:",
    btn_forward_estimate: "Send Specification & Book Onboarding via WhatsApp",

    sec_contact_tag: "Get In Touch",
    sec_contact_title: "Ready to Scale Your Brand to New Heights?",
    sec_contact_sub: "Let us discuss your concept and map out the ideal software and marketing trajectory tailored to your goals.",

    contact_hq_title: "Headquarters",
    contact_hq_val: "Qalyub Station - Asmalak El Sultan Tower - 5th Floor",
    contact_hq_sub: "Qalyubia Governorate, Egypt",
    contact_phones_title: "Direct Contact Lines",
    contact_eng_ahmed: "Eng / Ahmed Waled",
    contact_eng_eslam: "Eng / Eslam Saad",
    contact_support_title: "Customer Support & WhatsApp",
    contact_support_val: "Available 24/7 for support and consultations",
    contact_support_sub: "Free technical & digital marketing consultations",

    form_name_label: "Your Name / Organization",
    form_name_ph: "Enter your full name or company name",
    form_phone_label: "Phone / WhatsApp Number",
    form_phone_ph: "e.g. +20 101 234 5678",
    form_service_label: "Required Service",
    form_service_opt1: "Web Platform or Portal Development",
    form_service_opt2: "Custom SaaS / ERP Web Application",
    form_service_opt3: "Digital Marketing & Paid Ad Campaigns",
    form_service_opt4: "Social Media Management & Content",
    form_service_opt5: "Brand Identity & Corporate Graphics",
    form_service_opt6: "Complete Suite (Software + Marketing)",
    form_manager_label: "Director to Reach Out To",
    form_manager_opt1: "Eng / Ahmed Waled (01099444012)",
    form_manager_opt2: "Eng / Eslam Saad (01095412229)",
    form_msg_label: "Project Details",
    form_msg_ph: "Tell us briefly about your goals, features, or timeline...",
    btn_submit_direct: "Send Inquiry via Direct WhatsApp",

    footer_brand_desc: "Leading software solutions & cloud web applications, digital marketing and social media management agency accelerating brand growth.",
    footer_col_links: "Quick Links",
    footer_col_projects: "Featured Deployments",
    footer_col_hq: "Headquarters & Contact",
    footer_eng_ahmed: "Eng / Ahmed Waled: +20 109 944 4012",
    footer_eng_eslam: "Eng / Eslam Saad: +20 109 541 2229",
    footer_spec_val: "Software Solutions & Digital Marketing & Social Media",
    footer_rights: "All Rights Reserved © SpeedUp Solutions. Fast Code. Fast Growth."
  }
};

// 3. Application State
let currentLang = localStorage.getItem("speedup_lang") || "ar";
let currentTheme = localStorage.getItem("speedup_theme") || "light";
let currentDriveUrl = "https://drive.google.com/drive/folders/1Uw-7PwshjX3lRJRLxQBlDBG2ASu-DRkG?usp=drive_link";

// 4. Initialize On DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  highlightActiveNav();
  renderProjects("all");
  setupEventListeners();
  setupScrollEffects();
  setupCard3DEffect();
  setupRobot3DVisual();
  setupProjectEstimator();
});

// Theme Management
function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.innerHTML = currentTheme === "dark" 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("speedup_theme", currentTheme);
  initTheme();
}

// Language Management
function initLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-en", currentLang === "en");
  
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.innerHTML = currentLang === "ar" 
      ? '<i class="fa-solid fa-globe"></i> English' 
      : '<i class="fa-solid fa-globe"></i> العربية';
  }

  // Update all elements with data-i18n
  const dict = translations[currentLang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // Re-render project cards with appropriate language
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  const activeCategory = activeFilterBtn ? activeFilterBtn.dataset.filter : "all";
  renderProjects(activeCategory);

  // Update estimator output text in the selected language
  if (typeof updateEstimatorOutput === "function") {
    updateEstimatorOutput();
  }
}

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("speedup_lang", currentLang);
  initLanguage();
}

// Render Project Cards
function renderProjects(category = "all") {
  const container = document.getElementById("projects-grid-container");
  if (!container) return;

  const isAr = currentLang === "ar";
  const filtered = category === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === category);

  container.innerHTML = filtered.map(proj => {
    const title = isAr ? proj.name_ar : proj.name_en;
    const desc = isAr ? proj.summary_ar : proj.summary_en;
    const catLabel = getCategoryLabel(proj.category, isAr);

    return `
      <article class="project-card" data-category="${proj.category}">
        <div class="project-thumb">
          <div class="project-card-logo-badge" title="SpeedUp Fast Code Deployment">
            <img src="assets/images/speedup-logo-transparent.png" alt="SpeedUp">
            <span>SpeedUp</span>
          </div>

          ${proj.img ? `
            <img src="${proj.img}" alt="${title}" class="project-img" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'project-thumb-art\\'><i class=\\'fa-solid ${proj.icon}\\'></i><span class=\\'art-tag\\'>${proj.category.toUpperCase()}</span></div>';">
          ` : `
            <div class="project-thumb-art">
              <i class="fa-solid ${proj.icon}"></i>
              <span class="art-tag">${proj.category.toUpperCase()}</span>
            </div>
          `}
          <span class="project-status-badge">
            <span class="status-dot"></span>
            ${isAr ? "مباشر أونلاين" : "Live Online"}
          </span>
        </div>

        <div class="project-info">
          <div class="project-category">${catLabel}</div>
          <h3 class="project-name">${title}</h3>
          <p class="project-summary">${desc}</p>

          <div class="project-tags">
            ${proj.tags.map(t => `<span class="tag-badge">${t}</span>`).join("")}
          </div>

          <div class="project-actions">
            <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="link-live" title="${isAr ? 'فتح الموقع المباشر' : 'Visit Live Website'}">
              <span>${isAr ? "زيارة الموقع" : "Live Site"}</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>

            <button class="btn-quick-preview" onclick="openProjectModal('${proj.id}')">
              <i class="fa-regular fa-eye"></i>
              <span>${isAr ? "تفاصيل سريعة" : "Quick View"}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function getCategoryLabel(cat, isAr) {
  const map = {
    corporate: isAr ? "شركات وصناعة" : "Corporate & Industrial",
    software: isAr ? "أنظمة سحابية وتطبيقات" : "Cloud & SaaS",
    travel: isAr ? "سياحة وسفر وحج" : "Travel & Tourism",
    fnb: isAr ? "مطاعم وكافيهات" : "Cafe & Hospitality"
  };
  return map[cat] || cat;
}

// Project Modal Handler
window.openProjectModal = function(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const isAr = currentLang === "ar";
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body-content");
  if (!modal || !modalBody) return;

  const title = isAr ? proj.name_ar : proj.name_en;
  const desc = isAr ? proj.details_ar : proj.details_en;

  modalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div>
          <span style="color: var(--primary-orange); font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">
            ${getCategoryLabel(proj.category, isAr)}
          </span>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-top: 4px;">${title}</h2>
        </div>
        <div style="padding: 6px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 9999px; color: #10b981; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
          ${proj.stats}
        </div>
      </div>

      <div style="position: relative; border-radius: 14px; overflow: hidden; border: 1px solid var(--border-glass); background: #000; height: 280px; display: flex; align-items: center; justify-content: center;">
        ${proj.img ? `
          <img src="${proj.img}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
        ` : `
          <div style="text-align: center; color: var(--primary-orange);">
            <i class="fa-solid ${proj.icon}" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <div style="color: #fff; font-weight: 700;">SpeedUp Fast Code Deployment</div>
          </div>
        `}
      </div>

      <div style="line-height: 1.8; color: var(--text-muted); font-size: 1rem;">
        ${desc}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${proj.tags.map(t => `<span style="padding: 4px 12px; background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: 6px; font-size: 0.8rem; color: var(--text-dim);">${t}</span>`).join("")}
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid var(--border-glass); margin-top: 0.5rem;">
        <span style="font-size: 0.85rem; color: var(--text-dim);">
          <i class="fa-solid fa-shield-check" style="color: var(--primary-orange); margin-inline-end: 4px;"></i>
          ${isAr ? "كود نظيف معتمد ومستضاف مباشرة" : "Verified clean code live deployment"}
        </span>
        <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 10px 24px; font-size: 0.95rem;">
          <span>${isAr ? "فتح الموقع الحي الآن" : "Launch Live Website"}</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeProjectModal = function() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Event Listeners Setup
function setupEventListeners() {
  // Theme & Lang Toggles
  document.getElementById("theme-toggle-btn")?.addEventListener("click", toggleTheme);
  document.getElementById("lang-toggle-btn")?.addEventListener("click", toggleLanguage);

  // Mobile Menu
  const mobileToggle = document.getElementById("mobile-toggle-btn");
  const navMenu = document.getElementById("nav-menu");
  mobileToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
  });

  // Close mobile menu on nav link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("open");
    });
  });

  // Filter Buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });

  // Modal Close on backdrop & ESC key
  const modal = document.getElementById("project-modal");
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeProjectModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });

  // Google Drive Modal / Link
  document.getElementById("btn-open-drive-gallery")?.addEventListener("click", () => {
    window.open(currentDriveUrl, "_blank");
  });

  // Contact Form Submission via WhatsApp
  const contactForm = document.getElementById("speedup-contact-form");
  contactForm?.addEventListener("submit", handleContactSubmit);
}

// WhatsApp Message Generator & Form Handling
function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("form-name")?.value.trim();
  const phone = document.getElementById("form-phone")?.value.trim();
  const service = document.getElementById("form-service")?.value;
  const manager = document.getElementById("form-manager")?.value || "01099444012";
  const msg = document.getElementById("form-message")?.value.trim();

  if (!name || !phone) {
    alert(currentLang === "ar" ? "يرجى كتابة الاسم ورقم الهاتف/الواتساب" : "Please provide your name and phone number");
    return;
  }

  const managerPhone = manager === "01095412229" ? "201095412229" : "201099444012";
  const managerName = manager === "01095412229" ? "م / إسلام سعد" : "م / أحمد وليد";

  const isAr = currentLang === "ar";
  const formattedText = isAr 
    ? `مرحباً ${managerName}، أود بدء مشروع جديد مع شركة SpeedUp:\n\n👤 *الاسم:* ${name}\n📞 *الهاتف:* ${phone}\n💼 *الخدمة المطلوبة:* ${service}\n📝 *تفاصيل إضافية:* ${msg || 'لا توجد تفاصيل إضافية'}`
    : `Hello ${managerName}, I would like to start a new project with SpeedUp:\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💼 *Service:* ${service}\n📝 *Details:* ${msg || 'None provided'}`;

  const waUrl = `https://wa.me/${managerPhone}?text=${encodeURIComponent(formattedText)}`;
  window.open(waUrl, "_blank");
}

// 3D Card Interactive Tilt Effect
function setupCard3DEffect() {
  const card = document.getElementById("business-card-3d");
  if (!card) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
}

// Scroll Effects (Header shadow, Active Nav Spy, Back to Top)
function setupScrollEffects() {
  const header = document.querySelector(".site-header");
  const topBtn = document.getElementById("scroll-to-top-btn");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Header sticky shadow
    if (scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    // Back to top visibility
    if (scrollY > 400) {
      topBtn?.classList.add("visible");
    } else {
      topBtn?.classList.remove("visible");
    }

    // Scroll Spy for nav links
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add("active");
      }
    });
  });
  topBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 5. Interactive Project Estimator Engine
let estState = {
  type: "web",
  scale: "starter"
};

const estimatorData = {
  web: {
    starter: {
      title_ar: "باقة المواقع السريعة | Fast-Launch Portal",
      title_en: "Fast-Launch Corporate Portal",
      time_ar: "7 - 12 يوم عمل",
      time_en: "7 - 12 Business Days",
      features_ar: "كود نظيف فائق السرعة + توافق موبايل 100% + تهيئة SEO كاملة + دومين واستضافة سحابية",
      features_en: "Sub-second clean code + 100% responsive + SEO optimization + Cloud deployment"
    },
    growth: {
      title_ar: "باقة المنصات المتقدمة وكتالوجات الشركات | Growth Scale",
      title_en: "Growth Corporate Portal & Dynamic Catalog",
      time_ar: "14 - 21 يوم عمل",
      time_en: "14 - 21 Business Days",
      features_ar: "كتالوج منتجات تفاعلي + نظام عروض أسعار RFQ + ربط تحليلات Google Analytics 4 + سرعة قياسية",
      features_en: "Dynamic product catalog + Instant RFQ quote engine + GA4 integration + 95+ PageSpeed"
    },
    enterprise: {
      title_ar: "بوابات المصانع والشركات الكبرى المتكاملة | Enterprise Portal",
      title_en: "Enterprise Corporate Web Infrastructure",
      time_ar: "20 - 30 يوم عمل",
      time_en: "20 - 30 Business Days",
      features_ar: "هندسة معمارية سحابية مخصصة + حماية فائقة + نظام تعديل وإدارة محتوى + دعم فني وصيانة ممتدة",
      features_en: "Custom cloud architecture + Hardened security + CMS dashboard + Priority SLA support"
    }
  },
  saas: {
    starter: {
      title_ar: "نظام إداري سحابي خفيف | SaaS MVP",
      title_en: "Lightweight SaaS / ERP MVP",
      time_ar: "14 - 20 يوم عمل",
      time_en: "14 - 20 Business Days",
      features_ar: "إدارة المشتركين/المستخدمين + صلاحيات دقيقة + لوحة تحكم سحابية تفاعلية وقواعد بيانات آمنة",
      features_en: "User & membership management + Granular RBAC + Responsive dashboard & secure DB"
    },
    growth: {
      title_ar: "نظام إداري متقدم (اشتراكات وماليات) | Advanced SaaS",
      title_en: "Advanced SaaS System (Memberships & Billing)",
      time_ar: "21 - 35 يوم عمل",
      time_en: "21 - 35 Business Days",
      features_ar: "نظام مثل نادي لشبونة: إدارة اشتراكات، حضور وانصراف، تقارير إيرادات ومصروفات، وفواتير إلكترونية",
      features_en: "Lisbon-Club model: Subscriptions, player attendance, revenue/expense reports, billing"
    },
    enterprise: {
      title_ar: "منظومة ERP سحابية مخصصة للشركات | Enterprise ERP",
      title_en: "Custom Enterprise Cloud ERP Suite",
      time_ar: "30 - 45 يوم عمل",
      time_en: "30 - 45 Business Days",
      features_ar: "بنية تحتية سحابية واسعة النطاق + ربط APIs متعددة + قواعد بيانات مشفرة + تدريب ودعم كامل",
      features_en: "Large-scale cloud database + Multi-tier APIs + End-to-end encryption + Onboarding training"
    }
  },
  mkt: {
    starter: {
      title_ar: "حملة إعلانية ممولة انطلاقية | Paid Ads Starter",
      title_en: "Performance Ad Campaign Starter",
      time_ar: "إطلاق فوري خلال 3 - 5 أيام",
      time_en: "Launch within 3 - 5 Days",
      features_ar: "إعداد بيكسل ميتا وجوجل + تصميم بوستات إعلانية احترافية + استهداف جماهير مهتمة لشراء فوري",
      features_en: "Meta & Google Pixel setup + Creative ad design + Laser buyer targeting"
    },
    growth: {
      title_ar: "باقة النمو التوسعي والميديا بايينج | Growth Scale Marketing",
      title_en: "Growth Scale Media Buying & Content Engine",
      time_ar: "خطة شهرية متكاملة (تبدأ خلال 5 أيام)",
      time_en: "Full Monthly Strategy (Launches in 5 Days)",
      features_ar: "إدارة إعلانات ممولة متعددة المنصات + صناعة ريلز وفيديوهات + تقارير أسبوعية للعائد ROAS",
      features_en: "Omnichannel paid ads + Video reels production + Weekly ROAS performance audits"
    },
    enterprise: {
      title_ar: "الهيمنة الرقمية الشاملة | Enterprise Brand Scaling",
      title_en: "Enterprise Brand Scaling & Market Domination",
      time_ar: "إدارة ربع سنوية / سنوية متواصلة",
      time_en: "Quarterly / Annual Dedicated Growth",
      features_ar: "فريق مخصص: ميديا باير + مصمم جرافيك + صناع محتوى + تحسين محركات البحث SEO لترتيب جوجل رقم 1",
      features_en: "Dedicated media buyer + Graphic designer + Copywriter + #1 Google SEO campaign"
    }
  },
  full: {
    starter: {
      title_ar: "باقة الانطلاق المتكامل (موقع سريع + حملة إعلانية)",
      title_en: "Fast-Start Suite (Website + Launch Ads)",
      time_ar: "10 - 15 يوم عمل",
      time_en: "10 - 15 Business Days",
      features_ar: "موقع سريع فائق التحويل + إطلاق حملة إعلانات ممولة + هوية بصرية أساسية ودعم تقني",
      features_en: "High-converting website + Launch ad campaign + Essential brand assets & tech support"
    },
    growth: {
      title_ar: "باقة النمو السريع الشامل (Fast Code & Fast Growth)",
      title_en: "Fast Code & Fast Growth Complete Suite",
      time_ar: "20 - 30 يوم عمل",
      time_en: "20 - 30 Business Days",
      features_ar: "منصة ويب مخصصة + إدارة شهرية للسوشيال ميديا والإعلانات + هوية كاملة + SEO متصدر",
      features_en: "Custom web platform + Monthly social media & paid ads + Full branding + Google SEO"
    },
    enterprise: {
      title_ar: "الشراكة الرقمية المؤسسية المتكاملة | SpeedUp Partner",
      title_en: "SpeedUp Enterprise Digital Partnership",
      time_ar: "عقد شراكة تقنية وتسويقية سنوية مستمرة",
      time_en: "Annual Technology & Marketing Retainer",
      features_ar: "تطوير برمجيات مستمر + إدارة كافة قنوات التسويق + سيرفرات سحابية خاصة + دعم 24/7",
      features_en: "Ongoing custom software dev + All marketing channels + Dedicated cloud infra + 24/7 SLA"
    }
  }
};

function setupProjectEstimator() {
  const typeBtns = document.querySelectorAll("#estimator-type-options .est-option-btn");
  const scaleBtns = document.querySelectorAll("#estimator-scale-options .est-option-btn");
  const waBtn = document.getElementById("btn-forward-estimate-whatsapp");

  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      typeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      estState.type = btn.dataset.type;
      updateEstimatorOutput();
    });
  });

  scaleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      scaleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      estState.scale = btn.dataset.scale;
      updateEstimatorOutput();
    });
  });

  waBtn?.addEventListener("click", forwardEstimateToWhatsApp);

  updateEstimatorOutput();
}

function updateEstimatorOutput() {
  const config = estimatorData[estState.type]?.[estState.scale];
  if (!config) return;

  const isAr = currentLang === "ar";
  const titleEl = document.getElementById("est-package-title");
  const timeEl = document.getElementById("est-timeline-val");
  const featEl = document.getElementById("est-features-val");

  if (titleEl) titleEl.textContent = isAr ? config.title_ar : config.title_en;
  if (timeEl) timeEl.textContent = isAr ? config.time_ar : config.time_en;
  if (featEl) featEl.textContent = isAr ? config.features_ar : config.features_en;
}

function forwardEstimateToWhatsApp() {
  const config = estimatorData[estState.type]?.[estState.scale];
  if (!config) return;

  const isAr = currentLang === "ar";
  const title = isAr ? config.title_ar : config.title_en;
  const time = isAr ? config.time_ar : config.time_en;
  const feat = isAr ? config.features_ar : config.features_en;

  const message = isAr
    ? `مرحباً فريق إدارة SpeedUp، قمت بتقدير مواصفات مشروعي عبر حاسبة الموقع:\n\n🚀 *الباقة المختارة:* ${title}\n⏱️ *الجدول الزمني التقديري:* ${time}\n⭐ *المميزات المشمولة:* ${feat}\n\nأود مناقشة تفاصيل التنفيذ والبدء المباشر.`
    : `Hello SpeedUp Management, I configured my project scope using your online estimator:\n\n🚀 *Selected Package:* ${title}\n⏱️ *Estimated Timeline:* ${time}\n⭐ *Inclusions:* ${feat}\n\nI would like to discuss next steps and kick off execution.`;

  // Direct to Eng Ahmed Waled
  const waUrl = `https://wa.me/201099444012?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
}

// 6. Active Navigation Link Highlighting for Multi-Page Architecture
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("/").pop().split("#")[0];
    if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 7. 3D Scroll & Mouse Interactive Hero Visual — Turnover-Inspired Premium Scene
function setupRobot3DVisual() {
  const stage = document.querySelector(".hero-visual-stage");
  const robotCard = document.querySelector(".hero-3d-robot-stage");
  const canvas = document.getElementById("robot-3d-canvas");
  if (!stage || !robotCard) return;

  let mouseX = 0, mouseY = 0;
  let currentTiltX = 0, currentTiltY = 0;

  // Smooth CSS 3D tilt on the entire card (Turnover-style parallax)
  window.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
  }, { passive: true });

  function animateCard() {
    currentTiltX += (-mouseY * 10 - currentTiltX) * 0.07;
    currentTiltY += (mouseX  * 14 - currentTiltY) * 0.07;
    robotCard.style.transform =
      `perspective(1200px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
    requestAnimationFrame(animateCard);
  }
  requestAnimationFrame(animateCard);

  // ── Three.js Premium Scene ──────────────────────────────────────────────
  if (!canvas || typeof THREE === "undefined") return;

  try {
    const W = canvas.clientWidth  || 520;
    const H = canvas.clientHeight || 520;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 500);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Lighting ────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));

    const pOrange = new THREE.PointLight(0xf5821f, 6, 70);
    pOrange.position.set(10, 8, 12);
    scene.add(pOrange);

    const pNavy = new THREE.PointLight(0x1d3461, 4, 60);
    pNavy.position.set(-10, -5, 10);
    scene.add(pNavy);

    scene.add(new THREE.PointLight(0xffffff, 2.5, 50)).position.set(0, 14, 6);

    // ── Central Sphere (logo navy + orange glow) ─────────────────────────
    const coreGeo = new THREE.SphereGeometry(5.5, 48, 48);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x1d3461,
      emissive: 0xf5821f,
      emissiveIntensity: 0.3,
      shininess: 200,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Wireframe overlay on sphere
    const wireGeo = new THREE.SphereGeometry(5.52, 18, 18);
    const wireMesh = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({
      color: 0xf5821f, wireframe: true, transparent: true, opacity: 0.22
    }));
    scene.add(wireMesh);

    // ── Spiral Orange Ribbon Rings (Turnover's signature swirl) ──────────
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Large primary ribbon ring — SpeedUp orange
    const r1 = new THREE.Mesh(
      new THREE.TorusGeometry(9, 0.3, 10, 120),
      new THREE.MeshPhongMaterial({ color: 0xf5821f, emissive: 0xf5821f, emissiveIntensity: 0.4, shininess: 200, transparent: true, opacity: 0.9 })
    );
    r1.rotation.x = Math.PI / 5;
    masterGroup.add(r1);

    // Medium navy ring at 45° tilt
    const r2 = new THREE.Mesh(
      new THREE.TorusGeometry(11, 0.18, 8, 100),
      new THREE.MeshPhongMaterial({ color: 0x1d3461, emissive: 0x254580, emissiveIntensity: 0.3, shininess: 160, transparent: true, opacity: 0.7 })
    );
    r2.rotation.x = Math.PI / 2.5;
    r2.rotation.z = Math.PI / 4;
    masterGroup.add(r2);

    // Thin orange-light accent ring
    const r3 = new THREE.Mesh(
      new THREE.TorusGeometry(7.5, 0.14, 8, 90),
      new THREE.MeshBasicMaterial({ color: 0xff9d45, transparent: true, opacity: 0.75 })
    );
    r3.rotation.y = Math.PI / 3;
    r3.rotation.x = -Math.PI / 6;
    masterGroup.add(r3);

    // light tweak for nodes
    const nodes = [];
    const nodeCount = 8;
    for (let i = 0; i < nodeCount; i++) {
      const theta = (i / nodeCount) * Math.PI * 2;
      const R = 8 + (i % 3) * 1.2;
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.28 + (i % 2) * 0.12, 0),
        new THREE.MeshPhongMaterial({
          color: i % 2 === 0 ? 0xf5821f : 0x1d3461,
          emissive: i % 2 === 0 ? 0xf5821f : 0x254580,
          emissiveIntensity: 0.8, shininess: 250
        })
      );
      node.position.set(R * Math.cos(theta), (i % 3 - 1) * 3, R * Math.sin(theta));
      node.userData = { theta, R, speed: 0.3 + i * 0.05 };
      masterGroup.add(node);
      nodes.push(node);
    }

    // ── Particle Cloud — navy + orange matching logo ─────────────────────
    const pCount = window.innerWidth < 768 ? 500 : 1200;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 14 + Math.random() * 16;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pPos[i*3+1] = r * Math.sin(ph) * Math.sin(th) * 0.55;
      pPos[i*3+2] = r * Math.cos(ph);
      // alternating orange and navy particles
      const isOrange = i % 3 !== 0;
      pCol[i*3]   = isOrange ? 0.96 : 0.11;  // R
      pCol[i*3+1] = isOrange ? 0.51 : 0.20;  // G
      pCol[i*3+2] = isOrange ? 0.12 : 0.38;  // B
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      vertexColors: true, size: 0.14, transparent: true, opacity: 0.8, sizeAttenuation: true
    }));
    scene.add(particles);

    // ── Render Loop ──────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    function renderGL() {
      const t = clock.getElapsedTime();

      // Core rotation — responds to mouse
      core.rotation.y = t * 0.15 + mouseX * 0.4;
      core.rotation.x = mouseY * 0.2;
      wireMesh.rotation.y = t * 0.12 + mouseX * 0.35;
      wireMesh.rotation.x = mouseY * 0.2;

      // Orange ribbon ring (main Turnover swirl)
      r1.rotation.z = t * 0.5;
      r1.rotation.y = Math.sin(t * 0.3) * 0.4 + mouseX * 0.25;

      // Cyan ring counter-rotate
      r2.rotation.z = -t * 0.38;
      r2.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.22) * 0.2;

      // Gold accent ring
      r3.rotation.x = t * 0.55;
      r3.rotation.z = Math.cos(t * 0.3) * 0.3;

      // Orbit nodes
      nodes.forEach((node, i) => {
        node.userData.theta += node.userData.speed * 0.012;
        const { R, theta } = node.userData;
        node.position.x = R * Math.cos(theta);
        node.position.z = R * Math.sin(theta);
        node.position.y = Math.sin(t * 1.2 + i) * 2.5;
        node.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.22);
      });

      // Light animation
      pOrange.position.x = Math.cos(t * 0.6) * 12;
      pOrange.position.y = Math.sin(t * 0.4) * 7;
      pNavy.position.x   = Math.cos(t * 0.45 + Math.PI) * 10;
      pNavy.position.z   = Math.sin(t * 0.35) * 9;

      // Particles spin
      particles.rotation.y = t * 0.035;

      renderer.render(scene, camera);
      requestAnimationFrame(renderGL);
    }
    requestAnimationFrame(renderGL);

    window.addEventListener("resize", () => {
      const w = canvas.clientWidth || 520;
      const h = canvas.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

  } catch (err) {
    console.warn("Hero 3D WebGL:", err);
  }
}


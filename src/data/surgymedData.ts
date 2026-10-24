export type Language = 'ar' | 'en';

export interface ProductSpec {
  label: string;
  value: string;
  labelEn?: string;
  valueEn?: string;
}

export interface Product {
  id: string;
  slug: string;
  code: string;
  nameAr: string;
  nameEn: string;
  categorySlug: string;
  categoryNameAr: string;
  categoryNameEn: string;
  shortDescAr: string;
  shortDescEn: string;
  aboutAr: string;
  aboutEn: string;
  sizesCount?: number;
  sizesBadge?: string;
  sizesBadgeEn?: string;
  featured: boolean;
  experienceOrder?: number;
  experienceHighlights?: string[];
  experienceHighlightsEn?: string[];
  images: string[];
  advantages: string[];
  advantagesEn: string[];
  uses: string[];
  usesEn: string[];
  specs: ProductSpec[];
  packaging: string;
  packagingEn: string;
  relatedArticleSlugs: string[];
}

export interface Category {
  id: string;
  number: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  count: number;
  image?: string;
  featuredDark?: boolean;
  descriptionAr: string;
  descriptionEn: string;
}

export interface Sector {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: 'hospital' | 'heart' | 'stethoscope' | 'smile' | 'truck' | 'network';
  linkedCategories: { label: string; labelEn: string; slug: string }[];
}

export interface ArticleSection {
  heading: string;
  headingEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  bullets?: string[];
  bulletsEn?: string[];
}

export interface Article {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  categorySlug: string;
  categoryAr: string;
  categoryEn: string;
  readTimeAr: string;
  readTimeEn: string;
  publishedDateAr: string;
  publishedDateEn: string;
  image: string;
  excerptAr: string;
  excerptEn: string;
  keyTakeaways: string[];
  keyTakeawaysEn: string[];
  sections: ArticleSection[];
  relatedProductSlugs: string[];
}

export const COMPANY_INFO = {
  nameAr: 'سيرجي ميد للصناعات الطبية',
  nameEn: 'SURGY MED',
  fullNameEn: 'Surgy Med For Medical Industries',
  subtitleEn: 'FOR MEDICAL INDUSTRIES',
  kickerEn: 'SURGY MED | MEDICAL INDUSTRIES',
  taglineAr: 'حلول صناعية متخصصة في المستلزمات الطبية',
  taglineEn: 'Specialized Industrial Solutions in Medical Disposables',
  heroDescriptionAr:
    'تعرّف على مجموعة منتجاتنا ومواصفاتها، واستكشف حلول التوريد المناسبة لاحتياجات المستشفيات والمراكز الطبية وشركات التوريدات.',
  heroDescriptionEn:
    'Explore our medical product lines, technical datasheets, and tailored B2B supply solutions for hospitals, medical centers, and healthcare distributors.',
  footerSummaryAr: 'شركة سيرجي ميد لتصنيع وتجارة وتصدير المستلزمات الطبية.',
  footerSummaryEn:
    'Surgy Med for Manufacturing, Trading, and Exporting Single-Use Medical Supplies.',
  phone1: '+20 101 488 1712',
  phone1Raw: '+201014881712',
  phone2: '+20 100 960 2729',
  phone2Raw: '+201009602729',
  fax: '048 3553287',
  whatsappNumber: '201014881712',
  addressAr:
    'مصنع رقم 110 ومصنع رقم 307، المنطقة الصناعية TBI، مركز ومدينة تلا، محافظة المنوفية، جمهورية مصر العربية',
  addressEn:
    'Factory No. 110 & Factory No. 307, TBI Industrial Zone, Tala City, Menofia Governorate, Arab Republic of Egypt',
  landmarkAr: 'أمام مستشفى تلا العام',
  landmarkEn: 'In front of Tala General Hospital',
  logoUrl: '/images/surgy-med-emblem.webp',
};

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    number: '01',
    slug: 'sheets-consumables',
    nameAr: 'المفارش والمستهلكات الطبية',
    nameEn: 'Medical Sheets & Consumables',
    count: 4,
    image: '/images/underpads.webp',
    featuredDark: true,
    descriptionAr: 'مفارش أسنان ومفارش كبار السن ورولات مفارش ومناديل طبية عالية الامتصاص.',
    descriptionEn:
      'High-absorption dental bibs, 4-layer underpads, examination bed rolls, and medical tissue rolls.',
  },
  {
    id: 'cat-2',
    number: '02',
    slug: 'dressings-tapes',
    nameAr: 'الضمادات واللواصق الطبية',
    nameEn: 'Dressings & Medical Tapes',
    count: 2,
    image: '/images/silk-medical-tape.webp',
    descriptionAr: 'لواصق طبية حريرية وضمادات عين طبية لطيفة على البشرة.',
    descriptionEn:
      'Breathable hand-tearable silk medical tapes and hypoallergenic sterile eye patches.',
  },
  {
    id: 'cat-3',
    number: '03',
    slug: 'surgical',
    nameAr: 'مستلزمات العمليات',
    nameEn: 'Surgical Supplies',
    count: 2,
    descriptionAr: 'مرايل عمليات ومفارش ترولي أحادية الاستخدام بمعايير حماية موثوقة.',
    descriptionEn:
      'Single-use fluid-resistant surgical aprons and perforated trolley examination rolls.',
  },
  {
    id: 'cat-4',
    number: '04',
    slug: 'orthopedic',
    nameAr: 'مستلزمات العظام',
    nameEn: 'Orthopedic Supplies',
    count: 2,
    descriptionAr: 'أربطة تحت الجبس وأربطة جبس طبي لتثبيت الكسور.',
    descriptionEn:
      'Soft breathable under-cast cotton padding and fast-setting Plaster of Paris bandages.',
  },
  {
    id: 'cat-5',
    number: '05',
    slug: 'waste-disposal',
    nameAr: 'مستلزمات التعقيم والتخلص من النفايات',
    nameEn: 'Sterilization & Waste Disposal',
    count: 2,
    image: '/images/sharps-box.webp',
    descriptionAr: 'صناديق أمان للتخلص من الأدوات الحادة وأكياس نفايات طبية.',
    descriptionEn:
      'WHO/UN3291 compliant puncture-resistant sharps containers and color-coded biohazard waste bags.',
  },
  {
    id: 'cat-6',
    number: '06',
    slug: 'miscellaneous',
    nameAr: 'مستلزمات طبية متنوعة',
    nameEn: 'Miscellaneous Medical Supplies',
    count: 3,
    image: '/images/cat-misc.webp',
    descriptionAr: 'جل موجات صوتية وأساور تعريف المرضى وأكياس جمع البول.',
    descriptionEn:
      'High-clarity acoustic ultrasound gel, tamper-proof patient ID bracelets, and graduated urine bags.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'dental-bibs',
    code: 'SM-DB-01',
    nameAr: 'مفرش الأسنان',
    nameEn: 'Dental Bibs',
    categorySlug: 'sheets-consumables',
    categoryNameAr: 'المفارش والمستهلكات الطبية',
    categoryNameEn: 'Medical Sheets & Consumables',
    shortDescAr: 'مفرش أحادي الاستخدام بثلاث طبقات، عالي الامتصاص ومقاوم للتسرب.',
    shortDescEn: 'Single-use 3-ply dental bib with high fluid absorption and leak-proof PE backing.',
    aboutAr:
      'مفرش أسنان بالقياس العالمي مكوّن من ثلاث طبقات: طبقتان من التيشو عالي الامتصاص وطبقة بلاستيك فيلم تمنع تسرب السوائل، بسطح ناعم ومريح للمريض.',
    aboutEn:
      'Universal-size 3-layer dental bib engineered with two plies of high-absorbency virgin tissue bonded to a leak-proof polyethylene film barrier for reliable patient protection.',
    featured: true,
    experienceOrder: 1,
    experienceHighlights: [
      'امتصاص عالٍ للسوائل',
      'مقاوم للتسرب بفضل طبقة البلاستيك فيلم',
      'سطح ناعم ومريح للمريض',
    ],
    experienceHighlightsEn: [
      'Rapid fluid absorption across embossed surface',
      'Impervious polyethylene film prevents leak-through',
      'Soft, non-irritating texture for patient comfort',
    ],
    images: [
      '/images/dental-bibs-1.webp',
      '/images/dental-bibs-2.webp',
      '/images/dental-bibs-3.webp',
    ],
    advantages: [
      'امتصاص عالٍ للسوائل',
      'مقاوم للتسرب بفضل طبقة البلاستيك فيلم',
      'سطح ناعم ومريح للمريض',
      'لا يسبب تهيّج البشرة',
      'للاستخدام مرة واحدة',
      'خفيف الوزن وسهل الاستخدام',
    ],
    advantagesEn: [
      'High fluid absorption capacity',
      'Leak-resistant polyethylene film backing',
      'Soft embossed surface for patient comfort',
      'Hypoallergenic and skin-friendly',
      'Hygienic single-use disposable design',
      'Lightweight and easy to position',
    ],
    uses: [
      'عيادات الأسنان',
      'عيادات التجميل',
      'معامل التحاليل',
      'مراكز العناية بالبشرة',
      'الاستخدام الطبي العام',
    ],
    usesEn: [
      'Dental clinics & oral surgery centers',
      'Dermatology & aesthetic clinics',
      'Diagnostic laboratories',
      'Skincare & outpatient procedure rooms',
      'General clinical instrument trays',
    ],
    specs: [
      {
        label: 'المقاس',
        value: '33 × 45 سم (القياس العالمي) — تتوفر مقاسات أخرى حسب الطلب',
        labelEn: 'Dimensions',
        valueEn: '33 × 45 cm (Universal Standard) — Custom sizes available on request',
      },
      {
        label: 'عدد الطبقات',
        value: '3 طبقات',
        labelEn: 'Number of Plies',
        valueEn: '3 Layers (2-Ply Tissue + 1-Ply PE Film)',
      },
      {
        label: 'تركيب الطبقات',
        value: 'طبقتان من التيشو عالي الامتصاص + طبقة بلاستيك فيلم لمنع التسرب',
        labelEn: 'Layer Composition',
        valueEn: '2 Layers high-absorption virgin tissue + 1 Layer waterproof PE film',
      },
      {
        label: 'الألوان',
        value: 'أزرق، وردي، أخضر، أصفر، أبيض — مع إمكانية تخصيص اللون حسب الطلب',
        labelEn: 'Available Colors',
        valueEn: 'Blue, Pink, Green, Yellow, White — Custom OEM colors available',
      },
    ],
    packaging:
      'كل 125 قطعة داخل علبة من الكرتون الدوبلكس، وكل 4 علب داخل كرتونة حاوية من الكرتون المضلّع.',
    packagingEn:
      '125 pcs per duplex dispenser box; 4 boxes (500 pcs) per corrugated master carton.',
    relatedArticleSlugs: ['medical-sheets-infection-control', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-2',
    slug: 'underpads',
    code: 'SM-UP-02',
    nameAr: 'مفرش كبار السن',
    nameEn: 'Underpads / Bed Pads',
    categorySlug: 'sheets-consumables',
    categoryNameAr: 'المفارش والمستهلكات الطبية',
    categoryNameEn: 'Medical Sheets & Consumables',
    shortDescAr: 'مفرش ممتص بأربع طبقات، يمنع التسرب ومناسب للرعاية الطويلة.',
    shortDescEn: '4-layer super-absorbent SAP underpad engineered for long-term care and bed protection.',
    aboutAr:
      'مفرش صحي ممتص مكوّن من أربع طبقات متكاملة تضمن التوزيع المتساوي للسوائل والامتصاص الفائق ومنع التسرب، مصمم لراحة المرضى وكبار السن أثناء الرعاية الطويلة.',
    aboutEn:
      'Four-layer medical underpad combining a soft nonwoven top sheet, cellulose distribution layer, SAP super-absorbent polymer core, and waterproof PE backsheet.',
    sizesCount: 2,
    sizesBadge: '2 مقاسات',
    sizesBadgeEn: '2 Sizes',
    featured: true,
    experienceOrder: 2,
    experienceHighlights: [
      'امتصاص عالٍ جدًا',
      'يمنع تسرب السوائل',
      'سطح ناعم ومريح للمريض',
    ],
    experienceHighlightsEn: [
      'Ultra-high SAP core fluid retention',
      'Waterproof PE backing protects mattresses',
      'Diamond-embossed soft nonwoven top sheet',
    ],
    images: ['/images/underpads.webp'],
    advantages: [
      'امتصاص عالٍ جدًا بفضل طبقة الهلام الممتص SAP',
      'يمنع تسرب السوائل عبر طبقة البولي إيثيلين السفلية',
      'سطح علوي غير منسوج (Nonwoven) ناعم ولطيف على الجلد',
      'توزيع متوازن للسوائل يمنع التكتل أو التجمّع',
      'إمكانية تخصيص المقاسات والألوان والتغليف حسب طلب العميل',
    ],
    advantagesEn: [
      'Ultra-high fluid lock with Super Absorbent Polymer (SAP)',
      'Impervious polyethylene bottom film prevents bed leakage',
      'Skin-friendly spunbond nonwoven top surface',
      'Even fluid channeling prevents clumping',
      'Full OEM customization for size, SAP weight, color, and private label packaging',
    ],
    uses: [
      'المستشفيات وأقسام الرعاية المركزة',
      'رعاية كبار السن والرعاية المنزلية',
      'غرف الفحص والعمليات',
      'المراكز الطبية والعيادات',
    ],
    usesEn: [
      'Hospitals & Intensive Care Units (ICU)',
      'Geriatric care & home healthcare',
      'Surgical & maternity wards',
      'Outpatient examination tables',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: '60 × 90 سم، 90 × 180 سم',
        labelEn: 'Standard Sizes',
        valueEn: '60 × 90 cm, 90 × 180 cm',
      },
      {
        label: 'عدد الطبقات',
        value: '4 طبقات',
        labelEn: 'Number of Layers',
        valueEn: '4 Integrated Functional Layers',
      },
      {
        label: 'الطبقة العليا',
        value: 'قماش غير منسوج (Nonwoven) ناعم لراحة المريض',
        labelEn: 'Top Sheet',
        valueEn: 'Hydrophilic soft Nonwoven fabric',
      },
      {
        label: 'طبقة الامتصاص',
        value: 'هلام ممتص SAP مع سليلوز',
        labelEn: 'Absorbent Core',
        valueEn: 'Super Absorbent Polymer (SAP) + Virgin Fluff Pulp',
      },
      {
        label: 'طبقة التوزيع',
        value: 'ألياف لب السليلوز المطحون لمنع تجمّع السوائل',
        labelEn: 'Distribution Layer',
        valueEn: 'Defibrated cellulose fibers for uniform fluid spread',
      },
      {
        label: 'الطبقة السفلية',
        value: 'فيلم بولي إيثيلين لمنع التسرب',
        labelEn: 'Back Sheet',
        valueEn: 'Waterproof Polyethylene (PE) barrier film',
      },
      {
        label: 'الألوان',
        value: 'أزرق، أبيض، وألوان مخصصة مثل الوردي والأخضر والبترولي حسب حاجة العميل',
        labelEn: 'Colors',
        valueEn: 'Blue, White, plus custom Pink, Green, Teal upon request',
      },
      {
        label: 'الحد الأدنى للطلب',
        value: '100,000 قطعة (للتخصيص الخاص)',
        labelEn: 'Custom OEM MOQ',
        valueEn: '100,000 pieces (for custom private-label runs)',
      },
      {
        label: 'خيارات التخصيص',
        value: 'طباعة اسم أو شعار العميل، وتخصيص التغليف والألوان',
        labelEn: 'OEM Customization',
        valueEn: 'Private label printing, custom bag counts, and SAP absorption weights',
      },
      {
        label: 'التخزين',
        value: 'في مكان جاف بعيدًا عن أشعة الشمس، ويُفضّل الاستخدام خلال 5 سنوات من تاريخ الإنتاج',
        labelEn: 'Storage & Shelf Life',
        valueEn: 'Store in a dry area away from direct sunlight; 5-year shelf life from production date',
      },
    ],
    packaging:
      'كل 36 قطعة داخل غلاف بلاستيك مطبوع يحمل بيانات الشركة والعلامة التجارية وبلد المنشأ ورقم التشغيلة وتاريخ الإنتاج.',
    packagingEn:
      '36 pieces per printed polybag featuring full batch traceability, production date, and brand identification.',
    relatedArticleSlugs: ['underpads-sap-technology', 'medical-sheets-infection-control'],
  },
  {
    id: 'prod-3',
    slug: 'silk-medical-tape',
    code: 'SM-ST-03',
    nameAr: 'لاصق طبي حرير',
    nameEn: 'Silk Medical Tape',
    categorySlug: 'dressings-tapes',
    categoryNameAr: 'الضمادات واللواصق الطبية',
    categoryNameEn: 'Dressings & Medical Tapes',
    shortDescAr: 'بلاستر حرير طبي يُقطع باليد، يسمح بمرور الهواء ولا يترك بقايا.',
    shortDescEn: 'Breathable hypoallergenic silk surgical tape, bidirectional hand-tearable with clean removal.',
    aboutAr:
      'لاصق طبي مصنوع من الحرير الطبي المخصص مع طبقة رقيقة من الغراء الطبي النقي، يتميز بسهولة القطع باليد طوليًا وعرضيًا دون الحاجة إلى مقص وبثبات ممتاز دون ترك أثر.',
    aboutEn:
      'Medical-grade woven acetate silk tape coated with pure hypoallergenic medical adhesive. Easily torn by hand lengthwise and crosswise without scissors.',
    sizesCount: 5,
    sizesBadge: '5 مقاسات',
    sizesBadgeEn: '5 Sizes',
    featured: true,
    experienceOrder: 3,
    experienceHighlights: [
      'خامة تسمح بمرور الهواء لتقليل التهيّج',
      'مناسب للاستخدام لفترات طويلة',
      'يُقطع باليد دون الحاجة إلى مقص',
    ],
    experienceHighlightsEn: [
      'Air-permeable woven silk reduces skin maceration',
      'Secure long-term fixation for tubes and dressings',
      'Bidirectional hand-tearable without scissors',
    ],
    images: ['/images/silk-medical-tape.webp'],
    advantages: [
      'خامة تسمح بمرور الهواء لتقليل التهيّج',
      'مناسب للاستخدام لفترات طويلة وعلى البشرة الحساسة',
      'يُقطع باليد بسهولة طوليًا وعرضيًا دون الحاجة إلى مقص',
      'ثبات قوي مع إزالة نظيفة لا تترك بقايا غراء',
      'متوفر بخمسة مقاسات قياسية لتلبية كافة الاستخدامات',
    ],
    advantagesEn: [
      'Breathable silk backing prevents skin irritation',
      'Safe for prolonged wear on sensitive skin',
      'Effortless lengthwise and crosswise hand tearing',
      'Strong initial tack with residue-free removal',
      'Available in 5 standard clinical widths',
    ],
    uses: [
      'تثبيت الضمادات والشاش الطبي',
      'تثبيت القساطر والأنابيب والكانيولا',
      'غرف العمليات والطوارئ والعيادات',
    ],
    usesEn: [
      'Securing wound dressings and surgical gauze',
      'Fixation of IV cannulas, catheters, and drainage tubes',
      'Operating rooms, ICU, and emergency departments',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: 'عرض 1.25 سم، عرض 2.5 سم، عرض 5 سم، عرض 7.5 سم، عرض 10 سم',
        labelEn: 'Available Widths',
        valueEn: '1.25 cm, 2.5 cm, 5 cm, 7.5 cm, 10 cm',
      },
      {
        label: 'الخامة',
        value: 'حرير طبي مخصّص، سهل القطع طوليًا وعرضيًا',
        labelEn: 'Backing Material',
        valueEn: 'Medical-grade woven silk cloth (bidirectional tear)',
      },
      {
        label: 'المادة اللاصقة',
        value: 'طبقة رقيقة من الغراء الطبي النقي المخصص للأغراض الطبية',
        labelEn: 'Adhesive Type',
        valueEn: 'Pure hypoallergenic pressure-sensitive medical adhesive',
      },
      {
        label: 'الطول الشائع',
        value: '5 ياردة',
        labelEn: 'Standard Roll Length',
        valueEn: '5 Yards',
      },
      {
        label: 'التخزين',
        value: 'في مكان بارد وجاف بعيدًا عن ضوء الشمس المباشر',
        labelEn: 'Storage Conditions',
        valueEn: 'Store in a cool, dry place away from direct sunlight',
      },
    ],
    packaging: 'عبوات كرتونية طبية محكمة تحمي البكرات من الرطوبة والحرارة أثناء النقل والتخزين.',
    packagingEn: 'Protective medical cardboard dispenser boxes packed in moisture-resistant master cartons.',
    relatedArticleSlugs: ['silk-medical-tape-skin-safety', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-4',
    slug: 'sharps-box',
    code: 'SM-SB-04',
    nameAr: 'عادم سنون — Sharps Box',
    nameEn: 'Sharps Container',
    categorySlug: 'waste-disposal',
    categoryNameAr: 'مستلزمات التعقيم والتخلص من النفايات',
    categoryNameEn: 'Sterilization & Waste Disposal',
    shortDescAr: 'صندوق كرتون للتخلص الآمن من الأدوات الحادة، بإغلاق نهائي.',
    shortDescEn: '4-layer aluminum-lined safety box for biohazard sharps disposal, WHO/UN3291 compliant.',
    aboutAr:
      'صندوق أمان هندسي مكوّن من 4 طبقات من الكرتون المدمج المبطن برقائق ألومنيوم معالجة والسلوفان الخارجي لمقاومة الاختراق والبلل، ومطابق لمعايير WHO/UN.',
    aboutEn:
      'Heavy-duty 4-layer compressed board safety container lined internally with treated aluminum foil and externally laminated with cellophane. Complies with WHO/UN3291 standards.',
    sizesCount: 4,
    sizesBadge: '4 مقاسات',
    sizesBadgeEn: '4 Capacities',
    featured: true,
    experienceOrder: 4,
    experienceHighlights: [
      'فتحة علوية لإدخال الأدوات الحادة دون إمكانية إخراجها',
      'غطاء إغلاق نهائي باتجاه واحد يمنع إعادة الفتح',
      'مزوّد بيد لسهولة الحمل',
    ],
    experienceHighlightsEn: [
      'One-way top aperture prevents needle retrieval or spillage',
      'Permanent terminal lock tab prevents reopening',
      'Integrated heavy-duty carry handle & flat-pack shipping',
    ],
    images: ['/images/sharps-box.webp'],
    advantages: [
      'فتحة علوية لإدخال الأدوات الحادة دون إمكانية إخراجها',
      'غطاء إغلاق نهائي باتجاه واحد يمنع إعادة الفتح',
      'مزوّد بيد علوية مدمجة لسهولة الحمل والنقل الآمن',
      'مقاومة اختراق عالية لا تقل عن 150 نيوتن على الجدران الجانبية',
      'يُشحن مسطحًا لتوفير مساحة التخزين وسهولة التركيب الفوري',
    ],
    advantagesEn: [
      'Protected top drop-port prevents accidental hand contact',
      'Irreversible final closure flap for safe incineration disposal',
      'Ergonomic top carry handle for safe transport',
      'Side-wall puncture resistance ≥ 150 Newtons',
      'Ships flat to save over 80% warehouse storage volume',
    ],
    uses: [
      'المستشفيات وأقسام الطوارئ',
      'مراكز الأسنان والعيادات',
      'معامل التحاليل ومراكز التطعيم',
      'حملات الرعاية الصحية الميدانية',
    ],
    usesEn: [
      'Hospitals, ERs, and surgical departments',
      'Dental centers and outpatient clinics',
      'Blood banks, labs, and vaccination campaigns',
      'Field healthcare and mobile medical units',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: '5 لتر، 7 لتر، 10 لتر، 12 لتر',
        labelEn: 'Available Capacities',
        valueEn: '5 Liters, 7 Liters, 10 Liters, 12 Liters',
      },
      {
        label: 'الخامة',
        value: '4 طبقات من الكرتون المدمج',
        labelEn: 'Wall Structure',
        valueEn: '4 Layers of high-density compressed board',
      },
      {
        label: 'الطبقة الداخلية',
        value: 'رقائق ألومنيوم معالجة ضد الاختراق والتشرب والتسرب',
        labelEn: 'Internal Barrier',
        valueEn: 'Treated puncture- and fluid-resistant aluminum foil lining',
      },
      {
        label: 'الطبقة الخارجية',
        value: 'سلوفان لمنع البلل والتسرب',
        labelEn: 'External Coating',
        valueEn: 'Water-resistant cellophane lamination',
      },
      {
        label: 'مقاومة الاختراق',
        value: 'لا تقل عن 150 نيوتن على الجدران الجانبية',
        labelEn: 'Puncture Resistance',
        valueEn: '≥ 150 Newtons on side walls',
      },
      {
        label: 'الطباعة',
        value: 'ألوان تحذيرية (أصفر وأحمر) مع مكان مخصص لكتابة البيانات',
        labelEn: 'Safety Markings',
        valueEn: 'High-visibility Yellow/Red Biohazard warnings + fill-line & tracking panel',
      },
      {
        label: 'المعايير',
        value: 'مطابق لمعايير WHO/UN لجمع الأدوات الحادة — UN3291',
        labelEn: 'Compliance Standards',
        valueEn: 'Compliant with WHO / UN3291 Clinical Waste Specifications',
      },
      {
        label: 'الشحن',
        value: 'يُرسل مسطحًا لتقليل مساحة التخزين',
        labelEn: 'Shipping Format',
        valueEn: 'Supplied flat-packed with printed quick-assembly guides',
      },
    ],
    packaging: 'يُورد في حزم مسطحة مغلفة ومحمية مع إرشادات التجميع السريع المطبوعة على الصندوق.',
    packagingEn: 'Bundled in shrink-wrapped flat packs inside heavy-duty master shipping cartons.',
    relatedArticleSlugs: ['sharps-disposal-who-standards', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-5',
    slug: 'ultrasound-gel',
    code: 'SM-UG-05',
    nameAr: 'جل موجات صوتية',
    nameEn: 'Ultrasound Gel',
    categorySlug: 'miscellaneous',
    categoryNameAr: 'مستلزمات طبية متنوعة',
    categoryNameEn: 'Miscellaneous Medical Supplies',
    shortDescAr: 'جل مائي شفاف لفحوصات الموجات الصوتية.',
    shortDescEn: 'High-conductivity aqueous ultrasound and Doppler transmission gel.',
    aboutAr:
      'جل طبي مائي عالي النقاوة والشفافية مخصص لفحوصات الموجات فوق الصوتية (السونار) والدوبلر، يوفر توصيلًا صوتيًا ممتازًا دون فقاعات هوائية ولا يسبب حساسية للجلد.',
    aboutEn:
      'Micro-bubble-free water-soluble acoustic coupling gel formulated for diagnostic ultrasound and Doppler imaging. Non-staining, salt-free, and probe-safe.',
    featured: false,
    images: ['/images/ultrasound-gel.webp'],
    advantages: [
      'تركيبة مائية نقية خالية من الأملاح والكحول',
      'نقل مثالي للموجات الصوتية وصورة عالية الوضوح',
      'لا يترك بقعًا على الملابس وسهل المسح والتنظيف',
      'آمن تمامًا على مجسات (Probes) أجهزة السونار',
    ],
    advantagesEn: [
      'Pure aqueous formula free of salt, alcohol, and formaldehyde',
      'Optimal acoustic impedance for crystal-clear imaging',
      'Non-greasy, non-staining, and wipes off effortlessly',
      '100% safe on sensitive ultrasound transducers/probes',
    ],
    uses: [
      'أقسام الأشعة والتشخيص بالموجات الصوتية',
      'عيادات النساء والتوليد',
      'عيادات القلب والأوعية الدموية والعلاج الطبيعي',
    ],
    usesEn: [
      'Radiology & diagnostic ultrasound imaging centers',
      'Obstetrics & gynecology clinics',
      'Cardiology Doppler & physiotherapy departments',
    ],
    specs: [
      {
        label: 'القوام',
        value: 'جل مائي لزج متجانس خالٍ من الفقاعات',
        labelEn: 'Viscosity & Texture',
        valueEn: 'High-viscosity cohesive aqueous gel, air-bubble free',
      },
      {
        label: 'اللون',
        value: 'شفاف / أزرق طبي',
        labelEn: 'Color Options',
        valueEn: 'Crystal Clear / Medical Blue',
      },
      {
        label: 'العبوات المتاحة',
        value: 'عبوات 250 مل وجراكن 5 لتر للتعبئة',
        labelEn: 'Container Sizes',
        valueEn: '250 ml dispenser bottles & 5 Liter cubitainers/jerrycans',
      },
    ],
    packaging: 'عبوات بلاستيكية طبية محكمة الغلق داخل كراتين مضلعة.',
    packagingEn: 'Sealed medical-grade HDPE bottles and 5L refill jerrycans in corrugated cartons.',
    relatedArticleSlugs: ['hospital-supply-chain-customization', 'medical-sheets-infection-control'],
  },
  {
    id: 'prod-6',
    slug: 'surgical-apron',
    code: 'SM-SA-06',
    nameAr: 'مريلة عمليات',
    nameEn: 'Surgical Apron',
    categorySlug: 'surgical',
    categoryNameAr: 'مستلزمات العمليات',
    categoryNameEn: 'Surgical Supplies',
    shortDescAr: 'مريلة عمليات للاستخدام مرة واحدة.',
    shortDescEn: 'Fluid-impervious single-use protective apron for surgical and clinical staff.',
    aboutAr:
      'مريلة طبية واقية أحادية الاستخدام مقاومة للسوائل والبلل، توفر حماية فعالة للطاقم الطبي في غرف العمليات والطوارئ والمعامل.',
    aboutEn:
      'Single-use waterproof medical apron designed to shield healthcare professionals from fluid splashes and contamination in operating rooms, labs, and emergency care.',
    featured: false,
    images: ['/images/surgical-apron.webp'],
    advantages: [
      'مقاومة ممتازة للسوائل والرذاذ',
      'خفيفة الوزن ومريحة للارتداء لفترات طويلة',
      'تصميم عملي سهل الارتداء والخلع السريع',
    ],
    advantagesEn: [
      'Reliable barrier against liquids, blood, and aerosols',
      'Lightweight and tear-resistant for extended shifts',
      'Integrated neck loop and waist ties for rapid donning',
    ],
    uses: [
      'غرف العمليات والتعقيم',
      'أقسام الطوارئ والعناية المركزة',
      'المعامل ومراكز الغسيل الكلوي',
    ],
    usesEn: [
      'Operating theaters & central sterilization (CSSD)',
      'Emergency & trauma units',
      'Clinical laboratories & renal dialysis centers',
    ],
    specs: [
      {
        label: 'الخامة',
        value: 'بولي إيثيلين طبي عالي الكثافة / Nonwoven',
        labelEn: 'Material',
        valueEn: 'High-density medical Polyethylene (HDPE / LDPE) or PE-laminated Nonwoven',
      },
      {
        label: 'الاستخدام',
        value: 'أحادي الاستخدام (Disposable)',
        labelEn: 'Usage Type',
        valueEn: 'Single-Use Disposable',
      },
      {
        label: 'الألوان',
        value: 'أبيض، أزرق طبي',
        labelEn: 'Colors',
        valueEn: 'White, Medical Blue',
      },
    ],
    packaging: 'عبوات سحب متتالية أو أكياس فردية مجمعة في كراتين حاوية.',
    packagingEn: 'Dispenser packs or flat polybags packed in master shipping cartons.',
    relatedArticleSlugs: ['medical-sheets-infection-control', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-7',
    slug: 'patient-id-bracelet',
    code: 'SM-ID-07',
    nameAr: 'أسورة تعريف مريض',
    nameEn: 'Patient ID Bracelet',
    categorySlug: 'miscellaneous',
    categoryNameAr: 'مستلزمات طبية متنوعة',
    categoryNameEn: 'Miscellaneous Medical Supplies',
    shortDescAr: 'أسورة لتعريف المرضى داخل المنشآت الطبية.',
    shortDescEn: 'Tamper-evident waterproof patient identification wristband with one-way snap lock.',
    aboutAr:
      'أسورة معصم طبية مرنة ومقاومة للماء لتعريف المرضى بدقة وأمان داخل المستشفيات، مزودة بقفل كبسولة أحادي الاتجاه يمنع النقل أو التبديل.',
    aboutEn:
      'Soft, waterproof medical identification wristband featuring a write-on panel and a tamper-proof single-use snap closure for accurate inpatient safety.',
    featured: false,
    images: ['/images/patient-id-bracelet.webp'],
    advantages: [
      'مقاومة للماء والمطهرات الطبية دون مسح البيانات',
      'قفل أمان أحادي الاستخدام لا يمكن فتحه دون إتلاف الأسورة',
      'حواف ناعمة لا تسبب حساسية أو خدش للبشرة',
      'متوفرة لمقاسات الكبار والأطفال وحديثي الولادة',
    ],
    advantagesEn: [
      'Waterproof and alcohol-resistant data panel',
      'Non-transferable one-way security snap closure',
      'Rounded atraumatic edges safe for delicate skin',
      'Available in Adult, Pediatric, and Neonatal sizes',
    ],
    uses: [
      'أقسام الاستقبال والطوارئ بالمستشفيات',
      'أقسام الولادة والحضّانات',
      'الأقسام الداخلية والعمليات الجراحية',
    ],
    usesEn: [
      'Hospital admission & emergency triage',
      'Maternity wards & neonatal ICUs (NICU)',
      'Inpatient surgical & medical wards',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: 'كبار (Adult) / أطفال وحديثي الولادة (Pediatric / Infant)',
        labelEn: 'Sizes',
        valueEn: 'Adult, Pediatric / Neonatal Infant',
      },
      {
        label: 'الألوان',
        value: 'أزرق، وردي، أبيض، أحمر (للحالات التحذيرية)',
        labelEn: 'Colors',
        valueEn: 'Blue, Pink, White, Red (Allergy/Alert)',
      },
      {
        label: 'نظام الإغلاق',
        value: 'كبسولة بلاستيكية محكمة غير قابلة لإعادة الفتح',
        labelEn: 'Locking Mechanism',
        valueEn: 'Tamper-evident one-way plastic snap stud',
      },
    ],
    packaging: 'علب تحتوي على 100 أسورة مرتبة لسهولة السحب والاستخدام.',
    packagingEn: '100 wristbands per dispenser box.',
    relatedArticleSlugs: ['hospital-supply-chain-customization'],
  },
  {
    id: 'prod-8',
    slug: 'urine-bag',
    code: 'SM-UB-08',
    nameAr: 'كيس جمع بول',
    nameEn: 'Urine Collection Bag',
    categorySlug: 'miscellaneous',
    categoryNameAr: 'مستلزمات طبية متنوعة',
    categoryNameEn: 'Miscellaneous Medical Supplies',
    shortDescAr: 'كيس مدرّج لجمع البول.',
    shortDescEn: 'Sterile 2000ml graduated urine drainage bag with anti-reflux valve and bottom outlet.',
    aboutAr:
      'كيس طبي معقم ومدرّج بوضوح لجمع البول، مزود بصمام عدم رجوع لمنع العدوى الراجعة وأنبوب مرن مقاوم للالتواء.',
    aboutEn:
      'Sterile single-use 2000ml urine collection bag equipped with an anti-reflux flutter valve, kink-resistant tubing, universal tapered connector, and T-tap bottom drainage.',
    featured: false,
    images: ['/images/urine-bag.webp'],
    advantages: [
      'تدريج واضح ودقيق لمتابعة كمية السوائل',
      'صمام أمان يمنع ارتجاع السوائل ويقلل خطر العدوى',
      'أنبوب توصيل طويل ومرن مقاوم للانثناء',
      'فتحة تفريغ سفلية محكمة وسهلة الاستخدام',
    ],
    advantagesEn: [
      'Clear volumetric graduations for accurate output monitoring',
      'Anti-reflux valve prevents retrograde urinary tract infection',
      'Flexible kink-resistant medical PVC inlet tube',
      'Leak-proof bottom outlet valve for hygienic emptying',
    ],
    uses: [
      'الأقسام الداخلية والرعاية المركزة',
      'ما بعد العمليات الجراحية',
      'الرعاية الطبية المنزلية',
    ],
    usesEn: [
      'ICU & inpatient hospital wards',
      'Post-operative recovery monitoring',
      'Long-term home healthcare',
    ],
    specs: [
      {
        label: 'السعة القياسية',
        value: '2000 مل (مدرّج)',
        labelEn: 'Standard Capacity',
        valueEn: '2000 ml (Graduated scale)',
      },
      {
        label: 'الخامة',
        value: 'PVC طبي شفاف خالٍ من المواد الضارة',
        labelEn: 'Material',
        valueEn: 'Medical-grade transparent PVC',
      },
      {
        label: 'التعقيم',
        value: 'معقم ومغلف فرديًا',
        labelEn: 'Sterility',
        valueEn: 'EO Sterile, individually sealed in peel-pack',
      },
    ],
    packaging: 'تغليف فردي معقم داخل أكياس طبية، ومجمع في كراتين شحن قياسية.',
    packagingEn: 'Individually sterile-packed in medical pouches inside master shipping cartons.',
    relatedArticleSlugs: ['underpads-sap-technology', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-9',
    slug: 'trolley-sheet-roll',
    code: 'SM-TR-09',
    nameAr: 'مفرش ترولي رول',
    nameEn: 'Trolley Sheet Roll',
    categorySlug: 'surgical',
    categoryNameAr: 'مستلزمات العمليات',
    categoryNameEn: 'Surgical Supplies',
    shortDescAr: 'رول مفارش للاستخدام مرة واحدة لأسرّة الكشف.',
    shortDescEn: 'Perforated disposable examination couch and patient trolley sheet roll.',
    aboutAr:
      'رول مفارش طبية مثقّب (Perforated) لتغطية أسرّة الكشف والترولي في العيادات والمستشفيات، يجمع بين المتانة ونعومة الملمس والحماية من البلل.',
    aboutEn:
      'Pre-perforated disposable bed sheet roll engineered for examination couches, patient stretchers, and radiology tables, offering a clean hygienic barrier per patient.',
    featured: false,
    images: ['/images/trolley-sheet-roll.webp'],
    advantages: [
      'مقسّم بفواصل تقطيع منتظمة لسهولة الاستخدام السريع',
      'يوفر حاجزًا صحيًا نظيفًا لكل مريض',
      'مقاوم للتمزق والبلل',
    ],
    advantagesEn: [
      'Precision perforation for fast sheet-by-sheet tearing',
      'Ensures rapid hygienic turnover between patients',
      'Tear-resistant and fluid-repellent construction',
    ],
    uses: [
      'أسرّة الكشف بالعيادات والمراكز الطبية',
      'ترولي نقل المرضى والطوارئ',
      'مراكز الأشعة والعلاج الطبيعي',
    ],
    usesEn: [
      'Outpatient clinic examination beds',
      'Emergency stretchers & patient transport trolleys',
      'Radiology, ultrasound & physiotherapy couches',
    ],
    specs: [
      {
        label: 'العرض الشائع',
        value: '50 سم / 60 سم / 80 سم (أو حسب الطلب)',
        labelEn: 'Roll Widths',
        valueEn: '50 cm / 60 cm / 80 cm (Custom widths available)',
      },
      {
        label: 'الخامة',
        value: 'Nonwoven أو تيشو مقوى بطبقة PE',
        labelEn: 'Material Options',
        valueEn: 'Medical Spunbond Nonwoven or PE-Laminated Tissue',
      },
      {
        label: 'الألوان',
        value: 'أبيض، أزرق طبي',
        labelEn: 'Colors',
        valueEn: 'White, Medical Blue',
      },
    ],
    packaging: 'كل رول مغلف بغلاف بلاستيكي واقٍ داخل كرتونة مجمعة.',
    packagingEn: 'Each roll individually shrink-wrapped inside corrugated master cartons.',
    relatedArticleSlugs: ['medical-sheets-infection-control', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-10',
    slug: 'tissue-roll',
    code: 'SM-TS-10',
    nameAr: 'مناديل رول',
    nameEn: 'Tissue Roll',
    categorySlug: 'sheets-consumables',
    categoryNameAr: 'المفارش والمستهلكات الطبية',
    categoryNameEn: 'Medical Sheets & Consumables',
    shortDescAr: 'مناديل رول للاستخدامات الطبية اليومية.',
    shortDescEn: '100% pure virgin cellulose 2-ply medical wiping and drying tissue roll.',
    aboutAr:
      'رولات مناديل ورقية طبية فائقة الامتصاص والنعومة، مصممة للاستخدام اليومي المكثف في العيادات والمراكز الطبية والمعامل.',
    aboutEn:
      'Lint-free, high-absorbency 2-ply virgin cellulose tissue rolls designed for wiping ultrasound gel, surface drying, and daily clinical hygiene.',
    featured: false,
    images: ['/images/tissue-roll.webp'],
    advantages: [
      'قدرة عالية وسريعة على امتصاص السوائل والجل',
      'ورق نقي ناعم لا يترك وبرًا',
      'اقتصادي ومناسب للاستخدام اليومي المستمر',
    ],
    advantagesEn: [
      'Rapid absorption of ultrasound gel and liquids',
      '100% virgin pulp — soft and lint-free on skin and probes',
      'High-capacity roll for economical daily clinic use',
    ],
    uses: [
      'عيادات الموجات الصوتية (لمسح الجل)',
      'عيادات الأسنان والجلدية',
      'التجفيف والتنظيف الطبي اليومي',
    ],
    usesEn: [
      'Ultrasound & radiology clinics (gel removal)',
      'Dental & dermatology clinics',
      'General clinical wiping and hygiene',
    ],
    specs: [
      {
        label: 'الخامة',
        value: 'سليلوز نقي 100% عالي الامتصاص',
        labelEn: 'Material',
        valueEn: '100% Pure Virgin Cellulose Pulp',
      },
      {
        label: 'عدد الطبقات',
        value: 'طبقتان (2 Ply)',
        labelEn: 'Plies',
        valueEn: '2-Ply Embossed',
      },
      {
        label: 'اللون',
        value: 'أبيض ناصع',
        labelEn: 'Color',
        valueEn: 'Bright Medical White',
      },
    ],
    packaging: 'عبوات مجمعة مغلفة بالبولي إيثيلين لحمايتها من الرطوبة.',
    packagingEn: 'Moisture-proof polyethylene multi-roll bales.',
    relatedArticleSlugs: ['medical-sheets-infection-control'],
  },
  {
    id: 'prod-11',
    slug: 'medical-waste-bags',
    code: 'SM-WB-11',
    nameAr: 'أكياس نفايات طبية',
    nameEn: 'Medical Waste Bags',
    categorySlug: 'waste-disposal',
    categoryNameAr: 'مستلزمات التعقيم والتخلص من النفايات',
    categoryNameEn: 'Sterilization & Waste Disposal',
    shortDescAr: 'أكياس لجمع النفايات الطبية بألوان مميزة.',
    shortDescEn: 'Heavy-duty color-coded biohazard waste disposal bags with printed tracking table.',
    aboutAr:
      'أكياس مخصصة لجمع النفايات الطبية الخطرة، مصنعة من خامات عالية السماكة والمرونة لمقاومة التمزق والتسرب، ومطبوعة بشعار الخطر الحيوي (Biohazard).',
    aboutEn:
      'High-tensile tear-resistant polyethylene bags engineered for safe segregation and transport of infectious medical waste, printed with international Biohazard symbols.',
    featured: false,
    images: ['/images/medical-waste-bags.webp'],
    advantages: [
      'سماكة ومتانة عالية تمنع الثقب أو التمزق',
      'ألوان قياسية معتمدة لفرز النفايات الطبية (أحمر / أصفر / أسود)',
      'طباعة واضحة لشعار النفايات الطبية الخطرة وبيانات المصدر',
    ],
    advantagesEn: [
      'Heavy-gauge film prevents tearing and fluid leakage',
      'Standard infection-control color coding (Red, Yellow, Black)',
      'Pre-printed Biohazard emblem and department/date write-on panel',
    ],
    uses: [
      'المستشفيات والمراكز الطبية',
      'معامل التحاليل وبنوك الدم',
      'عيادات الأسنان والمراكز الجراحية',
    ],
    usesEn: [
      'Hospitals & surgical centers',
      'Diagnostic laboratories & blood banks',
      'Dental clinics & outpatient healthcare facilities',
    ],
    specs: [
      {
        label: 'الألوان',
        value: 'أحمر، أصفر، أسود',
        labelEn: 'Standard Colors',
        valueEn: 'Red (Infectious), Yellow (Clinical), Black (General)',
      },
      {
        label: 'المقاسات',
        value: 'متوفرة بجميع المقاسات والسعات القياسية وحسب الطلب',
        labelEn: 'Dimensions & Capacities',
        valueEn: 'All standard bin capacities and custom gauges available',
      },
      {
        label: 'الطباعة',
        value: 'شعار Biohazard مع جدول بيانات القسم والتاريخ',
        labelEn: 'Printing',
        valueEn: 'Biohazard symbol + Department, Date & Weight tracking table',
      },
    ],
    packaging: 'تُعبأ بالوزن أو بالعدد داخل رولات أو حزم مجمعة.',
    packagingEn: 'Supplied by weight or count in heavy-duty rolls or flat packs.',
    relatedArticleSlugs: ['sharps-disposal-who-standards', 'hospital-supply-chain-customization'],
  },
  {
    id: 'prod-12',
    slug: 'under-cast-padding',
    code: 'SM-UC-12',
    nameAr: 'رباط تحت الجبس',
    nameEn: 'Under-Cast Padding',
    categorySlug: 'orthopedic',
    categoryNameAr: 'مستلزمات العظام',
    categoryNameEn: 'Orthopedic Supplies',
    shortDescAr: 'رباط قطني يوضع تحت الجبس.',
    shortDescEn: 'Soft breathable orthopedic cotton padding roll for skin protection under casts.',
    aboutAr:
      'رباط تبطين قطني ناعم ومسامي يوضع على الجلد مباشرة تحت أربطة الجبس العادي أو البلاستيكي لحماية البشرة من الاحتكاك والحرارة والضغط.',
    aboutEn:
      'Cushioned air-permeable orthopedic under-cast padding applied directly over skin to protect bony prominences from pressure, friction, and exothermic setting heat.',
    featured: false,
    images: ['/images/under-cast-padding.webp'],
    advantages: [
      'ملمس ناعم ومبطن يحمي البشرة والنتوءات العظمية',
      'يسمح بمرور الهواء ويقلل الرطوبة والتهيج تحت الجبس',
      'سهل اللف والتشكيل حول المفاصل والأطراف',
    ],
    advantagesEn: [
      'Plush cushioning protects bony prominences from pressure sores',
      'Breathable fiber structure minimizes moisture buildup',
      'Conforms smoothly around joints and limb contours',
    ],
    uses: [
      'عيادات وأقسام جراحة العظام والكسور',
      'طوارئ المستشفيات',
      'تبطين الجبائر الطبية',
    ],
    usesEn: [
      'Orthopedic fracture clinics & trauma departments',
      'Under Plaster of Paris (POP) and synthetic fiberglass casts',
      'Orthopedic splinting and compression bandaging',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: 'عرض 5 سم، 7.5 سم، 10 سم، 15 سم',
        labelEn: 'Standard Widths',
        valueEn: '5 cm, 7.5 cm, 10 cm, 15 cm',
      },
      {
        label: 'الخامة',
        value: 'ألياف قطنية / غير منسوجة طبية عالية النعومة',
        labelEn: 'Material',
        valueEn: 'Soft medical cotton / nonwoven cushioning fibers',
      },
    ],
    packaging: 'كل رول مغلف فرديًا ومجمع في دستة/كرتونة.',
    packagingEn: 'Individually wrapped rolls packed in dozen bags and master cartons.',
    relatedArticleSlugs: ['orthopedic-casting-best-practices'],
  },
  {
    id: 'prod-13',
    slug: 'plaster-bandage',
    code: 'SM-PB-13',
    nameAr: 'رباط جبس طبي',
    nameEn: 'Plaster of Paris Bandage',
    categorySlug: 'orthopedic',
    categoryNameAr: 'مستلزمات العظام',
    categoryNameEn: 'Orthopedic Supplies',
    shortDescAr: 'رباط جبس لتثبيت الكسور.',
    shortDescEn: 'Fast-setting cotton gauze bandage uniformly impregnated with pure Plaster of Paris.',
    aboutAr:
      'رباط شاش قطني مشبع بطبقة متجانسة من الجبس الطبي النقي سريع التصلب، مصمم لتثبيت الكسور وتشكيل القوالب الجبسية بدقة وصلابة عالية.',
    aboutEn:
      'Woven Leno cotton gauze uniformly coated with high-purity alpha/beta Calcium Sulfate Hemihydrate (Plaster of Paris) for rapid immersion, smooth molding, and high cast strength.',
    featured: false,
    images: ['/images/plaster-bandage.webp'],
    advantages: [
      'تشبع متجانس بالجبس الطبي يضمن صلابة متوازنة',
      'وقت غمر وتصلب قياسي يسهل التشكيل الطبي',
      'فاقد جبس منخفض جدًا أثناء الغمر في الماء',
    ],
    advantagesEn: [
      'Uniform gypsum coating delivers high cast durability',
      'Optimal dipping and setting time for precise orthopedic molding',
      'Minimal plaster loss during water immersion',
    ],
    uses: [
      'تثبيت الكسور في أقسام العظام والطوارئ',
      'تصحيح التشوهات العظمية وتثبيت المفاصل',
    ],
    usesEn: [
      'Fracture immobilization in orthopedic & trauma units',
      'Joint stabilization and orthopedic deformity correction',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: 'عرض 10 سم، 15 سم، 20 سم',
        labelEn: 'Standard Widths',
        valueEn: '10 cm, 15 cm, 20 cm',
      },
      {
        label: 'الخامة',
        value: 'شاش قطني طبي مشبع بجبس باريس النقي',
        labelEn: 'Material',
        valueEn: '100% Cotton gauze impregnated with medical Plaster of Paris',
      },
    ],
    packaging: 'كل رول مغلف بغلاف مقاوم للرطوبة والماء لضمان صلاحية الجبس.',
    packagingEn: 'Each roll hermetically sealed in moisture-proof foil/poly pouch.',
    relatedArticleSlugs: ['orthopedic-casting-best-practices'],
  },
  {
    id: 'prod-14',
    slug: 'eye-patch',
    code: 'SM-EP-14',
    nameAr: 'لاصق عين باتش',
    nameEn: 'Eye Patch',
    categorySlug: 'dressings-tapes',
    categoryNameAr: 'الضمادات واللواصق الطبية',
    categoryNameEn: 'Dressings & Medical Tapes',
    shortDescAr: 'لاصق عين بيضاوي.',
    shortDescEn: 'Sterile oval self-adhesive ophthalmic eye pad with non-adherent central cushion.',
    aboutAr:
      'ضمادة عين طبية بيضاوية الشكل ذاتية اللصق، مزودة بوسادة داخلية ناعمة غير لاصقة بالجرح ومحيط لاصق لطيف على البشرة الحساسة حول العين.',
    aboutEn:
      'Anatomically contoured oval ophthalmic dressing featuring a soft absorbent non-adherent central pad and a breathable hypoallergenic adhesive border.',
    featured: false,
    images: ['/images/eye-patch.webp'],
    advantages: [
      'تصميم بيضاوي تشريحي يناسب تجويف العين بإحكام وراحة',
      'وسادة وسطية ناعمة وعالية الامتصاص لا تلتصق بالعين',
      'غراء طبي لطيف سهل الإزالة دون ألم',
    ],
    advantagesEn: [
      'Ergonomic oval contour fits comfortably over the orbital area',
      'Soft non-adherent absorbent central pad protects the eye',
      'Gentle hypoallergenic adhesive removes cleanly without irritation',
    ],
    uses: [
      'عيادات ومراكز طب وجراحة العيون',
      'حماية العين بعد العمليات الجراحية أو الفحوصات',
      'علاج كسل العين لدى الأطفال والكبار',
    ],
    usesEn: [
      'Ophthalmology clinics & eye surgery centers',
      'Post-operative ocular protection and corneal shielding',
      'Pediatric amblyopia (lazy eye) occlusion therapy',
    ],
    specs: [
      {
        label: 'المقاسات',
        value: 'كبار / أطفال',
        labelEn: 'Sizes',
        valueEn: 'Adult / Pediatric',
      },
      {
        label: 'الخامة',
        value: 'قماش غير منسوج مسامي مع وسادة قطنية معقمة',
        labelEn: 'Material',
        valueEn: 'Breathable spunlace nonwoven with sterile absorbent cotton pad',
      },
    ],
    packaging: 'مغلف فرديًا ومعقم داخل علب كرتونية.',
    packagingEn: 'Individually sterile peel-packed in dispenser boxes.',
    relatedArticleSlugs: ['silk-medical-tape-skin-safety'],
  },
];

export const SECTORS: Sector[] = [
  {
    id: 'sec-1',
    slug: 'hospitals',
    nameAr: 'المستشفيات',
    nameEn: 'Hospitals',
    descriptionAr: 'مستهلكات أحادية الاستخدام لغرف العمليات والأقسام الداخلية والطوارئ.',
    descriptionEn:
      'Single-use medical disposables for operating rooms, ICU, inpatient wards, and emergency departments.',
    iconName: 'hospital',
    linkedCategories: [
      { label: 'المفارش والمستهلكات الطبية', labelEn: 'Medical Sheets & Consumables', slug: 'sheets-consumables' },
      { label: 'مستلزمات العمليات', labelEn: 'Surgical Supplies', slug: 'surgical' },
      { label: 'مستلزمات التعقيم والتخلص من النفايات', labelEn: 'Sterilization & Waste Disposal', slug: 'waste-disposal' },
    ],
  },
  {
    id: 'sec-2',
    slug: 'medical-centers',
    nameAr: 'المراكز الطبية',
    nameEn: 'Medical Centers',
    descriptionAr: 'مستلزمات يومية للفحص والرعاية والتعامل الآمن مع النفايات.',
    descriptionEn:
      'Daily examination consumables, patient care supplies, and safe clinical waste management.',
    iconName: 'heart',
    linkedCategories: [
      { label: 'المفارش والمستهلكات الطبية', labelEn: 'Medical Sheets & Consumables', slug: 'sheets-consumables' },
      { label: 'مستلزمات طبية متنوعة', labelEn: 'Miscellaneous Supplies', slug: 'miscellaneous' },
    ],
  },
  {
    id: 'sec-3',
    slug: 'clinics',
    nameAr: 'العيادات',
    nameEn: 'Clinics',
    descriptionAr: 'مفارش ولواصق ومستلزمات عملية لسير العمل اليومي.',
    descriptionEn:
      'Practical bed rolls, medical tapes, and hygiene consumables for smooth daily clinical workflows.',
    iconName: 'stethoscope',
    linkedCategories: [
      { label: 'المفارش والمستهلكات الطبية', labelEn: 'Medical Sheets & Consumables', slug: 'sheets-consumables' },
      { label: 'الضمادات واللواصق الطبية', labelEn: 'Dressings & Tapes', slug: 'dressings-tapes' },
    ],
  },
  {
    id: 'sec-4',
    slug: 'dental-centers',
    nameAr: 'مراكز الأسنان',
    nameEn: 'Dental Centers',
    descriptionAr: 'مفارش أسنان وحلول للتخلص من الأدوات الحادة.',
    descriptionEn:
      '3-layer leak-proof dental bibs, tissue rolls, and WHO-compliant sharps containers.',
    iconName: 'smile',
    linkedCategories: [
      { label: 'المفارش والمستهلكات الطبية', labelEn: 'Medical Sheets & Consumables', slug: 'sheets-consumables' },
      { label: 'مستلزمات التعقيم والتخلص من النفايات', labelEn: 'Sterilization & Waste Disposal', slug: 'waste-disposal' },
    ],
  },
  {
    id: 'sec-5',
    slug: 'supply-companies',
    nameAr: 'شركات التوريدات الطبية',
    nameEn: 'Medical Supply Companies',
    descriptionAr: 'توريد بكميات مع إمكانية تخصيص الألوان والتغليف حسب الطلب.',
    descriptionEn:
      'High-volume factory supply with full OEM customization of dimensions, colors, and private-label packaging.',
    iconName: 'truck',
    linkedCategories: [{ label: 'كل المنتجات', labelEn: 'All Products', slug: 'all' }],
  },
  {
    id: 'sec-6',
    slug: 'distributors',
    nameAr: 'الموزعون',
    nameEn: 'Distributors',
    descriptionAr: 'مجموعة منتجات متنوعة تخدم أكثر من قطاع طبي.',
    descriptionEn:
      'Diverse, fast-moving disposable medical portfolio serving multiple healthcare sectors nationwide.',
    iconName: 'network',
    linkedCategories: [{ label: 'كل المنتجات', labelEn: 'All Products', slug: 'all' }],
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'medical-sheets-infection-control',
    titleAr: 'دور المفارش الطبية أحادية الاستخدام في مكافحة العدوى داخل المستشفيات وعيادات الأسنان',
    titleEn: 'Role of Single-Use Medical Sheets in Dental & Hospital Infection Control',
    categorySlug: 'sheets-consumables',
    categoryAr: 'المفارش والمستهلكات الطبية',
    categoryEn: 'Medical Sheets & Consumables',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    publishedDateAr: '15 مارس 2026',
    publishedDateEn: 'March 15, 2026',
    image: '/images/dental-bibs-1.webp',
    excerptAr:
      'تعرف على المواصفات القياسية لمفارش الأسنان ثلاثية الطبقات ومفارش الترولي، وكيف تسهم طبقة البولي إيثيلين العازلة مع التيشو عالي الامتصاص في منع انتقال العدوى.',
    excerptEn:
      'Discover the technical standards of 3-ply dental bibs and perforated trolley rolls, and how virgin tissue bonded with a PE barrier prevents cross-contamination.',
    keyTakeaways: [
      'التركيب ثلاثي الطبقات (2 طبقة تيشو + طبقة PE فيلم) يمنع نفاذ السوائل والرذاذ للأسطح والملابس.',
      'المقاس العالمي 33 × 45 سم لمفارش الأسنان يوفر تغطية مثالية لصدر المريض أثناء الإجراءات السنية.',
      'استخدام رولات مفارش الكشف المثقبة يقلل زمن تجهيز العيادة بين كل مريض وآخر.',
    ],
    keyTakeawaysEn: [
      '3-Ply lamination (2-ply tissue + 1-ply PE film) blocks fluid and aerosol strikethrough.',
      'Universal 33 × 45 cm dimensions ensure full chest coverage during dental procedures.',
      'Pre-perforated trolley rolls speed up examination room turnover between patients.',
    ],
    sections: [
      {
        heading: 'أهمية الحواجز الواقية أحادية الاستخدام في العيادات',
        headingEn: 'Importance of Single-Use Protective Barriers in Clinical Settings',
        paragraphs: [
          'تُعد بيئة عيادات الأسنان والفحص السريري من أكثر البيئات الطبية تعرضًا للرذاذ والسوائل الحيوية. لذلك يعتمد بروتوكول مكافحة العدوى الحديث على استخدام المفارش الطبية أحادية الاستخدام (Disposable Medical Bibs & Rolls) كخط دفاع أول لحماية المريض والأسطح الطبية.',
          'في مصانع سيرجي ميد للصناعات الطبية، يتم تصنيع مفرش الأسنان من ثلاث طبقات مدمجة حراريًا لضمان عدم انفصال الطبقات أثناء الاستخدام الفعلي في العيادات.',
        ],
        paragraphsEn: [
          'Dental clinics and outpatient procedure rooms are constantly exposed to biological splashes and aerosols. Modern infection control protocols rely on single-use disposable bibs and examination rolls as the primary barrier protecting both patients and clinical surfaces.',
          'At Surgy Med factories, our dental bibs are thermally embossed from three integrated layers so the plies never delaminate during active clinical use.',
        ],
        bullets: [
          'طبقتان علويتان من التيشو الطبي النقي لامتصاص السوائل فور ملامستها.',
          'طبقة سفلية من البلاستيك فيلم (PE Film) المقاوم للتسرب لمنع وصول البلل إلى ملابس المريض.',
          'نسيج مضلع (Embossed) يساعد على حبس السوائل ومنع انزلاقها على السطح.',
        ],
        bulletsEn: [
          'Two upper layers of 100% virgin tissue for rapid fluid absorption.',
          'Impervious bottom Polyethylene (PE) film prevents liquid strikethrough.',
          'Horizontal embossing channels trap moisture and prevent runoff.',
        ],
      },
      {
        heading: 'كيف تفرّق بين المفرش الطبي القياسي والمفارش التجارية؟',
        headingEn: 'How to Evaluate Medical-Grade Bibs vs. Commercial Alternatives',
        paragraphs: [
          'عند اختيار مفارش الأسنان أو رولات أسرّة الكشف للمراكز الطبية، يجب التحقق من كثافة طبقة السليلوز وسماكة فيلم البولي إيثيلين، بالإضافة إلى ثبات الألوان الطبية وعدم تسببها في أي تهيّج للبشرة.',
        ],
        paragraphsEn: [
          'Healthcare procurement teams should verify cellulose basis weight, PE film pinhole resistance, colorfastness, and skin biocompatibility before approving bulk supply contracts.',
        ],
      },
    ],
    relatedProductSlugs: ['dental-bibs', 'trolley-sheet-roll', 'tissue-roll', 'surgical-apron'],
  },
  {
    id: 'art-2',
    slug: 'underpads-sap-technology',
    titleAr: 'تقنية الطبقات الأربع وبوليمرات الامتصاص الفائق (SAP) في مفارش الرعاية الطويلة',
    titleEn: '4-Layer SAP Absorption Technology in Long-Term Care Underpads',
    categorySlug: 'sheets-consumables',
    categoryAr: 'تقنيات التصنيع الطبي',
    categoryEn: 'Medical Manufacturing Tech',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    publishedDateAr: '22 مارس 2026',
    publishedDateEn: 'March 22, 2026',
    image: '/images/underpads.webp',
    excerptAr:
      'شرح تفصيلي لهندسة الطبقات الأربع في مفارش كبار السن (Underpads) ودور حبيبات الهلام الممتص SAP في الحفاظ على جفاف البشرة والوقاية من قرح الفراش.',
    excerptEn:
      'An engineering breakdown of 4-layer medical underpads and how Super Absorbent Polymer (SAP) locks moisture away to protect skin integrity in ICU and geriatric care.',
    keyTakeaways: [
      'تحوّل حبيبات البوليمر الفائق (SAP) السوائل إلى هلام متماسك يمنع الارتجاع للسطح.',
      'الطبقة العلوية غير المنسوجة (Nonwoven) تسمح بمرور السوائل في اتجاه واحد وتحافظ على نعومة الملمس.',
      'تتوفر مقاسات 60×90 سم و90×180 سم لتناسب أسرّة الرعاية المركزة والرعاية المنزلية.',
    ],
    keyTakeawaysEn: [
      'SAP granules convert liquid into a locked gel, preventing re-wetting under pressure.',
      'One-way hydrophilic nonwoven top sheet keeps the patient skin surface dry and comfortable.',
      'Available in 60×90 cm and 90×180 cm sizes with full OEM customization options.',
    ],
    sections: [
      {
        heading: 'البنية الهندسية لمفرش كبار السن رباعي الطبقات',
        headingEn: 'Engineering Architecture of the 4-Layer Underpad',
        paragraphs: [
          'تتطلب أقسام الرعاية المركزة ورعاية كبار السن مفارش سرير ذات قدرة استيعابية عالية تحمي الجلد من الرطوبة المستمرة، وهي العامل الرئيسي المسبب لقرح الفراش والالتهابات الجلدية.',
          'تعتمد سيرجي ميد في تصنيع مفارش كبار السن على نظام رباعي الطبقات يوزع السوائل بالتساوي عبر ألياف السليلوز المطحون ثم يحبسها داخل حبيبات الهلام الممتص (Super Absorbent Polymer).',
        ],
        paragraphsEn: [
          'Intensive care units and long-term geriatric care require bed pads capable of rapid fluid acquisition and retention to prevent skin maceration and pressure ulcers.',
          'Surgy Med engineers a balanced 4-layer structure that channels liquids across defibrated cellulose pulp and locks them inside Super Absorbent Polymer (SAP) crystals.',
        ],
        bullets: [
          'الطبقة الأولى: قماش غير منسوج (Nonwoven) ناعم ولطيف على البشرة الحساسة.',
          'الطبقة الثانية: طبقة توجيه وتوزيع السوائل لمنع التكتل.',
          'الطبقة الثالثة: لب السليلوز المدمج مع هلام SAP عالي الامتصاص.',
          'الطبقة الرابعة: فيلم بولي إيثيلين مانع للتسرب والانزلاق على المرتبة.',
        ],
        bulletsEn: [
          'Layer 1: Soft spunbond nonwoven top sheet gentle on fragile skin.',
          'Layer 2: Fluid acquisition and distribution tissue layer.',
          'Layer 3: Virgin cellulose fluff pulp blended with high-capacity SAP.',
          'Layer 4: Waterproof non-slip Polyethylene barrier backsheet.',
        ],
      },
      {
        heading: 'خيارات التخصيص والتوريد للمستشفيات وشركات التوزيع',
        headingEn: 'OEM Customization & Bulk Hospital Supply',
        paragraphs: [
          'يوفر مصنع سيرجي ميد إمكانية إنتاج مفارش كبار السن بمقاسات وأوزان امتصاص متعددة، مع إمكانية طباعة العلامة التجارية للعميل وتخصيص ألوان الفيلم السفلي والتغليف لطلبات الجملة والتوريدات.',
        ],
        paragraphsEn: [
          'Surgy Med provides custom OEM production runs (starting from 100,000 pcs for private label) allowing distributors and hospital groups to specify SAP gram-weight, backsheet color, and custom printed polybags.',
        ],
      },
    ],
    relatedProductSlugs: ['underpads', 'urine-bag', 'dental-bibs'],
  },
  {
    id: 'art-3',
    slug: 'sharps-disposal-who-standards',
    titleAr: 'المعايير الدولية (WHO / UN3291) للتخلص الآمن من الأدوات الطبية الحادة والنفايات الخطرة',
    titleEn: 'WHO & UN3291 Standards for Safe Sharps & Biohazard Waste Disposal',
    categorySlug: 'waste-disposal',
    categoryAr: 'السلامة المهنية والتعقيم',
    categoryEn: 'Occupational Safety & Waste',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    publishedDateAr: '29 مارس 2026',
    publishedDateEn: 'March 29, 2026',
    image: '/images/sharps-box.webp',
    excerptAr:
      'كيف تحمي صناديق الأمان (Sharps Box) رباعية الطبقات المبطنة بالألومنيوم الطاقم الطبي من وخز الإبر، وما هي اشتراطات مقاومة الاختراق وفق معيار UN3291؟',
    excerptEn:
      'How 4-layer aluminum-lined safety boxes protect medical staff from needle-stick injuries and meet ≥150N puncture resistance under WHO/UN3291 standards.',
    keyTakeaways: [
      'مقاومة اختراق لا تقل عن 150 نيوتن على الجدران الجانبية بفضل 4 طبقات كرتون مدمج ورقائق ألومنيوم.',
      'غطاء إغلاق نهائي أحادي الاتجاه يمنع سقوط أو إخراج السنون بعد التخلص منها.',
      'فرز النفايات الطبية باستخدام أكياس Biohazard الملونة (أحمر / أصفر / أسود) يضمن سلامة النقل والمعالجة.',
    ],
    keyTakeawaysEn: [
      'Side-wall puncture resistance ≥ 150 Newtons via 4-layer compressed board + aluminum foil.',
      'One-way drop port and permanent terminal lock prevent accidental needle spillage.',
      'Color-coded Biohazard waste bags (Red, Yellow, Black) streamline hospital waste segregation.',
    ],
    sections: [
      {
        heading: 'مخاطر وخز الإبر وأهمية صناديق الأمان القياسية',
        headingEn: 'Preventing Needle-Stick Injuries with Engineered Safety Boxes',
        paragraphs: [
          'تُعد إصابات وخز الإبر والمشارط الجراحية من أبرز المخاطر المهنية التي تواجه الأطباء وهيئة التمريض وعمال النظافة في المنشآت الصحية. لذلك تشترط منظمة الصحة العالمية (WHO) استخدام حاويات مخصصة مقاومة للثقب والتسرب.',
          'يتميز صندوق عادم السنون (Sharps Box) من سيرجي ميد بتصميم هندسي من 4 طبقات كرتون مدمج مبطن من الداخل برقائق ألومنيوم معالجة ضد الاختراق والتشرب، وطبقة سلوفان خارجية للحماية من البلل.',
        ],
        paragraphsEn: [
          'Needle-stick and scalpel injuries represent a major occupational hazard for clinicians, nurses, and waste handlers. World Health Organization (WHO) guidelines mandate puncture-proof, leak-resistant sharps containers at every point of care.',
          'Surgy Med Sharps Boxes are constructed from 4 layers of high-density compressed board internally lined with treated aluminum foil and externally laminated with moisture-proof cellophane.',
        ],
        bullets: [
          'متوفر بأربع سعات قياسية: 5 لتر، 7 لتر، 10 لتر، و12 لتر.',
          'يُشحن مسطحًا لتوفير أكثر من 80% من مساحة التخزين في مخازن المستشفيات.',
          'مزود بيد حمل علوية مدمجة وبيانات تحذيرية واضحة مطابقة للمواصفة UN3291.',
        ],
        bulletsEn: [
          'Available in 4 clinical capacities: 5L, 7L, 10L, and 12L.',
          'Flat-packed design saves over 80% of hospital warehouse space.',
          'Integrated carry handle and UN3291 biohazard markings.',
        ],
      },
      {
        heading: 'التكامل بين صناديق السنون وأكياس النفايات الطبية',
        headingEn: 'Integrating Sharps Containers with Color-Coded Biohazard Bags',
        paragraphs: [
          'إلى جانب صناديق الأدوات الحادة، يتطلب نظام مكافحة العدوى استخدام أكياس نفايات طبية عالية السماكة مطبوعة بشعار الخطر الحيوي (Biohazard) ومصنفة لونيًا لفصل النفايات المعدية عن النفايات العامة.',
        ],
        paragraphsEn: [
          'Complete waste compliance combines sharps containers with heavy-gauge Biohazard waste bags featuring printed tracking panels for department, date, and waste category.',
        ],
      },
    ],
    relatedProductSlugs: ['sharps-box', 'medical-waste-bags'],
  },
  {
    id: 'art-4',
    slug: 'silk-medical-tape-skin-safety',
    titleAr: 'كيف تختار اللاصق الطبي الحريري المناسب للبشرة الحساسة وتثبيت القساطر والضمادات؟',
    titleEn: 'Selecting Hypoallergenic Silk Medical Tape for Sensitive Skin & Catheter Fixation',
    categorySlug: 'dressings-tapes',
    categoryAr: 'الضمادات واللواصق الطبية',
    categoryEn: 'Dressings & Medical Tapes',
    readTimeAr: '3 دقائق قراءة',
    readTimeEn: '3 min read',
    publishedDateAr: '4 أبريل 2026',
    publishedDateEn: 'April 4, 2026',
    image: '/images/silk-medical-tape.webp',
    excerptAr:
      'مزايا اللاصق الطبي الحريري المسامي القابل للقطع باليد طوليًا وعرضيًا، وكيف يوازن بين قوة التثبيت للأنابيب والقساطر وبين الإزالة النظيفة دون ترك بقايا غراء.',
    excerptEn:
      'Why breathable, hand-tearable woven silk surgical tape is the gold standard for securing cannulas, catheters, and dressings without leaving adhesive residue.',
    keyTakeaways: [
      'نسيج الحرير الطبي المسامي يسمح بتهوية الجلد ويقلل الالتهابات عند التثبيت لفترات طويلة.',
      'قابلية القطع باليد في الاتجاهين الطولي والعرضي تمنح المسعفين والتمريض سرعة فائقة أثناء الطوارئ.',
      'متوفر بخمسة مقاسات قياسية (1.25 سم حتى 10 سم) لتغطية كافة التطبيقات الجراحية.',
    ],
    keyTakeawaysEn: [
      'Air-permeable woven silk backing prevents skin maceration during extended wear.',
      'Bidirectional hand-tearability eliminates the need for scissors in emergency care.',
      'Five widths (1.25 cm to 10 cm) cover everything from IV lines to large surgical dressings.',
    ],
    sections: [
      {
        heading: 'تحديات تثبيت الضمادات والقساطر على البشرة الحساسة',
        headingEn: 'Balancing High Adhesion with Skin Integrity',
        paragraphs: [
          'يحتاج المرضى في أقسام الرعاية المركزة والعمليات إلى تثبيت الكانيولا والقساطر والضمادات لفترات ممتدة. اللواصق التقليدية غير المسامية قد تسبب تعرق الجلد وتهيجه أو تترك بقايا غراء مؤلمة عند الإزالة.',
          'صُمم لاصق طبي حرير سيرجي ميد بطبقة متوازنة من الغراء الطبي النقي على نسيج حريري يسمح بمرور الهواء، ما يمنح ثباتًا محكمًا مع إزالة لطيفة ونظيفة.',
        ],
        paragraphsEn: [
          'ICU and post-operative patients require reliable fixation of IV cannulas, tubing, and wound dressings. Occlusive tapes can trap sweat and irritate fragile skin.',
          'Surgy Med Silk Medical Tape pairs an air-permeable woven silk cloth with a pure medical-grade adhesive for dependable hold and clean, painless removal.',
        ],
        bullets: [
          'مقاسات 1.25 سم و2.5 سم لتثبيت الكانيولا وأنابيب التغذية الدقيقة.',
          'مقاسات 5 سم و7.5 سم و10 سم لتثبيت الضمادات الجراحية الكبيرة.',
          'ضمادات العين البيضاوية (Eye Patch) بوسادة وسطية غير لاصقة لحماية منطقة ما حول العين.',
        ],
        bulletsEn: [
          '1.25 cm & 2.5 cm widths for IV cannulas and nasal tubes.',
          '5 cm, 7.5 cm & 10 cm widths for abdominal and orthopedic dressings.',
          'Contoured sterile Eye Patches with non-adherent pads for delicate ocular care.',
        ],
      },
    ],
    relatedProductSlugs: ['silk-medical-tape', 'eye-patch'],
  },
  {
    id: 'art-5',
    slug: 'orthopedic-casting-best-practices',
    titleAr: 'دليل استخدام أربطة الجبس الطبي ورباط التبطين القطني لتثبيت الكسور بأمان',
    titleEn: 'Clinical Guide to Plaster of Paris Bandages & Under-Cast Cotton Padding',
    categorySlug: 'orthopedic',
    categoryAr: 'مستلزمات العظام',
    categoryEn: 'Orthopedic Supplies',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    publishedDateAr: '10 أبريل 2026',
    publishedDateEn: 'April 10, 2026',
    image: '/images/plaster-bandage.webp',
    excerptAr:
      'أهمية التكامل بين رباط تحت الجبس القطني الناعم ورباط الجبس الطبي سريع التصلب لحماية النتوءات العظمية وضمان صلابة القالب الجبسي في أقسام العظام والطوارئ.',
    excerptEn:
      'How breathable under-cast cotton padding and uniformly impregnated Plaster of Paris bandages work together for safe, durable fracture immobilization.',
    keyTakeaways: [
      'التشبع المتجانس للشاش القطني بجبس باريس النقي يضمن تصلبًا سريعًا وفاقدًا منخفضًا أثناء الغمر.',
      'رباط تحت الجبس يحمي الجلد من الحرارة الناتجة عن تفاعل التصلب ومن الاحتكاك الميكانيكي.',
      'تعدد العروض (5 سم إلى 20 سم) يتيح تشكيلًا دقيقًا للأطراف العلوية والسفلية.',
    ],
    keyTakeawaysEn: [
      'Uniform Plaster of Paris impregnation ensures low gypsum loss and high cast strength.',
      'Under-cast padding shields bony prominences from pressure and setting heat.',
      'Multiple roll widths (5 cm to 20 cm) support upper and lower extremity casting.',
    ],
    sections: [
      {
        heading: 'خطوات التثبيت الآمن للكسور في أقسام الطوارئ',
        headingEn: 'Best Practices for Safe Orthopedic Casting',
        paragraphs: [
          'يعتمد نجاح القالب الجبسي في جراحة العظام على عاملين أساسيين: جودة التبطين الداخلي الملامس لجلد المريض، وتجانس طبقة الجبس المشبعة في الشاش الطبي.',
          'يوفر رباط تحت الجبس (Under-Cast Padding) من سيرجي ميد طبقة قطنية مسامية ناعمة تحمي النتوءات العظمية وتمتص الرطوبة، بينما يمنح رباط الجبس الطبي صلابة متوازنة وسهولة في التشكيل حول المفاصل.',
        ],
        paragraphsEn: [
          'Successful fracture immobilization depends on both protective internal cushioning and uniform exterior cast rigidity.',
          'Surgy Med Under-Cast Padding provides a soft, breathable barrier over bony prominences, while our Plaster of Paris Bandage delivers smooth molding and dependable setting times.',
        ],
        bullets: [
          'تغليف فردي مقاوم للرطوبة يحافظ على كفاءة الجبس الطبي طوال فترة التخزين.',
          'ملمس ناعم للحواف بعد التصلب يمنع خدش الجلد.',
        ],
        bulletsEn: [
          'Moisture-proof individual packaging preserves gypsum reactivity during storage.',
          'Smooth cast finish prevents edge chafing.',
        ],
      },
    ],
    relatedProductSlugs: ['plaster-bandage', 'under-cast-padding'],
  },
  {
    id: 'art-6',
    slug: 'hospital-supply-chain-customization',
    titleAr: 'معايير التوريد الطبي للمستشفيات وشركات التوزيع: أهمية تخصيص المقاسات والتغليف (OEM)',
    titleEn: 'Medical Supply Chain Standards & Custom OEM Manufacturing for Hospitals',
    categorySlug: 'miscellaneous',
    categoryAr: 'سلاسل الإمداد والتوريد الطبي',
    categoryEn: 'Medical Supply Chain & OEM',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    publishedDateAr: '17 أبريل 2026',
    publishedDateEn: 'April 17, 2026',
    image: '/images/cat-misc.webp',
    excerptAr:
      'كيف يدعم التصنيع المحلي في مصانع سيرجي ميد بالمنطقة الصناعية بتلا استقرار سلاسل الإمداد الطبي للمستشفيات وشركات التوريدات مع خيارات التخصيص الكامل.',
    excerptEn:
      'How direct factory procurement from Surgy Med’s industrial facilities in Tala secures hospital supply chains and enables full OEM private-label customization.',
    keyTakeaways: [
      'التوريد المباشر من المصنع يضمن ثبات المواصفات الفنية وتوافر الكميات القياسية على مدار العام.',
      'إمكانية تخصيص الألوان والمقاسات وطباعة العلامة التجارية لشركات التوريدات والمستشفيات الكبرى.',
      'تنوع خطوط الإنتاج يتيح تجميع طلبات متعددة (مفارش، لواصق، صناديق أمان، ومستهلكات) من مصدر صناعي واحد.',
    ],
    keyTakeawaysEn: [
      'Direct factory sourcing guarantees consistent technical specs and year-round availability.',
      'Full OEM private-label customization of dimensions, colors, and packaging.',
      'Consolidated procurement across 6 disposable product lines from a single industrial manufacturer.',
    ],
    sections: [
      {
        heading: 'مزايا التعاقد المباشر مع المصنع للمنشآت الصحية وشركات التوزيع',
        headingEn: 'Advantages of Direct Factory Contracting for Healthcare Institutions',
        paragraphs: [
          'تواجه إدارات المشتريات في المستشفيات وشركات التوريدات الطبية تحديًا مستمرًا في تأمين مستهلكات طبية ذات جودة ثابتة ومواصفات موثقة مع التزام دقيق بمواعيد التسليم.',
          'من خلال مصانعها في المنطقة الصناعية بمدينة تلا (مصنع 110 ومصنع 307)، تقدم سيرجي ميد للصناعات الطبية منظومة تصنيع وتوريد مرنة تخدم المستشفيات والمراكز الطبية والموزعين في جميع محافظات مصر والتصدير.',
        ],
        paragraphsEn: [
          'Hospital procurement departments and medical distributors require documented product specifications, batch traceability, and reliable delivery schedules.',
          'Operating from Factory No. 110 and Factory No. 307 in the Tala Industrial Zone, Surgy Med delivers scalable manufacturing and export-ready medical disposables.',
        ],
        bullets: [
          'مرونة في تخصيص المقاسات والألوان والتغليف حسب اشتراطات العميل.',
          'تتبع دقيق لبيانات التشغيلات وتاريخ الإنتاج على كافة العبوات.',
          'تشكيلة متكاملة تشمل جل الموجات الصوتية، أساور تعريف المرضى، أكياس جمع البول، ومرايل العمليات.',
        ],
        bulletsEn: [
          'Custom sizing, color matching, and private-label packaging.',
          'Complete lot number and production date traceability on every package.',
          'Comprehensive portfolio including ultrasound gel, patient ID bands, urine bags, and surgical aprons.',
        ],
      },
    ],
    relatedProductSlugs: ['ultrasound-gel', 'patient-id-bracelet', 'surgical-apron', 'urine-bag'],
  },
];

export const GOVERNORATES: string[] = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'القليوبية',
  'المنوفية',
  'الغربية',
  'الدقهلية',
  'الشرقية',
  'كفر الشيخ',
  'دمياط',
  'البحيرة',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
  'خارج مصر',
];

export const GOVERNORATES_EN: string[] = [
  'Cairo',
  'Giza',
  'Alexandria',
  'Qalyubia',
  'Menofia',
  'Gharbia',
  'Dakahlia',
  'Sharqia',
  'Kafr El Sheikh',
  'Damietta',
  'Beheira',
  'Port Said',
  'Ismailia',
  'Suez',
  'Fayoum',
  'Beni Suef',
  'Minya',
  'Assiut',
  'Sohag',
  'Qena',
  'Luxor',
  'Aswan',
  'Red Sea',
  'New Valley',
  'Matrouh',
  'North Sinai',
  'South Sinai',
  'International / Outside Egypt',
];

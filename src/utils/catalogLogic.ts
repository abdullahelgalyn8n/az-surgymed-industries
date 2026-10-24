import {
  Product,
  Article,
  Category,
  Sector,
  COMPANY_INFO,
  PRODUCTS,
  ARTICLES,
  CATEGORIES,
  SECTORS,
} from '../data/surgymedData';

export type SortOption = 'featured' | 'alphabetical' | 'newest';

export interface FilterParams {
  categorySlug?: string;
  searchQuery?: string;
  sortBy?: SortOption;
}

export function filterAndSortProducts(
  products: Product[],
  params: FilterParams
): Product[] {
  const { categorySlug = 'all', searchQuery = '', sortBy = 'featured' } = params;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory =
      !categorySlug ||
      categorySlug === 'all' ||
      product.categorySlug === categorySlug;

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      product.nameAr,
      product.nameEn,
      product.code,
      product.categoryNameAr,
      product.categoryNameEn,
      product.shortDescAr,
      product.shortDescEn,
      product.aboutAr,
      product.aboutEn,
      ...product.specs.map((s) => `${s.label} ${s.value} ${s.labelEn || ''} ${s.valueEn || ''}`),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const sorted = [...filtered];
  if (sortBy === 'alphabetical') {
    sorted.sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));
  } else if (sortBy === 'newest') {
    sorted.reverse();
  } else {
    sorted.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  return sorted;
}

export function filterArticles(
  articles: Article[],
  params: { categorySlug?: string; searchQuery?: string }
): Article[] {
  const { categorySlug = 'all', searchQuery = '' } = params;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesCategory =
      !categorySlug ||
      categorySlug === 'all' ||
      article.categorySlug === categorySlug;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchable = [
      article.titleAr,
      article.titleEn,
      article.categoryAr,
      article.categoryEn,
      article.excerptAr,
      article.excerptEn,
      ...article.keyTakeaways,
      ...article.keyTakeawaysEn,
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function getArticlesForProduct(product: Product, allArticles: Article[] = ARTICLES): Article[] {
  const explicit = allArticles.filter(
    (a) =>
      product.relatedArticleSlugs?.includes(a.slug) ||
      a.relatedProductSlugs?.includes(product.slug)
  );
  if (explicit.length >= 2) return explicit;

  const byCategory = allArticles.filter(
    (a) =>
      a.categorySlug === product.categorySlug &&
      !explicit.some((e) => e.slug === a.slug)
  );
  const combined = [...explicit, ...byCategory];
  if (combined.length >= 2) return combined.slice(0, 3);

  const fallback = allArticles.filter((a) => !combined.some((c) => c.slug === a.slug));
  return [...combined, ...fallback].slice(0, 3);
}

export interface UnifiedSearchResults {
  products: Product[];
  articles: Article[];
  categories: Category[];
  sectors: Sector[];
  totalCount: number;
}

export function searchSiteContent(
  query: string,
  categorySlug: string = 'all'
): UnifiedSearchResults {
  const q = query.trim().toLowerCase();

  const products = filterAndSortProducts(PRODUCTS, {
    categorySlug,
    searchQuery: q,
  });

  const articles = filterArticles(ARTICLES, {
    categorySlug,
    searchQuery: q,
  });

  const categories = CATEGORIES.filter((cat) => {
    if (categorySlug !== 'all' && cat.slug !== categorySlug) return false;
    if (!q) return true;
    return [cat.nameAr, cat.nameEn, cat.descriptionAr, cat.descriptionEn]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });

  const sectors = SECTORS.filter((sec) => {
    if (!q) return true;
    return [sec.nameAr, sec.nameEn, sec.descriptionAr, sec.descriptionEn]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });

  return {
    products,
    articles,
    categories,
    sectors,
    totalCount: products.length + articles.length + categories.length + sectors.length,
  };
}

export function toggleInquiryProduct(currentSlugs: string[], slug: string): string[] {
  if (currentSlugs.includes(slug)) {
    return currentSlugs.filter((s) => s !== slug);
  }
  return [...currentSlugs, slug];
}

export function buildProductWhatsAppUrl(
  product: Pick<Product, 'nameAr' | 'nameEn' | 'slug'>,
  lang: 'ar' | 'en' = 'ar'
): string {
  const text =
    lang === 'en'
      ? `Hello Surgy Med, I would like to inquire about the following medical product:\n\nProduct: ${product.nameEn || product.nameAr}\nLink: /products/${product.slug}\n\nPlease share technical details and supply terms. Thank you.`
      : `مرحبًا، أريد الاستفسار عن المنتج التالي من سيرجي ميد:\n\nالمنتج: ${product.nameAr}\nرابط المنتج: /products/${product.slug}\n\nيرجى إرسال التفاصيل المتاحة وشروط التوريد. شكرًا لكم.`;
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildGeneralWhatsAppUrl(
  customMessage?: string,
  lang: 'ar' | 'en' = 'ar'
): string {
  const text =
    customMessage ||
    (lang === 'en'
      ? 'Hello, I would like to inquire about Surgy Med medical products and supply terms.'
      : 'مرحبًا، أود الاستفسار عن منتجات سيرجي ميد.');
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export interface QuoteFormInput {
  name: string;
  company: string;
  phone: string;
  email?: string;
  governorate: string;
  quantity?: string;
  requestedProducts: string;
  details?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateQuoteForm(
  input: QuoteFormInput,
  lang: 'ar' | 'en' = 'ar'
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = lang === 'en' ? 'Please enter your full name' : 'يرجى إدخال الاسم بالكامل';
  }
  if (!input.company || input.company.trim().length < 2) {
    errors.company =
      lang === 'en' ? 'Please enter your company or facility name' : 'يرجى إدخال اسم الشركة أو المنشأة';
  }
  const cleanPhone = (input.phone || '').replace(/[\s\-+]/g, '');
  if (!cleanPhone || !/^\d{8,15}$/.test(cleanPhone)) {
    errors.phone = lang === 'en' ? 'Please enter a valid phone number' : 'يرجى إدخال رقم هاتف صحيح';
  }
  if (input.email && input.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.email =
        lang === 'en' ? 'Please enter a valid email address' : 'يرجى إدخال بريد إلكتروني صحيح';
    }
  }
  if (!input.governorate || input.governorate.trim() === '') {
    errors.governorate =
      lang === 'en' ? 'Please select a governorate / region' : 'يرجى اختيار المحافظة';
  }
  if (!input.requestedProducts || input.requestedProducts.trim().length < 2) {
    errors.requestedProducts =
      lang === 'en' ? 'Please specify the requested products' : 'يرجى تحديد المنتجات المطلوبة';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ContactFormInput {
  name: string;
  phone: string;
  company?: string;
  message: string;
}

export function validateContactForm(
  input: ContactFormInput,
  lang: 'ar' | 'en' = 'ar'
): ValidationResult {
  const errors: Record<string, string> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = lang === 'en' ? 'Please enter your name' : 'يرجى إدخال الاسم';
  }
  const cleanPhone = (input.phone || '').replace(/[\s\-+]/g, '');
  if (!cleanPhone || !/^\d{8,15}$/.test(cleanPhone)) {
    errors.phone = lang === 'en' ? 'Please enter a valid phone number' : 'يرجى إدخال رقم هاتف صحيح';
  }
  if (!input.message || input.message.trim().length < 5) {
    errors.message = lang === 'en' ? 'Please write your message' : 'يرجى كتابة رسالتك';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

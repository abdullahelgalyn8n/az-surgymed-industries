import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowUpLeft,
  ArrowUpRight,
  FileText,
  Package,
  Layers,
  Building2,
  BookOpen,
  X,
  Plus,
  Check,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  SECTORS,
  ARTICLES,
  Language,
} from '../data/surgymedData';
import { searchSiteContent } from '../utils/catalogLogic';
import { ProductCard } from '../components/ProductCard';
import { ArticleCard } from '../components/ArticleCard';
import { SmartImage } from '../components/SmartImage';

interface SearchPageProps {
  initialQuery?: string;
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

type SearchTab = 'all' | 'products' | 'datasheets' | 'articles' | 'sectors';

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const searchResults = useMemo(
    () => searchSiteContent(query, selectedCategory),
    [query, selectedCategory]
  );

  const displayedProducts = searchResults.products;
  const displayedArticles = searchResults.articles;
  const displayedCategories = searchResults.categories;
  const displayedSectors = searchResults.sectors;

  const popularTags = isEn
    ? [
        { label: 'Dental Bibs', q: 'Dental Bibs' },
        { label: 'Underpads SAP', q: 'Underpads' },
        { label: 'Sharps Container UN3291', q: 'Sharps' },
        { label: 'Silk Medical Tape', q: 'Silk' },
        { label: 'Sterilization Card', q: 'Sterilization' },
        { label: 'Exam Table Roll', q: 'Roll' },
        { label: 'Polyethylene Apron', q: 'Apron' },
      ]
    : [
        { label: 'مفرش الأسنان', q: 'مفرش الأسنان' },
        { label: 'مفرش كبار السن SAP', q: 'مفرش كبار السن' },
        { label: 'سيفتي بوكس UN3291', q: 'سيفتي بوكس' },
        { label: 'لاصق طبي حرير', q: 'حرير' },
        { label: 'كارت التعقيم', q: 'كارت التعقيم' },
        { label: 'رول الكشف الطبي', q: 'رول' },
        { label: 'مريلة بلاستيك', q: 'مريلة' },
      ];

  const tabs: {
    id: SearchTab;
    label: string;
    count: number;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'all',
      label: isEn ? 'All Results' : 'جميع النتائج',
      count:
        displayedProducts.length +
        displayedProducts.length +
        displayedArticles.length +
        displayedCategories.length +
        displayedSectors.length,
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'products',
      label: isEn ? 'Medical Products' : 'المنتجات الطبية',
      count: displayedProducts.length,
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: 'datasheets',
      label: isEn ? 'Catalog Datasheets' : 'النشرات الفنية بالكتالوج',
      count: displayedProducts.length,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'articles',
      label: isEn ? 'Medical Articles' : 'المقالات الطبية',
      count: displayedArticles.length,
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'sectors',
      label: isEn ? 'Categories & Sectors' : 'التصنيفات والقطاعات',
      count: displayedCategories.length + displayedSectors.length,
      icon: <Building2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Search Hero */}
      <section className="relative overflow-hidden bg-grid-pattern border-b border-[var(--border)]/60 py-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-start">
          <nav
            aria-label={isEn ? 'Breadcrumb' : 'مسار التنقل'}
            className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-[var(--heading)]"
            >
              {isEn ? 'Home' : 'الرئيسية'}
            </a>
            <span>/</span>
            <span className="text-[var(--medical)] font-semibold">
              {isEn ? 'Advanced Search' : 'محرك البحث الشامل'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--medical)] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)]" />
            <span className="font-en">SURGY MED DYNAMIC SEARCH ENGINE</span>
          </div>

          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] leading-tight">
              {isEn
                ? 'Search Products, Technical Datasheets & Medical Guides'
                : 'ابحث في المنتجات، النشرات الفنية، والمقالات الطبية'}
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              {isEn
                ? 'Instantly search across all 14 manufactured medical products, branched technical catalog datasheets, clinical articles, and healthcare sectors by name, code, raw material (SAP, PP, PE), or standard (WHO / UN3291).'
                : 'ابحث فورًا في جميع منتجات سيرجي ميد الـ 14، صفحات النشرات الفنية المتفرعة من الكتالوج، المقالات الطبية الـ 6، والقطاعات الصحية حسب الاسم أو الكود أو الخامة (SAP, PP, PE) أو المواصفة القياسية (WHO / UN3291).'}
            </p>
          </div>

          {/* Search Input Box */}
          <div className="max-w-3xl">
            <div className="relative flex items-center bg-[var(--card)] border-2 border-[var(--border)] focus-within:border-[var(--medical)] rounded-2xl px-4 py-3.5 shadow-sm transition-colors">
              <Search className="w-5 h-5 text-[var(--medical)] shrink-0 mx-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search by product name, code, raw material, size, or article topic (e.g., Dental Bibs, SAP, UN3291)...'
                    : 'اكتب اسم المنتج، الكود، الخامة، المقاس، أو موضوع المقال (مثال: مفرش الأسنان، SAP، UN3291، حرير)...'
                }
                aria-label={
                  isEn ? 'Search site content' : 'ابحث في محتوى الموقع'
                }
                className="w-full bg-transparent text-sm sm:text-base text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="px-3 py-1.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-xs font-semibold text-[var(--heading)] inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Clear' : 'مسح'}</span>
                </button>
              )}
            </div>

            {/* Popular Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--muted-foreground)]">
                {isEn ? 'Popular Searches:' : 'عمليات بحث شائعة:'}
              </span>
              {popularTags.map((tag) => {
                const active = query.toLowerCase() === tag.q.toLowerCase();
                return (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={() => setQuery(active ? '' : tag.q)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filter Tabs & Category Bar */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[26px] p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs'
                      : 'bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--card)] text-[var(--muted-foreground)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {(query || selectedCategory !== 'all' || activeTab !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                  setActiveTab('all');
                }}
                className="text-xs font-semibold text-[var(--brand-red)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isEn ? 'Reset Filters' : 'إعادة ضبط الفلاتر'}</span>
              </button>
            )}
          </div>

          {(activeTab === 'all' ||
            activeTab === 'products' ||
            activeTab === 'datasheets') && (
            <div className="pt-3 border-t border-[var(--border)] flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-[var(--muted-foreground)] inline-flex items-center gap-1.5 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--medical)]" />
                <span>{isEn ? 'Category:' : 'التصنيف:'}</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[var(--surface)] text-[var(--heading)] border border-[var(--medical)]/40'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--surface)]'
                }`}
              >
                {isEn ? 'All Categories' : 'كل التصنيفات'}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-[var(--surface)] text-[var(--heading)] font-semibold border border-[var(--medical)]/40'
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {isEn ? cat.nameEn : cat.nameAr}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {displayedProducts.length === 0 &&
          displayedArticles.length === 0 &&
          displayedCategories.length === 0 &&
          displayedSectors.length === 0 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-[28px] p-12 text-center space-y-4">
              <Search className="w-10 h-10 text-[var(--muted-foreground)] mx-auto" />
              <h2 className="text-xl font-bold text-[var(--heading)]">
                {isEn
                  ? `No exact results found for "${query}"`
                  : `لا توجد نتائج مطابقة لبحثك "${query}"`}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                {isEn
                  ? 'Try searching with a broader term (e.g., Bibs, Underpads, Sharps, Tape) or explore our full technical catalog.'
                  : 'جرب البحث بكلمات أعم (مثل: مفرش، رول، سيفتي بوكس، لاصق) أو استعرض الكتالوج الفني الكامل.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold cursor-pointer"
                >
                  {isEn ? 'Show All Content' : 'عرض جميع المحتويات'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/catalog')}
                  className="px-6 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--heading)] text-xs font-semibold cursor-pointer"
                >
                  {isEn ? 'Open Technical Catalog' : 'فتح الكتالوج الفني'}
                </button>
              </div>
            </div>
          )}

        {/* 1. Technical Datasheets Results (/catalog/[slug]) */}
        {(activeTab === 'all' || activeTab === 'datasheets') &&
          displayedProducts.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-start space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                    <FileText className="w-4 h-4" />
                    <span>
                      {isEn
                        ? 'TECHNICAL CATALOG DATASHEETS'
                        : 'النشرات الفنية المتفرعة من الكتالوج'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
                    {isEn
                      ? 'Product Technical Datasheets & Article Links'
                      : 'صفحات النشرات الفنية وربط المقالات العلمية'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/catalog')}
                  className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>{isEn ? 'Open Catalog Hub' : 'مركز الكتالوج الكامل'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedProducts
                  .slice(0, activeTab === 'datasheets' ? 14 : 6)
                  .map((product) => {
                    const isInInquiry = inquirySlugs.includes(product.slug);
                    return (
                      <div
                        key={`ds-${product.id}`}
                        onClick={() => onNavigate(`/catalog/${product.slug}`)}
                        className="group cursor-pointer bg-[var(--card)] border border-[var(--border)] hover:border-[var(--medical)]/60 rounded-[26px] p-5 flex flex-col justify-between gap-4 transition-all hover:shadow-md text-start"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-3.5">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--border)] p-2 shrink-0 flex items-center justify-center">
                              <SmartImage
                                src={product.images[0]}
                                alt={isEn ? product.nameEn : product.nameAr}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--medical)] mb-1">
                                {isEn ? 'Technical Datasheet' : 'نشرة فنية معتمدة'} ·{' '}
                                <span className="font-en">{product.code}</span>
                              </span>
                              <h3 className="text-base font-bold text-[var(--heading)] group-hover:text-[var(--medical)] transition-colors truncate">
                                {isEn ? product.nameEn : product.nameAr}
                              </h3>
                              <p className="text-xs text-[var(--muted-foreground)] line-clamp-1">
                                {isEn ? product.shortDescEn : product.shortDescAr}
                              </p>
                            </div>
                          </div>

                          <div className="bg-[var(--surface)]/60 rounded-2xl p-3 space-y-1.5 border border-[var(--border)]/60">
                            {product.specs.slice(0, 3).map((s, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs gap-2"
                              >
                                <span className="text-[var(--muted-foreground)]">
                                  {isEn ? s.labelEn || s.label : s.label}:
                                </span>
                                <span className="font-semibold text-[var(--heading)] truncate">
                                  {isEn ? s.valueEn || s.value : s.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[var(--medical)] inline-flex items-center gap-1">
                            <span>
                              {isEn
                                ? 'Open Datasheet & Linked Articles'
                                : 'افتح النشرة والمقالات المرتبطة'}
                            </span>
                            <ArrowIcon className="w-3.5 h-3.5" />
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleInquiry(product.slug);
                            }}
                            title={
                              isInInquiry
                                ? isEn
                                  ? 'Added to Inquiry'
                                  : 'مضاف للاستفسارات'
                                : isEn
                                ? 'Add to Inquiry'
                                : 'أضف للاستفسارات'
                            }
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                              isInInquiry
                                ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                                : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)]'
                            }`}
                          >
                            {isInInquiry ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

        {/* 2. Products Section */}
        {(activeTab === 'all' || activeTab === 'products') &&
          displayedProducts.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-start space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                    <Package className="w-4 h-4" />
                    <span>{isEn ? 'MEDICAL PRODUCTS' : 'المنتجات الطبية'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
                    {isEn
                      ? `Manufactured Medical Supplies (${displayedProducts.length})`
                      : `المنتجات والمستلزمات الطبية (${displayedProducts.length})`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/products')}
                  className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>{isEn ? 'All Products' : 'صفحة المنتجات'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                    isInInquiry={inquirySlugs.includes(product.slug)}
                    onToggleInquiry={onToggleInquiry}
                    lang={lang}
                  />
                ))}
              </div>
            </section>
          )}

        {/* 3. Articles Section */}
        {(activeTab === 'all' || activeTab === 'articles') &&
          displayedArticles.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-start space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {isEn
                        ? 'MEDICAL & TECHNICAL ARTICLES'
                        : 'المقالات والأدلة الإرشادية'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
                    {isEn
                      ? `Clinical Insights & Procurement Guides (${displayedArticles.length})`
                      : `المقالات الطبية ودراسات المواصفات (${displayedArticles.length})`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/articles')}
                  className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>{isEn ? 'All Articles' : 'جميع المقالات'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onNavigate={onNavigate}
                    lang={lang}
                  />
                ))}
              </div>
            </section>
          )}

        {/* 4. Categories & Sectors Section */}
        {(activeTab === 'all' || activeTab === 'sectors') &&
          (displayedCategories.length > 0 || displayedSectors.length > 0) && (
            <section className="space-y-5">
              <div className="text-start space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                  <Layers className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'PRODUCTION LINES & SECTORS'
                      : 'خطوط الإنتاج والقطاعات الطبية'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
                  {isEn
                    ? 'Factory Divisions & Healthcare Sectors We Serve'
                    : 'أقسام التصنيع والقطاعات التي نخدمها'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedCategories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => onNavigate(`/products?category=${cat.slug}`)}
                    className="cursor-pointer bg-[var(--card)] border border-[var(--border)] hover:border-[var(--medical)] rounded-[24px] p-5 flex items-center gap-4 transition-all text-start"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--border)] p-2 shrink-0 flex items-center justify-center">
                      <SmartImage
                        src={cat.image}
                        alt={isEn ? cat.nameEn : cat.nameAr}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold text-[var(--medical)]">
                        {isEn
                          ? `Category · ${cat.count} Products`
                          : `تصنيف · ${cat.count} منتجات`}
                      </span>
                      <h3 className="text-base font-bold text-[var(--heading)] truncate">
                        {isEn ? cat.nameEn : cat.nameAr}
                      </h3>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-0.5">
                        {isEn ? cat.descriptionEn : cat.descriptionAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
      </div>
    </div>
  );
};

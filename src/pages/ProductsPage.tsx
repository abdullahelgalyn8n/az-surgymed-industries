import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  LayoutGrid,
  ListFilter,
  FileText,
  Plus,
  Check,
  ArrowUpLeft,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, Language } from '../data/surgymedData';
import {
  filterAndSortProducts,
  SortOption,
  buildProductWhatsAppUrl,
} from '../utils/catalogLogic';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppIcon } from '../components/Icons';

interface ProductsPageProps {
  initialCategory?: string;
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'all',
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    setSelectedCategory(initialCategory || 'all');
  }, [initialCategory]);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(PRODUCTS, {
        categorySlug: selectedCategory,
        searchQuery,
        sortBy,
      }),
    [selectedCategory, searchQuery, sortBy]
  );

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      onNavigate('/products');
    } else {
      onNavigate(`/products?category=${slug}`);
    }
  };

  return (
    <div className="space-y-10 pb-24">
      {/* ====================================================================
          1. ARCHITECTURAL STOREFRONT HEADER & COMMAND TOOLBAR
         ==================================================================== */}
      <section className="bg-grid-pattern border-b border-[var(--border)] pt-10 pb-10">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="text-start space-y-2.5 max-w-2xl">
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
                  {isEn ? 'Medical Products Store' : 'متجر المنتجات الطبية'}
                </span>
                {activeCategoryObj && (
                  <>
                    <span>/</span>
                    <span className="text-[var(--heading)] font-semibold">
                      {isEn
                        ? activeCategoryObj.nameEn
                        : activeCategoryObj.nameAr}
                    </span>
                  </>
                )}
              </nav>

              <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] tracking-tight">
                {activeCategoryObj
                  ? isEn
                    ? activeCategoryObj.nameEn
                    : activeCategoryObj.nameAr
                  : isEn
                  ? 'Surgy Med Medical Storefront'
                  : 'متجر منتجات سيرجي ميد'}
              </h1>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {activeCategoryObj
                  ? isEn
                    ? activeCategoryObj.descriptionEn
                    : activeCategoryObj.descriptionAr
                  : isEn
                  ? 'Browse all 14 manufactured single-use medical consumables across 6 specialized production lines. Switch between Studio Grid and B2B Order Table.'
                  : 'استعرض جميع منتجات ومستهلكات سيرجي ميد الـ 14 عبر 6 خطوط إنتاج متخصصة، مع إمكانية التبديل بين عرض البطاقات وجدول التوريد السريع للمستشفيات.'}
              </p>
            </div>

            {/* Quick Catalog & Quote Summary Actions */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
              <button
                type="button"
                onClick={() => onNavigate('/catalog')}
                className="bg-[var(--card)] hover:bg-[var(--surface)] text-[var(--heading)] border border-[var(--border)] text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-[var(--medical)]" />
                <span>
                  {isEn ? 'Technical Catalog (/catalog)' : 'الكتالوج الهندسي'}
                </span>
              </button>

              {inquirySlugs.length > 0 && (
                <button
                  type="button"
                  onClick={() => onNavigate('/quote')}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {isEn
                      ? `Request Quote (${inquirySlugs.length})`
                      : `طلب تسعير (${inquirySlugs.length})`}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Unified Storefront Control Bar: Search + Sort + View Mode + Category Tabs */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1 flex items-center bg-[var(--background)] border border-[var(--border)] focus-within:border-[var(--medical)] rounded-xl px-3.5 py-2.5">
                <Search className="w-4 h-4 text-[var(--muted-foreground)] mx-1.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Search by product name, reference code (e.g. SM-DB-01), or material...'
                      : 'ابحث باسم المنتج أو الكود المرجعي (مثل SM-DB-01) أو الخامة...'
                  }
                  aria-label={isEn ? 'Search products' : 'ابحث في المنتجات'}
                  className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--heading)] px-1.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort & View Switcher */}
              <div className="flex items-center gap-2.5 shrink-0">
                <select
                  id="sort-products-select"
                  aria-label={isEn ? 'Sort products' : 'ترتيب المنتجات'}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[var(--background)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[var(--heading)] focus:outline-none focus:border-[var(--medical)] cursor-pointer"
                >
                  <option value="featured">
                    {isEn ? 'Sort: Featured First' : 'الترتيب: المميزة أولًا'}
                  </option>
                  <option value="alphabetical">
                    {isEn ? 'Sort: Alphabetical' : 'الترتيب: أبجديًا'}
                  </option>
                  <option value="newest">
                    {isEn ? 'Sort: Newest' : 'الترتيب: الأحدث'}
                  </option>
                </select>

                {/* Segmented View Toggle: Grid vs B2B Order Table */}
                <div className="flex items-center bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                      viewMode === 'grid'
                        ? 'bg-[var(--card)] text-[var(--heading)] shadow-2xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--heading)]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {isEn ? 'Studio Grid' : 'شبكة المنتجات'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                      viewMode === 'table'
                        ? 'bg-[var(--card)] text-[var(--heading)] shadow-2xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--heading)]'
                    }`}
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {isEn ? 'B2B Order List' : 'جدول التوريد السريع'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Production Division Filter Bar */}
            <div className="pt-3 border-t border-[var(--border)] flex items-center gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                <span>{isEn ? 'All Divisions' : 'كل الأقسام'}</span>
                <span className="font-mono-num text-[11px] opacity-80">
                  {PRODUCTS.length}
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                      active
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <span>{isEn ? cat.nameEn : cat.nameAr}</span>
                    <span className="font-mono-num text-[11px] opacity-80">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. MAIN STOREFRONT CONTENT (3-COLUMN STUDIO GRID OR B2B ORDER TABLE)
         ==================================================================== */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Status Line */}
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] px-1">
          <span>
            {isEn
              ? `Showing ${filteredProducts.length} of ${PRODUCTS.length} manufactured products`
              : `يعرض ${filteredProducts.length} من إجمالي ${PRODUCTS.length} منتجًا طبيًا`}
          </span>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('all');
              }}
              className="text-[var(--medical)] font-semibold hover:underline cursor-pointer"
            >
              {isEn ? 'Reset Filters' : 'إعادة ضبط الفلاتر'}
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center space-y-3">
            <p className="text-base font-bold text-[var(--heading)]">
              {isEn
                ? 'No products match your search criteria'
                : 'لا توجد منتجات مطابقة لمعايير البحث'}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {isEn
                ? 'Try searching with a broader keyword or reset category filters.'
                : 'جرب البحث بكلمات أخرى أو استعرض جميع الأقسام المتاحة.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('all');
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold cursor-pointer"
            >
              {isEn ? 'Show All Products' : 'عرض جميع المنتجات'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 3-Column Architectural Product Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          /* B2B Quick-Order Procurement Table View */
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-[var(--surface)] border-b border-[var(--border)] text-[11px] font-bold text-[var(--heading)] uppercase">
                    <th className="py-3.5 px-4 text-start">
                      {isEn ? 'Product' : 'المنتج'}
                    </th>
                    <th className="py-3.5 px-4 text-start">
                      {isEn ? 'Ref Code' : 'الكود'}
                    </th>
                    <th className="py-3.5 px-4 text-start">
                      {isEn ? 'Primary Specs' : 'المواصفات الأساسية'}
                    </th>
                    <th className="py-3.5 px-4 text-start">
                      {isEn ? 'Packaging' : 'التعبئة القياسية'}
                    </th>
                    <th className="py-3.5 px-4 text-end">
                      {isEn ? 'Actions' : 'الإجراءات'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-xs">
                  {filteredProducts.map((product) => {
                    const isInInquiry = inquirySlugs.includes(product.slug);
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-[var(--surface)]/40 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] p-1.5 shrink-0 flex items-center justify-center">
                              <SmartImage
                                src={product.images[0]}
                                alt={isEn ? product.nameEn : product.nameAr}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold text-[var(--medical)]">
                                {isEn
                                  ? product.categoryNameEn
                                  : product.categoryNameAr}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  onNavigate(`/products/${product.slug}`)
                                }
                                className="text-sm font-bold text-[var(--heading)] hover:text-[var(--medical)] transition-colors text-start cursor-pointer"
                              >
                                {isEn ? product.nameEn : product.nameAr}
                              </button>
                              <p className="font-en text-[11px] text-[var(--muted-foreground)]">
                                {isEn ? product.nameAr : product.nameEn}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-mono-num font-semibold text-[var(--heading)] whitespace-nowrap">
                          {product.code}
                        </td>

                        <td className="py-4 px-4 text-[var(--foreground)] max-w-xs">
                          <div className="space-y-1">
                            {product.specs.slice(0, 2).map((s, idx) => (
                              <div key={idx} className="truncate">
                                <span className="text-[var(--muted-foreground)]">
                                  {isEn ? s.labelEn || s.label : s.label}:{' '}
                                </span>
                                <span className="font-medium text-[var(--heading)]">
                                  {isEn ? s.valueEn || s.value : s.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-[var(--muted-foreground)] max-w-[220px]">
                          <span className="line-clamp-2">
                            {isEn
                              ? product.packagingEn || product.packaging
                              : product.packaging}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                onNavigate(`/catalog/${product.slug}`)
                              }
                              className="h-8 px-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--medical)] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{isEn ? 'Datasheet' : 'نشرة فنية'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onToggleInquiry(product.slug)}
                              className={`h-8 px-3 rounded-lg border font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                isInInquiry
                                  ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                                  : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)]'
                              }`}
                            >
                              {isInInquiry ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{isEn ? 'Saved' : 'مضاف'}</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{isEn ? 'Add Quote' : '+ تسعير'}</span>
                                </>
                              )}
                            </button>

                            <a
                              href={buildProductWhatsAppUrl(product, lang)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white flex items-center justify-center shrink-0"
                            >
                              <WhatsAppIcon className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

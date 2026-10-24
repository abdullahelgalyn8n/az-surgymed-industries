import React, { useState, useMemo } from 'react';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Printer,
  FileText,
  Check,
  Plus,
  Search,
  Layers,
  ShieldCheck,
  Package,
  Factory,
  BookOpen,
  Table,
  LayoutGrid,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  COMPANY_INFO,
  Product,
  Language,
} from '../data/surgymedData';
import {
  filterAndSortProducts,
  getArticlesForProduct,
  buildProductWhatsAppUrl,
} from '../utils/catalogLogic';
import { SmartImage } from '../components/SmartImage';
import { ArticleCard } from '../components/ArticleCard';
import { WhatsAppIcon } from '../components/Icons';

interface CatalogPageProps {
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [selectedForPrint, setSelectedForPrint] = useState<string[]>(
    PRODUCTS.map((p) => p.slug)
  );

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(PRODUCTS, {
        categorySlug: selectedCat,
        searchQuery,
      }),
    [selectedCat, searchQuery]
  );

  const handleCategoryFilter = (catSlug: string) => {
    setSelectedCat(catSlug);
    if (catSlug === 'all') {
      setSelectedForPrint(PRODUCTS.map((p) => p.slug));
    } else {
      setSelectedForPrint(
        PRODUCTS.filter((p) => p.categorySlug === catSlug).map((p) => p.slug)
      );
    }
  };

  const togglePrintSlug = (slug: string) => {
    setSelectedForPrint((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const printableProducts = PRODUCTS.filter((p) =>
    selectedForPrint.includes(p.slug)
  );

  return (
    <div className="space-y-16 pb-20">
      {/* 1. EXECUTIVE CATALOG HERO */}
      <section className="relative overflow-hidden bg-grid-pattern border-b border-[var(--border)]/60 py-12 sm:py-16 no-print">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="text-start space-y-3 max-w-3xl">
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
                  {isEn ? 'Technical Catalog' : 'الكتالوج الفني'}
                </span>
              </nav>

              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--medical)] uppercase pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)]" />
                <span className="font-en">INDUSTRIAL TECHNICAL CATALOG & DATASHEETS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] leading-tight">
                {isEn
                  ? 'Interactive Technical Catalog & Product Datasheets'
                  : 'الكتالوج الفني التفاعلي والنشرات الهندسية'}
              </h1>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {isEn
                  ? 'Explore detailed engineering datasheets for all 14 medical products across 6 production lines. Open any item for its dedicated technical specification sheet, linked clinical articles, or export a custom printable PDF catalog.'
                  : 'استعرض النشرات الفنية والمواصفات الهندسية الموثقة لجميع منتجات سيرجي ميد (14 منتجًا عبر 6 خطوط إنتاج). اضغط على أي منتج لفتح صفحته الفنية المنشقة من الكتالوج والاطلاع على المقالات المرتبطة به، أو قم بتصدير نشرة PDF مخصصة.'}
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-3.5 text-center shadow-2xs">
                <p className="font-en text-2xl font-bold text-[var(--heading)] tabular-nums">
                  14
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)] font-medium mt-0.5">
                  {isEn ? 'Datasheets' : 'نشرة فنية'}
                </p>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-3.5 text-center shadow-2xs">
                <p className="font-en text-2xl font-bold text-[var(--medical)] tabular-nums">
                  06
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)] font-medium mt-0.5">
                  {isEn ? 'Product Lines' : 'خطوط إنتاج'}
                </p>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-3.5 text-center shadow-2xs">
                <p className="font-en text-2xl font-bold text-[var(--heading)] tabular-nums">
                  OEM
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)] font-medium mt-0.5">
                  {isEn ? 'Custom Specs' : 'تخصيص كامل'}
                </p>
              </div>
            </div>
          </div>

          {/* Search + View Switcher + Print Action Bar */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[26px] p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 flex items-center bg-[var(--background)] border border-[var(--border)] rounded-full px-4 py-2.5 focus-within:border-[var(--medical)]">
              <Search className="w-4 h-4 text-[var(--muted-foreground)] shrink-0 mx-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search catalog by product name, reference code (e.g. SM-DB-01), or spec...'
                    : 'ابحث في الكتالوج باسم المنتج أو الكود المرجعي (مثل SM-DB-01) أو المواصفة...'
                }
                aria-label={isEn ? 'Search catalog' : 'ابحث في الكتالوج'}
                className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* View Switcher */}
              <div className="inline-flex items-center bg-[var(--surface)] p-1 rounded-full border border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-[var(--card)] text-[var(--heading)] shadow-2xs'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--heading)]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Datasheet Cards' : 'بطاقات النشرات الفنية'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('matrix')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'matrix'
                      ? 'bg-[var(--card)] text-[var(--heading)] shadow-2xs'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--heading)]'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Comparison Table' : 'الجدول الهندسي المقارن'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                disabled={printableProducts.length === 0}
                className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 text-[var(--primary-foreground)] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>
                  {isEn
                    ? `Print / Save PDF (${printableProducts.length})`
                    : `طباعة / حفظ PDF (${printableProducts.length})`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTION LINE CATALOG SECTIONS (6 CATEGORIES) */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5 no-print">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="font-en text-xs font-semibold tracking-[0.16em] text-[var(--medical)] uppercase">
              PRODUCTION LINES
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)] mt-0.5">
              {isEn ? 'Browse Catalog by Production Line' : 'أقسام الكتالوج حسب خطوط الإنتاج'}
            </h2>
          </div>

          {selectedCat !== 'all' && (
            <button
              type="button"
              onClick={() => handleCategoryFilter('all')}
              className="text-xs font-bold text-[var(--medical)] hover:underline cursor-pointer self-start sm:self-end"
            >
              {isEn ? 'Show All 6 Production Lines (14 Products)' : 'عرض كل خطوط الإنتاج (14 منتجًا)'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  handleCategoryFilter(active ? 'all' : cat.slug)
                }
                className={`text-start p-4 rounded-[22px] border transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                  active
                    ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                    : 'bg-[var(--card)] border-[var(--border)] hover:border-[var(--medical)]/50 text-[var(--heading)]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-en text-xs font-bold tabular-nums px-2.5 py-0.5 rounded-full ${
                      active
                        ? 'bg-black/15 text-[var(--primary-foreground)]'
                        : 'bg-[var(--surface)] text-[var(--medical)]'
                    }`}
                  >
                    {cat.number}
                  </span>
                  <span
                    className={`text-[11px] font-medium tabular-nums ${
                      active
                        ? 'text-[var(--primary-foreground)]/85'
                        : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    {cat.count} {isEn ? 'Items' : 'منتجات'}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-bold leading-snug line-clamp-2">
                    {isEn ? cat.nameEn : cat.nameAr}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE TECHNICAL DATASHEET CARDS OR MATRIX TABLE */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            {isEn
              ? `Showing ${filteredProducts.length} technical datasheets — Click any card to open its full engineering specification page.`
              : `يعرض ${filteredProducts.length} نشرة فنية — اضغط على أي بطاقة للدخول إلى صفحة المواصفات الفنية الكاملة المنشقة من الكتالوج.`}
          </p>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setSelectedForPrint(PRODUCTS.map((p) => p.slug))}
              className="text-[var(--medical)] font-semibold hover:underline cursor-pointer"
            >
              {isEn ? 'Select All for PDF' : 'تحديد الكل للطباعة'}
            </button>
            <span className="text-[var(--border)]">|</span>
            <button
              type="button"
              onClick={() => setSelectedForPrint([])}
              className="text-[var(--muted-foreground)] hover:text-[var(--heading)] cursor-pointer"
            >
              {isEn ? 'Clear Selection' : 'إلغاء التحديد'}
            </button>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isSelectedPrint = selectedForPrint.includes(product.slug);
              const isInInquiry = inquirySlugs.includes(product.slug);
              const linkedArticles = getArticlesForProduct(product);

              return (
                <article
                  key={product.id}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-[28px] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:border-[var(--medical)]/50"
                >
                  {/* Card Top Bar: Ref Code + Print Checkbox */}
                  <div className="px-5 pt-4 pb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-en text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[var(--surface)] text-[var(--medical)] border border-[var(--border)]">
                        {product.code}
                      </span>
                      <span className="text-[11px] font-medium text-[var(--muted-foreground)] truncate max-w-[160px]">
                        {isEn ? product.categoryNameEn : product.categoryNameAr}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePrintSlug(product.slug)}
                      title={
                        isEn
                          ? 'Include in printable PDF bundle'
                          : 'تضمين في ملف الطباعة PDF'
                      }
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1 border transition-colors cursor-pointer ${
                        isSelectedPrint
                          ? 'bg-[var(--surface)] border-[var(--medical)] text-[var(--heading)]'
                          : 'border-[var(--border)] text-[var(--muted-foreground)] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Check className="w-3 h-3 text-[var(--medical)]" />
                      <span>PDF</span>
                    </button>
                  </div>

                  {/* Clickable Product Image Box -> Opens /catalog/[slug] */}
                  <div className="px-4">
                    <a
                      href={`/catalog/${product.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/catalog/${product.slug}`);
                      }}
                      className="relative bg-white rounded-[22px] p-5 aspect-[1.25/1] flex items-center justify-center border border-[var(--border)]/60 overflow-hidden"
                    >
                      {product.sizesBadge && (
                        <span className="absolute top-3 left-3 z-10 bg-[#EEF5F9] text-[#0B3D54] text-[11px] font-semibold px-3 py-1 rounded-full">
                          {isEn
                            ? product.sizesBadgeEn || product.sizesBadge
                            : product.sizesBadge}
                        </span>
                      )}
                      <SmartImage
                        src={product.images[0]}
                        alt={isEn ? product.nameEn : product.nameAr}
                        className="w-full h-full max-h-44 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </a>
                  </div>

                  {/* Datasheet Body */}
                  <div className="p-5 flex flex-col flex-1 text-start space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--heading)] leading-snug">
                        <a
                          href={`/catalog/${product.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/catalog/${product.slug}`);
                          }}
                          className="hover:text-[var(--medical)] transition-colors"
                        >
                          {isEn ? product.nameEn : product.nameAr}
                        </a>
                      </h3>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {isEn ? product.nameAr : product.nameEn}
                      </p>
                    </div>

                    {/* Key Specs Preview Table */}
                    <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-3.5 space-y-2 text-xs flex-1">
                      {product.specs.slice(0, 3).map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 pb-1.5 last:pb-0 border-b last:border-b-0 border-[var(--border)]/60"
                        >
                          <span className="font-semibold text-[var(--heading)] shrink-0">
                            {isEn ? spec.labelEn || spec.label : spec.label}:
                          </span>
                          <span className="text-[var(--muted-foreground)] text-end line-clamp-1">
                            {isEn ? spec.valueEn || spec.value : spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Linked Articles Badge */}
                    <div className="flex items-center justify-between text-[11.5px] text-[var(--muted-foreground)] px-1">
                      <span className="inline-flex items-center gap-1.5 text-[var(--medical)] font-medium">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>
                          {isEn
                            ? `${linkedArticles.length} Linked Technical Articles`
                            : `${linkedArticles.length} مقالات فنية مرتبطة`}
                        </span>
                      </span>
                      <a
                        href={`/products/${product.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/products/${product.slug}`);
                        }}
                        className="hover:text-[var(--heading)] hover:underline"
                      >
                        {isEn ? 'Store View' : 'صفحة المنتج'}
                      </a>
                    </div>

                    {/* Primary CTA: Open Branched Catalog Datasheet Page */}
                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={`/catalog/${product.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/catalog/${product.slug}`);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>
                          {isEn ? 'Open Full Datasheet' : 'فتح النشرة الفنية والتفاصيل'}
                        </span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleInquiry(product.slug)}
                        aria-label={
                          isEn ? 'Add to Inquiry List' : 'أضف إلى قائمة الاستفسارات'
                        }
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                          isInInquiry
                            ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--navy)]'
                        }`}
                      >
                        {isInInquiry ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Engineering Comparison Matrix Table View */
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[28px] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[var(--surface)] border-b border-[var(--border)] text-[var(--heading)]">
                    <th className="p-4 font-bold text-start">{isEn ? 'Code' : 'الكود'}</th>
                    <th className="p-4 font-bold text-start">{isEn ? 'Product' : 'المنتج'}</th>
                    <th className="p-4 font-bold text-start">{isEn ? 'Category' : 'التصنيف'}</th>
                    <th className="p-4 font-bold text-start">
                      {isEn ? 'Key Specification' : 'المواصفة الأساسية'}
                    </th>
                    <th className="p-4 font-bold text-start">
                      {isEn ? 'Packaging' : 'التعبئة القياسية'}
                    </th>
                    <th className="p-4 font-bold text-center">
                      {isEn ? 'Datasheet' : 'النشرة الفنية'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-[var(--surface)]/50 transition-colors"
                    >
                      <td className="p-4 font-en font-bold text-[var(--medical)] whitespace-nowrap">
                        {p.code}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-white border border-[var(--border)] p-1 shrink-0">
                            <SmartImage
                              src={p.images[0]}
                              alt={isEn ? p.nameEn : p.nameAr}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <a
                              href={`/catalog/${p.slug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate(`/catalog/${p.slug}`);
                              }}
                              className="font-bold text-[var(--heading)] hover:text-[var(--medical)] block"
                            >
                              {isEn ? p.nameEn : p.nameAr}
                            </a>
                            <span className="text-xs text-[var(--muted-foreground)]">
                              {isEn ? p.nameAr : p.nameEn}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-[var(--muted-foreground)]">
                        {isEn ? p.categoryNameEn : p.categoryNameAr}
                      </td>
                      <td className="p-4 text-xs text-[var(--foreground)] max-w-xs">
                        {p.specs[0]
                          ? `${isEn ? p.specs[0].labelEn || p.specs[0].label : p.specs[0].label}: ${
                              isEn ? p.specs[0].valueEn || p.specs[0].value : p.specs[0].value
                            }`
                          : '-'}
                      </td>
                      <td className="p-4 text-xs text-[var(--muted-foreground)] max-w-xs">
                        {isEn ? p.packagingEn : p.packaging}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <a
                          href={`/catalog/${p.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/catalog/${p.slug}`);
                          }}
                          className="px-3.5 py-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold inline-flex items-center gap-1"
                        >
                          <span>{isEn ? 'Open Sheet' : 'فتح النشرة'}</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* 4. PRINTABLE MASTER CATALOG SHEET (Visible in Print & Preview Box) */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-slate-900 border border-[var(--border)] rounded-[28px] p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3.5">
              <SmartImage
                src={COMPANY_INFO.logoUrl}
                alt="Surgy Med Logo"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-[#082E41]">
                  {isEn ? COMPANY_INFO.fullNameEn : COMPANY_INFO.nameAr}
                </h2>
                <p className="font-en text-xs text-slate-500">
                  OFFICIAL TECHNICAL SPECIFICATION SUMMARY ({printableProducts.length}{' '}
                  PRODUCTS)
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1" dir="ltr">
              <p className="font-en tabular-nums">
                {COMPANY_INFO.phone1} · {COMPANY_INFO.phone2}
              </p>
              <p>Fax: {COMPANY_INFO.fax}</p>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {printableProducts.map((p) => (
              <div
                key={p.id}
                className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
              >
                <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-3 aspect-square flex items-center justify-center max-w-[110px]">
                  <SmartImage
                    src={p.images[0]}
                    alt={isEn ? p.nameEn : p.nameAr}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="md:col-span-7 text-start space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-en text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-[#0B3D54]">
                      {p.code}
                    </span>
                    <h3 className="text-base font-bold text-[#082E41]">
                      {isEn ? p.nameEn : p.nameAr}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isEn ? p.shortDescEn : p.shortDescAr}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 pt-1">
                    {p.specs.slice(0, 3).map((s, i) => (
                      <span key={i}>
                        <strong className="text-slate-900">
                          {isEn ? s.labelEn || s.label : s.label}:
                        </strong>{' '}
                        {isEn ? s.valueEn || s.value : s.value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-3 flex md:justify-end no-print">
                  <a
                    href={`/catalog/${p.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/catalog/${p.slug}`);
                    }}
                    className="text-xs font-bold text-[#0B3D54] bg-[#EEF5F9] hover:bg-[#DCEAF3] px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>
                      {isEn ? 'Detailed Datasheet' : 'صفحة النشرة التفصيلية'}
                    </span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 text-center">
            {isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.addressAr}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   BRANCHED CATALOG TECHNICAL DATASHEET PAGE (/catalog/[slug])
   ========================================================================== */
interface CatalogDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

export const CatalogDetailPage: React.FC<CatalogDetailPageProps> = ({
  slug,
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const product: Product =
    PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const isInInquiry = inquirySlugs.includes(product.slug);
  const relatedArticles = getArticlesForProduct(product);
  const siblingDatasheets = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.categorySlug === product.categorySlug
  );

  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* 1. Breadcrumbs & Datasheet Top Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[var(--border)] no-print">
        <nav
          aria-label={isEn ? 'Breadcrumb' : 'مسار التنقل'}
          className="text-xs text-[var(--muted-foreground)] flex flex-wrap items-center gap-1.5"
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
          <a
            href="/catalog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/catalog');
            }}
            className="hover:text-[var(--heading)]"
          >
            {isEn ? 'Technical Catalog' : 'الكتالوج الفني'}
          </a>
          <span>/</span>
          <span className="text-[var(--medical)] font-semibold">
            {isEn
              ? `Datasheet: ${product.nameEn}`
              : `النشرة الفنية: ${product.nameAr}`}
          </span>
        </nav>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--heading)] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[var(--medical)]" />
            <span>{isEn ? 'Print Datasheet (PDF)' : 'طباعة النشرة الفنية (PDF)'}</span>
          </button>

          <a
            href={`/products/${product.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/products/${product.slug}`);
            }}
            className="px-4 py-2 rounded-full border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)] text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <span>{isEn ? 'Product Commercial Page' : 'صفحة عرض المنتج'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Technical Datasheet Header Card */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-[32px] p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div className="space-y-2 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-en text-xs font-bold px-3 py-1 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
                REF: {product.code}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--medical)]">
                {isEn ? product.categoryNameEn : product.categoryNameAr}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] inline-flex items-center gap-1">
                <Factory className="w-3.5 h-3.5 text-[var(--medical)]" />
                <span>
                  {isEn
                    ? 'Surgy Med Factory 110 & 307 — Tala Industrial Zone'
                    : 'مصنع سيرجي ميد 110 و307 — المنطقة الصناعية تلا'}
                </span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] pt-1">
              {isEn
                ? `Technical Datasheet: ${product.nameEn}`
                : `النشرة الفنية الهندسية: ${product.nameAr}`}
            </h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              {isEn ? product.nameAr : product.nameEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 no-print">
            <a
              href="/quote"
              onClick={(e) => {
                e.preventDefault();
                if (!isInInquiry) onToggleInquiry(product.slug);
                onNavigate('/quote');
              }}
              className="px-5 py-3 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
            >
              <span>
                {isEn ? 'Request Supply Quotation' : 'اطلب عرض سعر للتوريد'}
              </span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <a
              href={buildProductWhatsAppUrl(product, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{isEn ? 'WhatsApp Sales' : 'واتساب المبيعات'}</span>
            </a>

            <button
              type="button"
              onClick={() => onToggleInquiry(product.slug)}
              className={`px-4 py-3 rounded-full border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                isInInquiry
                  ? 'bg-[var(--surface)] border-[var(--medical)] text-[var(--heading)]'
                  : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)]'
              }`}
            >
              {isInInquiry ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>
                {isInInquiry
                  ? isEn
                    ? 'In Inquiry List'
                    : 'مضاف للاستفسارات'
                  : isEn
                  ? 'Add to Inquiry'
                  : 'أضف للاستفسارات'}
              </span>
            </button>
          </div>
        </div>

        {/* Main Engineering Split: Visual Inspection + Full Technical Spec Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[var(--border)] rounded-[24px] p-6 aspect-square flex items-center justify-center">
              <SmartImage
                src={product.images[activeImgIdx] || product.images[0]}
                alt={isEn ? product.nameEn : product.nameAr}
                priority
                className="w-full h-full max-h-80 object-contain"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5 no-print">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImgIdx(i)}
                    className={`w-16 h-16 rounded-xl bg-white p-1.5 border cursor-pointer ${
                      activeImgIdx === i
                        ? 'border-[var(--medical)] ring-2 ring-[var(--medical)]/25'
                        : 'border-[var(--border)] opacity-70'
                    }`}
                  >
                    <SmartImage
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Engineering Summary Highlights */}
            <div className="bg-[var(--surface)]/70 border border-[var(--border)] rounded-2xl p-5 space-y-3 text-start">
              <h2 className="text-sm font-bold text-[var(--heading)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--medical)]" />
                <span>
                  {isEn ? 'Industrial Summary & OEM Status' : 'ملخص الاعتماد الصناعي والتخصيص'}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--border)]">
                  <p className="text-[var(--muted-foreground)]">
                    {isEn ? 'Document Code' : 'كود النشرة'}
                  </p>
                  <p className="font-en font-bold text-[var(--heading)] mt-0.5">
                    DOC-{product.code}
                  </p>
                </div>
                <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--border)]">
                  <p className="text-[var(--muted-foreground)]">
                    {isEn ? 'Usage Classification' : 'تصنيف الاستخدام'}
                  </p>
                  <p className="font-bold text-[var(--heading)] mt-0.5">
                    {isEn ? 'Single-Use Medical' : 'طبي أحادي الاستخدام'}
                  </p>
                </div>
                <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--border)] col-span-2">
                  <p className="text-[var(--muted-foreground)]">
                    {isEn ? 'OEM / Private Label' : 'إمكانية التخصيص (OEM)'}
                  </p>
                  <p className="font-semibold text-[var(--medical)] mt-0.5">
                    {isEn
                      ? 'Available for Hospital Tenders & Medical Supply Companies'
                      : 'متاح تخصيص المقاسات والألوان والتغليف لطلبات الجملة والمناقصات'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Engineering Data Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Engineering Description */}
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 space-y-2">
              <h2 className="text-base font-bold text-[var(--heading)] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--medical)]" />
                <span>{isEn ? 'Technical Description' : 'الوصف الهندسي والفني للمنتج'}</span>
              </h2>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {isEn ? product.aboutEn : product.aboutAr}
              </p>
            </div>

            {/* Complete Specifications Table */}
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 bg-[var(--surface)] border-b border-[var(--border)]">
                <h2 className="text-base font-bold text-[var(--heading)]">
                  {isEn
                    ? 'Complete Technical Specifications Table'
                    : 'جدول المواصفات الفنية والقياسية الكامل'}
                </h2>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {product.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 text-sm"
                  >
                    <span className="sm:col-span-4 font-bold text-[var(--heading)]">
                      {isEn ? spec.labelEn || spec.label : spec.label}
                    </span>
                    <span className="sm:col-span-8 text-[var(--foreground)]">
                      {isEn ? spec.valueEn || spec.value : spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages & Clinical Uses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-[var(--heading)]">
                  {isEn ? 'Functional & Technical Advantages' : 'الخصائص والمزايا الفنية'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                  {(isEn ? product.advantagesEn : product.advantages).map(
                    (adv, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--medical)] mt-2 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-[var(--heading)]">
                  {isEn ? 'Approved Medical Applications' : 'مجالات الاستخدام الطبي المعتمدة'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                  {(isEn ? product.usesEn : product.uses).map((u, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] mt-2 shrink-0" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Standard Packaging & Logistics */}
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-[var(--heading)] flex items-center gap-2">
                <Package className="w-4 h-4 text-[var(--medical)]" />
                <span>
                  {isEn
                    ? 'Standard Packaging & Carton Configuration'
                    : 'مواصفات التعبئة والتغليف القياسي والشحن'}
                </span>
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {isEn ? product.packagingEn : product.packaging}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LINKED ARTICLES SECTION AT THE BOTTOM OF THE CATALOG SUBPAGE */}
      <section className="pt-4 space-y-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-start space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[var(--medical)] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-en">RELATED TECHNICAL ARTICLES & GUIDES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)]">
              {isEn
                ? `Medical & Technical Articles Related to ${product.nameEn}`
                : `مقالات وأدلة طبية مرتبطة بـ ${product.nameAr}`}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
              {isEn
                ? 'Read in-depth clinical and manufacturing articles explaining the standards and best practices for this product.'
                : 'اطلع على المقالات العلمية والصناعية التي تشرح معايير الاستخدام والتصنيع الخاصة بهذا المنتج.'}
            </p>
          </div>

          <a
            href="/articles"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/articles');
            }}
            className="text-xs sm:text-sm font-bold text-[var(--medical)] hover:underline inline-flex items-center gap-1"
          >
            <span>{isEn ? 'View All 6 Articles' : 'عرض جميع المقالات (6)'}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onNavigate={onNavigate}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* 4. SIBLING CATALOG DATASHEETS */}
      {siblingDatasheets.length > 0 && (
        <section className="pt-8 border-t border-[var(--border)] space-y-6 no-print">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
              {isEn
                ? 'Other Technical Datasheets in this Category'
                : 'نشرات فنية أخرى في نفس التصنيف'}
            </h2>
            <a
              href="/catalog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/catalog');
              }}
              className="text-xs sm:text-sm font-bold text-[var(--medical)] hover:underline inline-flex items-center gap-1"
            >
              <span>{isEn ? 'Back to Full Catalog' : 'العودة للكتالوج الكامل'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siblingDatasheets.map((sib) => (
              <a
                key={sib.id}
                href={`/catalog/${sib.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/catalog/${sib.slug}`);
                }}
                className="bg-[var(--card)] border border-[var(--border)] hover:border-[var(--medical)]/50 rounded-2xl p-4 flex items-center gap-4 transition-all hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-xl bg-white border border-[var(--border)] p-2 shrink-0">
                  <SmartImage
                    src={sib.images[0]}
                    alt={isEn ? sib.nameEn : sib.nameAr}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 text-start">
                  <span className="font-en text-[11px] font-bold text-[var(--medical)]">
                    {sib.code}
                  </span>
                  <h3 className="text-sm font-bold text-[var(--heading)] truncate">
                    {isEn ? sib.nameEn : sib.nameAr}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">
                    {isEn ? 'Open Technical Datasheet' : 'فتح النشرة الفنية'}
                  </p>
                </div>
                <ArrowIcon className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

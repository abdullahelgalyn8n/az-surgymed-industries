import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  FileText,
  X,
} from 'lucide-react';
import {
  ARTICLES,
  CATEGORIES,
  PRODUCTS,
  COMPANY_INFO,
  Language,
} from '../data/surgymedData';
import {
  filterArticles,
  buildGeneralWhatsAppUrl,
} from '../utils/catalogLogic';
import { ArticleCard } from '../components/ArticleCard';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppIcon } from '../components/Icons';

interface ArticlesPageProps {
  onNavigate: (path: string) => void;
  lang?: Language;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onNavigate,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(
    () =>
      filterArticles(ARTICLES, {
        categorySlug: selectedCategory,
        searchQuery,
      }),
    [selectedCategory, searchQuery]
  );

  const showLeadCover =
    selectedCategory === 'all' &&
    !searchQuery.trim() &&
    filteredArticles.length > 0;
  const leadArticle = showLeadCover ? filteredArticles[0] : null;
  const remainingArticles = showLeadCover
    ? filteredArticles.slice(1)
    : filteredArticles;

  return (
    <div className="space-y-12 pb-24">
      {/* ====================================================================
          1. EDITORIAL PUBLICATION HEADER & FILTER TOOLBAR
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
                  {isEn
                    ? 'Medical & Engineering Publications'
                    : 'الدوريات والمقالات الطبية'}
                </span>
              </nav>

              <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] tracking-tight">
                {isEn
                  ? 'Medical Consumables & Infection Control Journal'
                  : 'المقالات والدراسات الفنية الطبية'}
              </h1>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {isEn
                  ? 'In-depth engineering guides and clinical studies on single-use medical consumables, WHO / UN3291 safety compliance, and hospital procurement standards.'
                  : 'مراجع علمية وأدلة هندسية مفصلة حول مواصفات المستهلكات الطبية أحادية الاستخدام، معايير مكافحة العدوى، وضوابط التوريد للمستشفيات.'}
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-[400px]">
              <div className="relative flex items-center bg-[var(--card)] border border-[var(--border)] focus-within:border-[var(--medical)] rounded-xl px-3.5 py-2.5 shadow-2xs">
                <Search className="w-4 h-4 text-[var(--muted-foreground)] mx-1.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Search studies, materials, or standards...'
                      : 'ابحث في المقالات والمواصفات القياسية...'
                  }
                  aria-label={isEn ? 'Search articles' : 'ابحث في المقالات'}
                  className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--heading)] px-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Segmented Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]'
              }`}
            >
              {isEn
                ? `All Publications (${ARTICLES.length})`
                : `كل الدراسات والمقالات (${ARTICLES.length})`}
            </button>

            {CATEGORIES.filter((c) =>
              ARTICLES.some((a) => a.categorySlug === c.slug)
            ).map((cat) => {
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {isEn ? cat.nameEn : cat.nameAr}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FEATURED COVER STUDY + ARCHITECTURAL JOURNAL FEED
         ==================================================================== */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredArticles.length === 0 ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center space-y-3">
            <p className="text-base font-bold text-[var(--heading)]">
              {isEn
                ? 'No articles match your search'
                : 'لا توجد مقالات مطابقة لبحثك'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold cursor-pointer"
            >
              {isEn ? 'Show All Articles' : 'عرض كل المقالات'}
            </button>
          </div>
        ) : (
          <>
            {/* Lead Cover Story (Article #01) */}
            {leadArticle && (
              <article className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs">
                <a
                  href={`/articles/${leadArticle.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/articles/${leadArticle.slug}`);
                  }}
                  className="lg:col-span-5 bg-white border-b lg:border-b-0 lg:border-x border-[var(--border)] p-8 sm:p-10 flex items-center justify-center relative group"
                >
                  <span className="absolute top-4 left-4 font-mono-num text-xs font-bold text-slate-400">
                    01 / COVER STUDY
                  </span>
                  <SmartImage
                    src={leadArticle.image}
                    alt={isEn ? leadArticle.titleEn : leadArticle.titleAr}
                    priority
                    className="w-full h-full max-h-72 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </a>

                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-start space-y-6">
                  <div className="space-y-3.5">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <span className="font-bold text-[var(--medical)]">
                        {isEn ? leadArticle.categoryEn : leadArticle.categoryAr}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {isEn
                          ? leadArticle.publishedDateEn
                          : leadArticle.publishedDateAr}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {isEn ? leadArticle.readTimeEn : leadArticle.readTimeAr}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] leading-snug">
                      <a
                        href={`/articles/${leadArticle.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/articles/${leadArticle.slug}`);
                        }}
                        className="hover:text-[var(--medical)] transition-colors"
                      >
                        {isEn ? leadArticle.titleEn : leadArticle.titleAr}
                      </a>
                    </h2>

                    <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                      {isEn ? leadArticle.excerptEn : leadArticle.excerptAr}
                    </p>

                    {/* Preview of Key Takeaways */}
                    <div className="pt-2 space-y-2">
                      {(isEn
                        ? leadArticle.keyTakeawaysEn || leadArticle.keyTakeaways
                        : leadArticle.keyTakeaways
                      )
                        .slice(0, 2)
                        .map((pt, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-[var(--foreground)]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[var(--medical)] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                    <a
                      href={`/articles/${leadArticle.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/articles/${leadArticle.slug}`);
                      }}
                      className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
                    >
                      <span>
                        {isEn ? 'Read Full Study' : 'اقرأ الدراسة الكاملة'}
                      </span>
                      <ArrowIcon className="w-4 h-4" />
                    </a>

                    <span className="font-mono-num text-xs text-[var(--muted-foreground)]">
                      {isEn
                        ? `${leadArticle.relatedProductSlugs.length} Linked Factory Products`
                        : `${leadArticle.relatedProductSlugs.length} منتجات مصنعية مرتبطة`}
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* Remaining Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingArticles.map((article, idx) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onNavigate={onNavigate}
                  lang={lang}
                  index={showLeadCover ? idx + 1 : idx}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   ARTICLE DETAIL PAGE (/articles/[slug])
   ========================================================================== */
interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedProductSlugs.includes(p.slug)
  );
  const otherArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(
    0,
    3
  );

  const takeaways = isEn
    ? article.keyTakeawaysEn || article.keyTakeaways
    : article.keyTakeaways;
  const sections = isEn
    ? article.sectionsEn || article.sections
    : article.sections;

  return (
    <div className="space-y-16 pb-24">
      {/* Editorial Study Header */}
      <section className="bg-grid-pattern border-b border-[var(--border)] pt-10 pb-12">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-start">
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
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/articles');
              }}
              className="hover:text-[var(--heading)]"
            >
              {isEn ? 'Medical Publications' : 'المقالات الطبية'}
            </a>
            <span>/</span>
            <span className="text-[var(--medical)] font-semibold">
              {isEn ? article.titleEn : article.titleAr}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                <span className="font-bold text-[var(--medical)]">
                  {isEn ? article.categoryEn : article.categoryAr}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isEn ? article.publishedDateEn : article.publishedDateAr}
                </span>
                <span aria-hidden="true">·</span>
                <span>{isEn ? article.readTimeEn : article.readTimeAr}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[var(--heading)] leading-tight">
                {isEn ? article.titleEn : article.titleAr}
              </h1>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {isEn ? article.excerptEn : article.excerptAr}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 aspect-[16/10] flex items-center justify-center shadow-2xs">
                <SmartImage
                  src={article.image}
                  alt={isEn ? article.titleEn : article.titleAr}
                  priority
                  className="w-full h-full max-h-60 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Study Reader + Sticky Chapter Sidebar */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Long-Form Study Content (8 cols) */}
          <article className="lg:col-span-8 space-y-8 text-start">
            {/* Key Takeaways Box */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[var(--heading)]">
                {isEn
                  ? 'Executive Technical Summary'
                  : 'الملخص التنفيذي وأبرز النقاط الفنية'}
              </h2>
              <ul className="space-y-2.5">
                {takeaways.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-[var(--foreground)] leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--medical)] shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Numbered Sections */}
            <div className="space-y-6">
              {sections.map((sec, idx) => (
                <section
                  key={idx}
                  id={`study-sec-${idx}`}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-28"
                >
                  <div className="text-xs font-mono-num font-bold text-[var(--medical)]">
                    0{idx + 1}.
                  </div>
                  <h2 className="text-xl font-bold text-[var(--heading)]">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-[var(--foreground)] leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="bg-[var(--surface)]/60 border border-[var(--border)]/70 rounded-xl p-4 space-y-2 mt-2">
                      {sec.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--heading)]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[var(--medical)] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>

          {/* Sticky Outline & FactoryDatasheets Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 text-start">
            {/* Chapter Outline */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-[var(--heading)]">
                {isEn ? 'Study Outline' : 'فهرس محاور الدراسة'}
              </h3>
              <nav className="space-y-1.5">
                {sections.map((sec, idx) => (
                  <a
                    key={idx}
                    href={`#study-sec-${idx}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(`study-sec-${idx}`)
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)] hover:text-[var(--heading)] transition-colors"
                  >
                    <span className="font-mono-num text-[var(--medical)] font-bold">
                      0{idx + 1}.
                    </span>{' '}
                    {sec.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Linked Technical Datasheets */}
            {relatedProducts.length > 0 && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-3">
                <h3 className="text-sm font-bold text-[var(--heading)]">
                  {isEn
                    ? 'Linked Technical Datasheets (/catalog)'
                    : 'النشرات الفنية المرتبطة بالكتالوج'}
                </h3>
                <div className="space-y-2">
                  {relatedProducts.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onNavigate(`/catalog/${p.slug}`)}
                      className="w-full p-3 rounded-xl bg-[var(--surface)]/70 hover:bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between gap-2 text-start transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-4 h-4 text-[var(--medical)] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-[var(--heading)] block truncate">
                            {isEn ? p.nameEn : p.nameAr}
                          </span>
                          <span className="font-mono-num text-[10px] text-[var(--muted-foreground)]">
                            {p.code}
                          </span>
                        </div>
                      </div>
                      <ArrowIcon className="w-3.5 h-3.5 text-[var(--muted-foreground)] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Factory Supply CTA */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[var(--heading)]">
                {isEn
                  ? 'Direct Hospital & B2B Supply'
                  : 'توريد مباشر للمستشفيات والشركات'}
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {isEn
                  ? 'Request samples or an official factory quotation for the medical supplies covered in this study.'
                  : 'تواصل مباشرة مع مصنع سيرجي ميد للحصول على عينات وعروض أسعار رسمية للمنتجات الواردة في هذه الدراسة.'}
              </p>
              <div className="space-y-2">
                <a
                  href="/quote"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/quote');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{isEn ? 'Request a Quote' : 'اطلب عرض سعر'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>

                <a
                  href={buildGeneralWhatsAppUrl(
                    isEn
                      ? `Hello Surgy Med, I read the study "${article.titleEn}" and would like to inquire about the related products.`
                      : `مرحبًا، قرأت مقال "${article.titleAr}" وأود الاستفسار عن المنتجات المرتبطة به.`,
                    lang
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{isEn ? 'WhatsApp Sales' : 'تواصل عبر واتساب'}</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone1Raw}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--medical)]" />
                  <span dir="ltr" className="font-mono-num">
                    {COMPANY_INFO.phone1}
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-[var(--border)] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[var(--heading)]">
                {isEn
                  ? 'Factory Products Featured in This Study'
                  : 'منتجات سيرجي ميد المرتبطة بهذه الدراسة'}
              </h2>
              <a
                href="/products"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/products');
                }}
                className="text-xs sm:text-sm font-semibold text-[var(--medical)] inline-flex items-center gap-1 hover:underline"
              >
                <span>{isEn ? 'All Products' : 'كل المنتجات'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  isInInquiry={inquirySlugs.includes(p.slug)}
                  onToggleInquiry={onToggleInquiry}
                  lang={lang}
                />
              ))}
            </div>
          </section>
        )}

        {/* More Articles */}
        <section className="pt-8 border-t border-[var(--border)] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--heading)]">
              {isEn ? 'More Technical Publications' : 'دراسات ومقالات أخرى'}
            </h2>
            <a
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/articles');
              }}
              className="text-xs sm:text-sm font-semibold text-[var(--medical)] inline-flex items-center gap-1 hover:underline"
            >
              <span>{isEn ? 'All Publications' : 'كل المقالات'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherArticles.map((art, i) => (
              <ArticleCard
                key={art.id}
                article={art}
                onNavigate={onNavigate}
                lang={lang}
                index={i}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

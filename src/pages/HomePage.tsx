import React, { useState, useMemo } from 'react';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Building2,
  HeartPulse,
  Stethoscope,
  Smile,
  Truck,
  Network,
  Phone,
  FileText,
  Check,
  Plus,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  SECTORS,
  ARTICLES,
  COMPANY_INFO,
  Sector,
  Language,
} from '../data/surgymedData';
import { buildGeneralWhatsAppUrl } from '../utils/catalogLogic';
import { ProductCard } from '../components/ProductCard';
import { ArticleCard } from '../components/ArticleCard';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppIcon } from '../components/Icons';

interface HomePageProps {
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

const SectorIcon: React.FC<{ name: Sector['iconName'] }> = ({ name }) => {
  const props = {
    className: 'w-5 h-5 text-[var(--medical)]',
    strokeWidth: 1.75,
  };
  switch (name) {
    case 'hospital':
      return <Building2 {...props} />;
    case 'heart':
      return <HeartPulse {...props} />;
    case 'stethoscope':
      return <Stethoscope {...props} />;
    case 'smile':
      return <Smile {...props} />;
    case 'truck':
      return <Truck {...props} />;
    case 'network':
      return <Network {...props} />;
  }
};

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const experienceProducts = useMemo(
    () =>
      PRODUCTS.filter((p) => p.experienceOrder).sort(
        (a, b) => (a.experienceOrder || 0) - (b.experienceOrder || 0)
      ),
    []
  );

  const [heroActiveIdx, setHeroActiveIdx] = useState<number>(0);
  const [storeFilter, setStoreFilter] = useState<string>('all');

  const activeHeroProduct =
    experienceProducts[heroActiveIdx] || experienceProducts[0] || PRODUCTS[0];
  const isHeroInInquiry = inquirySlugs.includes(activeHeroProduct.slug);

  const showcaseProducts = useMemo(() => {
    if (storeFilter === 'all') {
      return PRODUCTS.slice(0, 8);
    }
    return PRODUCTS.filter((p) => p.categorySlug === storeFilter);
  }, [storeFilter]);

  const leadArticle = ARTICLES[0];
  const secondaryArticles = ARTICLES.slice(1, 4);

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* ====================================================================
          1. ARCHITECTURAL SPLIT-SCREEN HERO + 4-COLUMN INDUSTRIAL PROOF BAR
         ==================================================================== */}
      <section className="relative overflow-hidden bg-grid-pattern border-b border-[var(--border)] pt-8 pb-12 lg:pt-12 lg:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />

        <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 12-Column Architectural Split (items-stretch) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Editorial Brand Column (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between text-start space-y-6 py-2">
              <div className="space-y-5">
                {/* Unboxed Regional & Industrial Trust Line (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                  <span>
                    {isEn
                      ? 'Tala Industrial Zone, Menofia'
                      : 'المنطقة الصناعية بتلا – المنوفية'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {isEn ? 'Factories 110 & 307' : 'مصانع 110 و 307'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-en">ISO / WHO Standards</span>
                </div>

                <h1
                  className="font-bold tracking-tight text-[var(--heading)] leading-[1.12]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                    textWrap: 'balance',
                  }}
                >
                  {isEn ? (
                    <>
                      Precision Manufacturing of{' '}
                      <span className="text-gradient-hero">
                        Single-Use Medical Consumables
                      </span>
                    </>
                  ) : (
                    <>
                      سيرجي ميد{' '}
                      <span className="text-gradient-hero">
                        للصناعات والمستهلكات الطبية
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg font-semibold text-[var(--heading)]/90">
                  {isEn ? COMPANY_INFO.taglineEn : COMPANY_INFO.taglineAr}
                </p>

                <p className="text-sm sm:text-[15.5px] text-[var(--muted-foreground)] leading-[1.8] max-w-xl">
                  {isEn
                    ? COMPANY_INFO.heroDescriptionEn
                    : COMPANY_INFO.heroDescriptionAr}
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Single Primary CTA + Clean Secondary Route */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="/products"
                    onClick={(e) => handleNav(e, '/products')}
                    style={{
                      backgroundColor: 'var(--hero-primary-bg)',
                      color: 'var(--hero-primary-fg)',
                      borderColor: 'var(--hero-primary-border)',
                    }}
                    className="border hover:opacity-95 text-sm font-semibold px-6 py-3.5 rounded-xl inline-flex items-center gap-2.5 transition-all shadow-xs whitespace-nowrap shrink-0"
                  >
                    <span>
                      {isEn ? 'Browse Medical Store' : 'تصفح متجر المنتجات'}
                    </span>
                    <ArrowIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="/catalog"
                    onClick={(e) => handleNav(e, '/catalog')}
                    className="bg-[var(--card)] hover:bg-[var(--surface)] text-[var(--heading)] border border-[var(--border)] text-sm font-semibold px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4 text-[var(--medical)]" />
                    <span>
                      {isEn
                        ? 'Technical Catalog & Datasheets'
                        : 'الكتالوج والنشرات الهندسية'}
                    </span>
                  </a>
                </div>

                {/* Quick Production Line Index */}
                <div className="pt-4 border-t border-[var(--border)]/80">
                  <p className="text-xs text-[var(--muted-foreground)] mb-2.5">
                    {isEn
                      ? 'Direct Access to Factory Production Lines:'
                      : 'وصول سريع لخطوط الإنتاج بالمصنع:'}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[var(--heading)]">
                    {CATEGORIES.slice(0, 4).map((cat, idx) => (
                      <React.Fragment key={cat.id}>
                        {idx > 0 && (
                          <span
                            aria-hidden="true"
                            className="text-[var(--border)]"
                          >
                            /
                          </span>
                        )}
                        <a
                          href={`/products?category=${cat.slug}`}
                          onClick={(e) =>
                            handleNav(e, `/products?category=${cat.slug}`)
                          }
                          className="hover:text-[var(--medical)] transition-colors whitespace-nowrap"
                        >
                          {isEn ? cat.nameEn : cat.nameAr}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Flagship Production Showcase Frame (6 cols) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-sm">
                {/* Top Interactive Selector Tabs for the 4 Flagship Products */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3.5">
                  <div
                    role="tablist"
                    aria-label={
                      isEn ? 'Flagship factory lines' : 'نماذج خطوط الإنتاج'
                    }
                    className="flex items-center gap-1.5 overflow-x-auto"
                  >
                    {experienceProducts.map((prod, idx) => {
                      const active = heroActiveIdx === idx;
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setHeroActiveIdx(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                              : 'bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                          }`}
                        >
                          <span className="font-mono-num">0{idx + 1}.</span>{' '}
                          <span>{isEn ? prod.nameEn : prod.nameAr}</span>
                        </button>
                      );
                    })}
                  </div>

                  <span className="font-mono-num text-xs font-semibold text-[var(--muted-foreground)] hidden sm:inline shrink-0">
                    {activeHeroProduct.code}
                  </span>
                </div>

                {/* Center Studio Image + Spec Split */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center my-auto">
                  <a
                    href={`/products/${activeHeroProduct.slug}`}
                    onClick={(e) =>
                      handleNav(e, `/products/${activeHeroProduct.slug}`)
                    }
                    className="sm:col-span-6 bg-white border border-[var(--border)]/80 rounded-xl p-5 aspect-square flex items-center justify-center group overflow-hidden"
                  >
                    <SmartImage
                      src={activeHeroProduct.images[0]}
                      alt={
                        isEn
                          ? activeHeroProduct.nameEn
                          : activeHeroProduct.nameAr
                      }
                      priority
                      className="w-full h-full max-h-56 object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </a>

                  <div className="sm:col-span-6 text-start space-y-3.5">
                    <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
                      <span className="font-semibold text-[var(--medical)]">
                        {isEn
                          ? activeHeroProduct.categoryNameEn
                          : activeHeroProduct.categoryNameAr}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">
                        {activeHeroProduct.code}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[var(--heading)] leading-snug">
                      {isEn
                        ? activeHeroProduct.nameEn
                        : activeHeroProduct.nameAr}
                    </h2>

                    <p className="text-xs sm:text-[13px] text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
                      {isEn
                        ? activeHeroProduct.shortDescEn
                        : activeHeroProduct.shortDescAr}
                    </p>

                    {/* Live Spec Readout */}
                    <div className="pt-2 border-t border-[var(--border)] space-y-1.5 text-xs">
                      {activeHeroProduct.specs.slice(0, 3).map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2"
                        >
                          <span className="text-[var(--muted-foreground)] shrink-0">
                            {isEn ? s.labelEn || s.label : s.label}:
                          </span>
                          <span className="font-semibold text-[var(--heading)] text-end tabular-nums leading-snug">
                            {isEn ? s.valueEn || s.value : s.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={`/products/${activeHeroProduct.slug}`}
                        onClick={(e) =>
                          handleNav(e, `/products/${activeHeroProduct.slug}`)
                        }
                        className="px-3.5 py-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-xs font-semibold text-[var(--heading)] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <span>{isEn ? 'Full Specs' : 'مواصفات المنتج'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`/catalog/${activeHeroProduct.slug}`}
                        onClick={(e) =>
                          handleNav(e, `/catalog/${activeHeroProduct.slug}`)
                        }
                        className="px-3 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-xs font-semibold text-[var(--medical)] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Datasheet' : 'النشرة الفنية'}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleInquiry(activeHeroProduct.slug)}
                        className={`h-8 px-2.5 rounded-lg border text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                          isHeroInInquiry
                            ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)]'
                        }`}
                      >
                        {isHeroInInquiry ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Industrial Capability Bar Below Hero Split */}
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] overflow-hidden">
            <div className="p-5 text-start space-y-1">
              <p className="font-mono-num text-2xl sm:text-3xl font-bold text-[var(--heading)] tabular-nums">
                14
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--heading)]">
                {isEn
                  ? 'Manufactured Medical Supplies'
                  : 'منتجًا ومستهلكًا طبيًا قياسيًا'}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {isEn
                  ? 'Documented technical datasheets'
                  : 'بمواصفات ونشرات فنية موثقة'}
              </p>
            </div>

            <div className="p-5 text-start space-y-1">
              <p className="font-mono-num text-2xl sm:text-3xl font-bold text-[var(--heading)] tabular-nums">
                110 & 307
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--heading)]">
                {isEn
                  ? 'Dedicated Industrial Factories'
                  : 'مصانع متخصصة بمدينة تلا'}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {isEn
                  ? 'Tala Industrial Zone — Menofia'
                  : 'المنطقة الصناعية – محافظة المنوفية'}
              </p>
            </div>

            <div className="p-5 text-start space-y-1">
              <p className="font-mono-num text-2xl sm:text-3xl font-bold text-[var(--heading)] tabular-nums">
                06
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--heading)]">
                {isEn
                  ? 'Specialized Production Divisions'
                  : 'أقسام وخطوط إنتاج طبية'}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {isEn
                  ? 'Non-woven, PE, SAP & injection molding'
                  : 'تحويل الأنسجة، اللواصق، والحقن الطبي'}
              </p>
            </div>

            <div className="p-5 text-start space-y-1">
              <p className="font-mono-num text-2xl sm:text-3xl font-bold text-[var(--heading)] tabular-nums">
                WHO / UN3291
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--heading)]">
                {isEn
                  ? 'Infection Control & OEM Supply'
                  : 'مطابقة قياسية وتصنيع للغير OEM'}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {isEn
                  ? 'Custom sizes, weights & private label'
                  : 'تخصيص المقاسات والأوزان والتعبئة'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. ARCHITECTURAL 6-DIVISION PRODUCTION MATRIX
         ==================================================================== */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div className="text-start space-y-1.5">
            <p className="text-xs font-semibold text-[var(--medical)]">
              {isEn
                ? '01. Industrial Production Divisions'
                : '01. خطوط وأقسام التصنيع الطبي'}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--heading)]">
              {isEn
                ? 'Explore Our 6 Manufacturing Lines'
                : 'أقسام الإنتاج الرئيسية بالمصنع'}
            </h2>
          </div>

          <a
            href="/catalog"
            onClick={(e) => handleNav(e, '/catalog')}
            className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap self-start sm:self-end"
          >
            <span>
              {isEn
                ? 'Open Full Engineering Catalog (14 Datasheets)'
                : 'استعرض الكتالوج الهندسي الكامل (14 نشرة فنية)'}
            </span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              onClick={(e) => handleNav(e, `/products?category=${cat.slug}`)}
              className="group bg-[var(--card)] border border-[var(--border)] hover:border-[var(--medical)]/60 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-start"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                    <span className="font-mono-num font-bold text-[var(--medical)]">
                      0{idx + 1}.
                    </span>
                    <span>
                      {isEn ? `${cat.count} Products` : `${cat.count} منتجات`}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--heading)] group-hover:text-[var(--medical)] transition-colors">
                    {isEn ? cat.nameEn : cat.nameAr}
                  </h3>
                  <p className="font-en text-xs text-[var(--muted-foreground)]">
                    {isEn ? cat.nameAr : cat.nameEn}
                  </p>
                </div>

                <div className="w-20 h-20 rounded-xl bg-white border border-[var(--border)] p-2.5 shrink-0 flex items-center justify-center">
                  <SmartImage
                    src={cat.image}
                    alt={isEn ? cat.nameEn : cat.nameAr}
                    className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-[13px] text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
                  {isEn ? cat.descriptionEn : cat.descriptionAr}
                </p>

                <div className="pt-3 border-t border-[var(--border)]/70 flex items-center justify-between text-xs font-semibold text-[var(--heading)]">
                  <span className="group-hover:text-[var(--medical)] transition-colors">
                    {isEn ? 'Browse Division Products' : 'تصفح منتجات القسم'}
                  </span>
                  <ArrowIcon className="w-4 h-4 text-[var(--medical)]" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ====================================================================
          3. INTERACTIVE STOREFRONT COLLECTION (WITH LIVE CATEGORY FILTER)
         ==================================================================== */}
      <section className="bg-[var(--surface)]/55 border-y border-[var(--border)] py-20">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="text-start space-y-1.5">
              <p className="text-xs font-semibold text-[var(--medical)]">
                {isEn
                  ? '02. Medical Consumables Storefront'
                  : '02. متجر المستلزمات والمستهلكات الطبية'}
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[var(--heading)]">
                {isEn
                  ? 'Manufactured Products & Technical Specs'
                  : 'منتجات سيرجي ميد المعتمدة'}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                {isEn
                  ? 'Filter by production line or inspect individual specifications and request an instant B2B quotation.'
                  : 'صفِّ حسب خط الإنتاج أو استعرض المواصفات الفنية الموثقة وأضف المنتجات مباشرة لقائمة طلب التسعير.'}
              </p>
            </div>

            {/* Interactive Segmented Category Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setStoreFilter('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  storeFilter === 'all'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'text-[var(--foreground)] hover:bg-[var(--surface)]'
                }`}
              >
                {isEn ? 'Featured (8)' : 'منتجات مختارة (8)'}
              </button>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setStoreFilter(cat.slug)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    storeFilter === cat.slug
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'text-[var(--foreground)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {isEn ? cat.nameEn : cat.nameAr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {showcaseProducts.map((product) => (
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

          <div className="pt-2 flex justify-center">
            <a
              href="/products"
              onClick={(e) => handleNav(e, '/products')}
              className="bg-[var(--card)] hover:bg-[var(--surface)] text-[var(--heading)] border border-[var(--border)] text-sm font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors shadow-2xs"
            >
              <span>
                {isEn
                  ? 'View All 14 Products in Store'
                  : 'عرض جميع المنتجات الـ 14 في المتجر'}
              </span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. HEALTHCARE SECTORS ARCHITECTURAL MATRIX
         ==================================================================== */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div className="text-start space-y-1.5">
            <p className="text-xs font-semibold text-[var(--medical)]">
              {isEn
                ? '03. Institutional Supply Sectors'
                : '03. القطاعات الطبية التي نخدمها'}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--heading)]">
              {isEn
                ? 'Engineered for Clinical & Supply Chain Environments'
                : 'حلول توريد متكاملة للمنشآت الصحية وسلاسل الإمداد'}
            </h2>
          </div>

          <a
            href="/sectors"
            onClick={(e) => handleNav(e, '/sectors')}
            className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap self-start sm:self-end"
          >
            <span>
              {isEn
                ? 'View Sector Product Blueprints'
                : 'استعرض دليل القطاعات والمنتجات الموصى بها'}
            </span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden divide-y md:divide-y-0 divide-[var(--border)]">
          {SECTORS.map((sector, idx) => (
            <div
              key={sector.id}
              onClick={() => onNavigate('/sectors')}
              className={`p-7 text-start flex flex-col justify-between gap-5 cursor-pointer hover:bg-[var(--surface)]/50 transition-colors border-[var(--border)] ${
                idx < 3 ? 'lg:border-b' : ''
              } ${idx % 3 !== 2 ? 'lg:border-x' : ''}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-num text-xs font-bold text-[var(--medical)]">
                    0{idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                    <SectorIcon name={sector.iconName} />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--heading)]">
                  {isEn ? sector.nameEn : sector.nameAr}
                </h3>

                <p className="text-xs sm:text-[13.5px] text-[var(--muted-foreground)] leading-relaxed">
                  {isEn ? sector.descriptionEn : sector.descriptionAr}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)]/60 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[var(--medical)]">
                {sector.linkedCategories.map((cat, cIdx) => (
                  <span key={cIdx} className="inline-flex items-center gap-1">
                    <span>{isEn ? cat.labelEn || cat.label : cat.label}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. EDITORIAL MEDICAL JOURNAL SHOWCASE (LEAD STORY + 3 STUDIES)
         ==================================================================== */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div className="text-start space-y-1.5">
            <p className="text-xs font-semibold text-[var(--medical)]">
              {isEn
                ? '04. Medical & Engineering Publications'
                : '04. الدوريات والمقالات الطبية والفنية'}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--heading)]">
              {isEn
                ? 'Clinical Studies & Procurement Guides'
                : 'دراسات المواصفات القياسية ومكافحة العدوى'}
            </h2>
          </div>

          <a
            href="/articles"
            onClick={(e) => handleNav(e, '/articles')}
            className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap self-start sm:self-end"
          >
            <span>
              {isEn ? 'All 6 Technical Articles' : 'تصفح جميع المقالات (6)'}
            </span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Featured Lead Article Banner + 3 Grid Articles */}
        {leadArticle && (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <a
              href={`/articles/${leadArticle.slug}`}
              onClick={(e) => handleNav(e, `/articles/${leadArticle.slug}`)}
              className="lg:col-span-5 bg-white border-b lg:border-b-0 lg:border-x border-[var(--border)] p-8 flex items-center justify-center group"
            >
              <SmartImage
                src={leadArticle.image}
                alt={isEn ? leadArticle.titleEn : leadArticle.titleAr}
                className="w-full h-full max-h-64 object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </a>

            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-start space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <span className="font-bold text-[var(--medical)]">
                    {isEn ? 'Featured Study' : 'دراسة مرجعية مميزة'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
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

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--heading)] leading-snug">
                  <a
                    href={`/articles/${leadArticle.slug}`}
                    onClick={(e) =>
                      handleNav(e, `/articles/${leadArticle.slug}`)
                    }
                    className="hover:text-[var(--medical)] transition-colors"
                  >
                    {isEn ? leadArticle.titleEn : leadArticle.titleAr}
                  </a>
                </h3>

                <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                  {isEn ? leadArticle.excerptEn : leadArticle.excerptAr}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`/articles/${leadArticle.slug}`}
                  onClick={(e) => handleNav(e, `/articles/${leadArticle.slug}`)}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <span>
                    {isEn ? 'Read Full Study' : 'اقرأ الدراسة الكاملة'}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </a>

                <span className="text-xs text-[var(--muted-foreground)]">
                  {isEn ? leadArticle.titleAr : leadArticle.titleEn}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              onNavigate={onNavigate}
              lang={lang}
              index={idx + 1}
            />
          ))}
        </div>
      </section>

      {/* ====================================================================
          6. DIRECT FACTORY SUPPLY & B2B QUOTATION BANNER
         ==================================================================== */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-lg"
          style={{ background: 'var(--gradient-blue)' }}
        >
          <div className="text-start space-y-2 max-w-2xl">
            <p className="font-en text-xs font-semibold tracking-wider text-white/80">
              {isEn
                ? 'DIRECT FACTORY B2B & OEM SUPPLY'
                : 'توريد مباشر من المصنع للمستشفيات وشركات التوزيع'}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              {isEn
                ? 'Ready to Coordinate Your Institutional Order?'
                : 'هل تبحث عن عرض سعر مخصص أو توريد للمستشفيات؟'}
            </h2>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              {isEn
                ? 'Contact Surgy Med Factories (110 & 307) in Tala Industrial Zone for official quotations, samples, and custom OEM production runs.'
                : 'تواصل مباشرة مع إدارة مبيعات مصانع سيرجي ميد (110 و 307 بالمنطقة الصناعية بتلا) للحصول على عروض الأسعار الرسمية والعينات وطلبات التصنيع المخصص.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/quote"
              onClick={(e) => handleNav(e, '/quote')}
              className="bg-white hover:bg-white/95 text-[#082E41] text-sm font-bold px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>{isEn ? 'Request Official Quote' : 'اطلب عرض سعر'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <a
              href={buildGeneralWhatsAppUrl(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-sm font-bold px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{isEn ? 'WhatsApp Sales' : 'واتساب المبيعات'}</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phone1Raw}`}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/25 text-sm font-semibold px-5 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr" className="font-mono-num">
                {COMPANY_INFO.phone1}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

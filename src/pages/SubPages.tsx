import React, { useState, useEffect } from 'react';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Building2,
  HeartPulse,
  Stethoscope,
  Smile,
  Truck,
  Network,
  MapPin,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Scale,
  Factory,
  FileCheck2,
  PackageCheck,
  AlertTriangle,
  Lock,
  Landmark,
  Phone,
  BookOpen,
  FileText,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  SECTORS,
  GOVERNORATES,
  GOVERNORATES_EN,
  COMPANY_INFO,
  Sector,
  Language,
} from '../data/surgymedData';
import {
  validateQuoteForm,
  validateContactForm,
  buildGeneralWhatsAppUrl,
} from '../utils/catalogLogic';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppIcon } from '../components/Icons';

interface SubPageCommonProps {
  onNavigate: (path: string) => void;
  lang?: Language;
}

/* ==========================================================================
   1. ABOUT PAGE (/about) — INDUSTRIAL MONOGRAPH & FACTORY PROFILE
   ========================================================================== */
export const AboutPage: React.FC<SubPageCommonProps> = ({
  onNavigate,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const manufacturingSteps = isEn
    ? [
        {
          num: '01',
          title: 'Medical-Grade Raw Material Selection',
          desc: 'We source virgin spunbond polypropylene (PP), fluid-impervious polyethylene (PE) films, Super Absorbent Polymer (SAP), and hypoallergenic medical acrylic adhesives.',
        },
        {
          num: '02',
          title: 'Automated Converting, Slitting & Molding',
          desc: 'Operating across Factories 110 & 307 in Tala Industrial Zone with high-speed lamination, multi-ply folding, roll slitting, and precision polypropylene injection molding.',
        },
        {
          num: '03',
          title: 'Quality Control & WHO / UN3291 Compliance',
          desc: 'Every batch undergoes strict dimensional, absorbency, puncture-resistance, and barrier integrity verification prior to hygienic packaging.',
        },
        {
          num: '04',
          title: 'Institutional Supply & OEM Private Labeling',
          desc: 'Direct fulfillment for public and university hospitals, medical distributors, and custom OEM runs (custom dimensions, GSM weights, and private-label cartons).',
        },
      ]
    : [
        {
          num: '01',
          title: 'اختيار الخامات الطبية الأولية القياسية',
          desc: 'نعتمد على خامات أولية عالية النقاء تشمل الأنسجة غير المنسوجة (Non-Woven PP)، أفلام البولي إيثيلين العازلة للسوائل (PE)، حبيبات الامتصاص الفائق (SAP)، واللواصق الطبية المضادة للحساسية.',
        },
        {
          num: '02',
          title: 'خطوط التحويل والقص والحقن الآلي',
          desc: 'يعمل مصنعا الشركة (110 و 307) بالمنطقة الصناعية بتلا بخطوط إنتاج متخصصة لدمج الطبقات، قص الرولات، طي المفارش، وحقن صناديق الأمان المقاومة للثقب.',
        },
        {
          num: '03',
          title: 'الرقابة النوعية ومطابقة معايير WHO / UN3291',
          desc: 'تخضع المنتجات لفحوصات دقيقة لقياس كفاءة الامتصاص، عدم نفاذية السوائل، ثبات المادة اللاصقة، ومطابقة صناديق النفايات الحادة لاشتراطات منظمة الصحة العالمية.',
        },
        {
          num: '04',
          title: 'التوريد المؤسسي والتصنيع المخصص للغير (OEM)',
          desc: 'توريد منتظم للمستشفيات الحكومية والجامعية والخاصة وشركات التوريدات، مع إتاحة تخصيص المقاسات والأوزان والألوان والتغليف حسب طلب العميل.',
        },
      ];

  return (
    <div className="space-y-20 pb-24">
      {/* 1. Industrial Monograph Hero Split */}
      <section className="bg-grid-pattern border-b border-[var(--border)] pt-10 pb-14">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 text-start space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
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
                    {isEn ? 'About Surgy Med' : 'عن سيرجي ميد'}
                  </span>
                </nav>

                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                  <span>
                    {isEn ? 'Industrial Profile' : 'الملف الصناعي للشركة'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {isEn
                      ? 'Factories 110 & 307 — Tala, Menofia'
                      : 'مصانع 110 و 307 – مدينة تلا، المنوفية'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] leading-tight">
                  {isEn
                    ? 'Surgy Med For Medical Industries'
                    : 'شركة سيرجي ميد للصناعات الطبية'}
                </h1>

                <p className="text-base sm:text-lg font-semibold text-[var(--heading)]/90">
                  {isEn
                    ? COMPANY_INFO.taglineEn
                    : 'تصنيع وتجارة وتصدير المستلزمات والمستهلكات الطبية أحادية الاستخدام.'}
                </p>

                <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                  {isEn
                    ? 'Surgy Med is an Egyptian industrial manufacturer specializing in disposable medical consumables, infection-control barriers, medical tapes, orthopedic supports, and UN3291 sharps disposal containers. From our two dedicated factories in Tala Industrial Zone, we serve hospitals, clinics, and medical distributors nationwide and across export markets.'
                    : 'سيرجي ميد للصناعات الطبية مؤسسة صناعية متخصصة في إنتاج وتوريد وتصدير المستهلكات الطبية أحادية الاستخدام ومستلزمات مكافحة العدوى، انطلاقًا من مصانعها في المنطقة الصناعية بمدينة تلا – محافظة المنوفية، لتلبية احتياجات المستشفيات والمراكز الطبية وشركات التوزيع بمواصفات فنية موثقة وجودة ثابتة.'}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="/catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/catalog');
                  }}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Explore Technical Catalog'
                      : 'تصفح الكتالوج الهندسي'}
                  </span>
                </a>

                <a
                  href="/quote"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/quote');
                  }}
                  className="bg-[var(--card)] hover:bg-[var(--surface)] text-[var(--heading)] border border-[var(--border)] text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <span>
                    {isEn ? 'Request Supply Quote' : 'اطلب عرض سعر للتوريد'}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right / Left Architectural Factory Identity Card (5 cols) */}
            <div className="lg:col-span-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 text-start">
              <div className="flex items-center gap-4 border-b border-[var(--border)] pb-5">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--border)] p-1.5 shrink-0 flex items-center justify-center">
                  <SmartImage
                    src={COMPANY_INFO.logoUrl}
                    alt={isEn ? 'Surgy Med Logo' : 'شعار سيرجي ميد'}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[var(--heading)]">
                    {isEn ? COMPANY_INFO.fullNameEn : COMPANY_INFO.nameAr}
                  </h2>
                  <p className="font-en text-xs text-[var(--muted-foreground)]">
                    SURGY MED FOR MEDICAL INDUSTRIES
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--surface)]/60 border border-[var(--border)]/70 rounded-xl p-4">
                  <p className="font-mono-num text-2xl font-bold text-[var(--heading)]">
                    110 & 307
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {isEn
                      ? 'Factory Units in Tala Industrial Zone'
                      : 'وحدات مصنعية بالمنطقة الصناعية بتلا'}
                  </p>
                </div>

                <div className="bg-[var(--surface)]/60 border border-[var(--border)]/70 rounded-xl p-4">
                  <p className="font-mono-num text-2xl font-bold text-[var(--heading)]">
                    14
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {isEn
                      ? 'Documented Medical Product Lines'
                      : 'منتجًا طبيًا بمواصفات موثقة'}
                  </p>
                </div>

                <div className="bg-[var(--surface)]/60 border border-[var(--border)]/70 rounded-xl p-4">
                  <p className="font-mono-num text-2xl font-bold text-[var(--heading)]">
                    06
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {isEn
                      ? 'Specialized Production Divisions'
                      : 'أقسام إنتاجية وتصنيعية متكاملة'}
                  </p>
                </div>

                <div className="bg-[var(--surface)]/60 border border-[var(--border)]/70 rounded-xl p-4">
                  <p className="font-mono-num text-2xl font-bold text-[var(--heading)]">
                    OEM
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {isEn
                      ? 'Custom Dimensions, GSM & Packaging'
                      : 'تخصيص المقاسات والأوزان والتعبئة'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] space-y-1">
                <p className="font-semibold text-[var(--heading)]">
                  {isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.addressAr}
                </p>
                <p>
                  {isEn ? COMPANY_INFO.landmarkEn : COMPANY_INFO.landmarkAr}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-Stage Industrial Manufacturing Workflow */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-start space-y-1.5 border-b border-[var(--border)] pb-5">
          <p className="text-xs font-semibold text-[var(--medical)]">
            {isEn
              ? '01. Industrial Operations & Quality System'
              : '01. منظومة التشغيل والرقابة الصناعية'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)]">
            {isEn
              ? 'How We Engineer & Supply Medical Consumables'
              : 'مراحل التصنيع وضبط الجودة في مصانع سيرجي ميد'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {manufacturingSteps.map((step) => (
            <div
              key={step.num}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-start flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <span className="font-mono-num text-sm font-bold text-[var(--medical)]">
                  {step.num}.
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[var(--heading)] leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[var(--muted-foreground)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Production Divisions Summary Matrix */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-5">
          <div className="text-start space-y-1.5">
            <p className="text-xs font-semibold text-[var(--medical)]">
              {isEn ? '02. Factory Divisions' : '02. خطوط الإنتاج بالمصنع'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)]">
              {isEn
                ? '6 Specialized Medical Production Lines'
                : 'الأقسام الإنتاجية الـ 6 ومخرجاتها'}
            </h2>
          </div>

          <a
            href="/products"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/products');
            }}
            className="text-xs sm:text-sm font-semibold text-[var(--medical)] hover:underline inline-flex items-center gap-1.5"
          >
            <span>{isEn ? 'View All 14 Products' : 'عرض جميع المنتجات (14)'}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/products?category=${cat.slug}`);
              }}
              className="bg-[var(--card)] border border-[var(--border)] hover:border-[var(--medical)] rounded-2xl p-5 flex items-center gap-4 text-start transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-white border border-[var(--border)] p-2 shrink-0 flex items-center justify-center">
                <SmartImage
                  src={cat.image}
                  alt={isEn ? cat.nameEn : cat.nameAr}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <span className="font-mono-num font-bold text-[var(--medical)]">
                    0{idx + 1}.
                  </span>
                  <span>
                    {isEn ? `${cat.count} Products` : `${cat.count} منتجات`}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--heading)] truncate">
                  {isEn ? cat.nameEn : cat.nameAr}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                  {isEn ? cat.descriptionEn : cat.descriptionAr}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Factory Direct Contact Banner */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="text-start space-y-2 max-w-2xl">
            <h2 className="text-2xl font-bold text-[var(--heading)]">
              {isEn
                ? 'Partner Directly With Surgy Med Factories'
                : 'تواصل مباشرة مع إدارة مصانع سيرجي ميد'}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {isEn
                ? 'For hospital tenders, distributor accounts, or custom OEM production runs, our factory team is ready to assist.'
                : 'لأي استفسار عن المنتجات أو التوريد للمستشفيات أو التصنيع المخصص حسب مواصفات منشأتك.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>{isEn ? 'Contact Factory' : 'تواصل معنا'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--heading)] border border-[var(--border)] text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              {isEn ? 'Supply Terms & Conditions' : 'شروط وأحكام التوريد'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   2. SECTORS PAGE (/sectors) — ARCHITECTURAL SECTOR SOLUTIONS BLUEPRINT
   ========================================================================== */
export const SectorsPage: React.FC<SubPageCommonProps> = ({
  onNavigate,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const renderIcon = (name: Sector['iconName']) => {
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

  const getRecommendedProductsForSector = (sector: Sector) => {
    const catSlugs = sector.linkedCategories
      .map((c) => c.slug)
      .filter((s) => s !== 'all');
    if (catSlugs.length === 0) {
      return PRODUCTS.filter((p) => p.featured).slice(0, 3);
    }
    const matched = PRODUCTS.filter((p) => catSlugs.includes(p.categorySlug));
    return matched.slice(0, 3);
  };

  return (
    <div className="space-y-14 pb-24">
      <section className="bg-grid-pattern border-b border-[var(--border)] pt-10 pb-12">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
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
              {isEn ? 'Healthcare Sectors' : 'القطاعات الطبية'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] tracking-tight">
              {isEn
                ? 'Sector Supply Blueprints & Recommended Consumables'
                : 'دليل القطاعات الطبية والمنتجات الموصى بها'}
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              {isEn
                ? 'Explore how our 6 specialized production lines serve operating rooms, intensive care units, dental centers, and nationwide distribution networks.'
                : 'تعرف على الحلول التصنيعية والمنتجات المخصصة لكل بيئة طبية، من غرف العمليات والرعاية المركزة إلى عيادات الأسنان وشركات التوزيع الطبي.'}
            </p>
          </div>

          {/* Quick Jump Index */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {SECTORS.map((s, idx) => (
              <a
                key={s.id}
                href={`#sector-${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(`sector-${s.id}`)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--surface)] text-xs font-semibold text-[var(--heading)] transition-colors whitespace-nowrap"
              >
                <span className="font-mono-num text-[var(--medical)]">
                  0{idx + 1}.
                </span>{' '}
                {isEn ? s.nameEn : s.nameAr}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Sector Blueprint Rows */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {SECTORS.map((sector, idx) => {
          const recProducts = getRecommendedProductsForSector(sector);
          return (
            <div
              key={sector.id}
              id={`sector-${sector.id}`}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start scroll-mt-24"
            >
              {/* Sector Overview Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                    {renderIcon(sector.iconName)}
                  </div>
                  <span className="font-mono-num text-xs font-bold text-[var(--medical)]">
                    {isEn ? `SECTOR 0${idx + 1}` : `القطاع 0${idx + 1}`}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
                  {isEn ? sector.nameEn : sector.nameAr}
                </h2>

                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {isEn ? sector.descriptionEn : sector.descriptionAr}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {sector.linkedCategories.map((cat, cIdx) => (
                    <a
                      key={cIdx}
                      href={
                        cat.slug === 'all'
                          ? '/products'
                          : `/products?category=${cat.slug}`
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(
                          cat.slug === 'all'
                            ? '/products'
                            : `/products?category=${cat.slug}`
                        );
                      }}
                      className="text-xs font-semibold text-[var(--heading)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>{isEn ? cat.labelEn || cat.label : cat.label}</span>
                      <ArrowIcon className="w-3.5 h-3.5 text-[var(--medical)]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Recommended Factory Products for This Sector (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <span className="font-semibold text-[var(--heading)]">
                    {isEn
                      ? 'Recommended Factory Products for This Sector:'
                      : 'أبرز منتجات المصنع الموصى بها لهذا القطاع:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/quote')}
                    className="text-[var(--medical)] font-semibold hover:underline cursor-pointer"
                  >
                    {isEn ? 'Request Sector Quote' : 'طلب تسعير للقطاع'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {recProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => onNavigate(`/products/${prod.slug}`)}
                      className="cursor-pointer bg-[var(--background)] border border-[var(--border)] hover:border-[var(--medical)] rounded-xl p-3.5 flex flex-col justify-between gap-3 transition-all group"
                    >
                      <div className="w-full aspect-[4/3] bg-white rounded-lg border border-[var(--border)]/60 p-2.5 flex items-center justify-center">
                        <SmartImage
                          src={prod.images[0]}
                          alt={isEn ? prod.nameEn : prod.nameAr}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="font-mono-num text-[10px] font-semibold text-[var(--medical)] block">
                          {prod.code}
                        </span>
                        <h3 className="text-xs font-bold text-[var(--heading)] group-hover:text-[var(--medical)] truncate mt-0.5">
                          {isEn ? prod.nameEn : prod.nameAr}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

/* ==========================================================================
   3. CONTACT PAGE (/contact)
   ========================================================================== */
export const ContactPage: React.FC<SubPageCommonProps> = ({
  onNavigate,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactForm({ name, phone, company, message }, lang);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="space-y-14 pb-20">
      <section className="bg-grid-pattern border-b border-[var(--border)]/60 py-12 sm:py-14">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-3">
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
            <span className="text-[var(--medical)] font-medium">
              {isEn ? 'Contact Us' : 'تواصل معنا'}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)]">
            {isEn ? "Let's Start a Conversation" : 'خلّينا نبدأ تواصل'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl">
            {isEn
              ? 'The Surgy Med sales and factory team is ready to assist with your product and supply inquiries.'
              : 'فريق سيرجي ميد جاهز لاستقبال استفسارات المنتجات والتوريد.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-start">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-xs text-[var(--muted-foreground)]">
                  {isEn ? 'Phone 1' : 'هاتف 1'}
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phone1Raw}`}
                  dir="ltr"
                  className="font-mono-num text-lg font-bold text-[var(--heading)] hover:text-[var(--medical)] inline-block"
                >
                  {COMPANY_INFO.phone1}
                </a>
              </div>

              <div className="space-y-1 pt-4 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--muted-foreground)]">
                  {isEn ? 'Phone 2' : 'هاتف 2'}
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phone2Raw}`}
                  dir="ltr"
                  className="font-mono-num text-lg font-bold text-[var(--heading)] hover:text-[var(--medical)] inline-block"
                >
                  {COMPANY_INFO.phone2}
                </a>
              </div>

              <div className="space-y-1 pt-4 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--muted-foreground)]">
                  {isEn ? 'Telefax' : 'تليفاكس'}
                </p>
                <p
                  dir="ltr"
                  className="font-mono-num text-base font-bold text-[var(--heading)]"
                >
                  {COMPANY_INFO.fax}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--heading)]">
                  {isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.addressAr}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {isEn ? COMPANY_INFO.landmarkEn : COMPANY_INFO.landmarkAr}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=Tala+General+Hospital+Menofia+Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-[var(--border)] hover:bg-[var(--surface)] text-xs font-semibold text-[var(--heading)] inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[var(--medical)]" />
                  <span>{isEn ? 'Directions' : 'الاتجاهات'}</span>
                </a>

                <a
                  href={buildGeneralWhatsAppUrl(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{isEn ? 'WhatsApp' : 'واتساب'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 text-start">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-6">
              {isEn ? 'Send a Message' : 'أرسل رسالة'}
            </h2>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[var(--whatsapp)] mx-auto" />
                <h3 className="text-lg font-bold text-[var(--heading)]">
                  {isEn
                    ? 'Your Message Has Been Received'
                    : 'تم استلام رسالتك بنجاح'}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                  {isEn
                    ? 'Thank you for contacting Surgy Med For Medical Industries. Our sales team will reach out to you shortly.'
                    : 'شكرًا لتواصلك مع سيرجي ميد للصناعات الطبية. سيقوم فريق المبيعات بالتواصل معك في أقرب وقت.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setCompany('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold cursor-pointer"
                >
                  {isEn ? 'Send Another Message' : 'إرسال رسالة جديدة'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Full Name' : 'الاسم'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                    {errors.name && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Phone Number' : 'رقم الهاتف'}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      dir="ltr"
                      placeholder="01xxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold text-[var(--heading)]"
                  >
                    {isEn ? 'Company or Facility ' : 'الشركة أو المنشأة '}
                    <span className="text-[var(--muted-foreground)] font-normal">
                      {isEn ? '(Optional)' : '(اختياري)'}
                    </span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[var(--heading)]"
                  >
                    {isEn ? 'Your Message' : 'رسالتك'}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 text-sm focus:outline-none focus:border-[var(--medical)]"
                  />
                  {errors.message && (
                    <p className="text-xs text-[var(--brand-red)]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-sm font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'Send Message' : 'إرسال الرسالة'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. QUOTE PAGE (/quote)
   ========================================================================== */
interface QuotePageProps extends SubPageCommonProps {
  inquirySlugs: string[];
  onRemoveInquirySlug: (slug: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  onNavigate,
  inquirySlugs,
  onRemoveInquirySlug,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const inquiryProducts = inquirySlugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [requestedProducts, setRequestedProducts] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (inquiryProducts.length > 0 && !requestedProducts) {
      setRequestedProducts(
        inquiryProducts
          .map((p) => (isEn ? p.nameEn : p.nameAr))
          .join(isEn ? ', ' : '، ')
      );
    }
  }, [inquirySlugs, isEn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateQuoteForm(
      {
        name,
        company,
        phone,
        email,
        governorate,
        quantity,
        requestedProducts,
        details,
      },
      lang
    );
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const govList = isEn ? GOVERNORATES_EN : GOVERNORATES;

  return (
    <div className="space-y-12 pb-20">
      <section className="bg-grid-pattern border-b border-[var(--border)]/60 py-12 sm:py-14">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-3">
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
            <span className="text-[var(--medical)] font-medium">
              {isEn ? 'Request a Quote' : 'طلب عرض سعر'}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)]">
            {isEn ? 'Request an Official Quotation' : 'اطلب عرض سعر'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl">
            {isEn
              ? 'Tell us your facility requirements and quantities, and our sales team will provide pricing and supply terms.'
              : 'أخبرنا باحتياجك، وسيتواصل معك فريق المبيعات بالتفاصيل وشروط التوريد.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quote Request Form (8 cols) */}
          <div className="lg:col-span-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 text-start">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[var(--whatsapp)] mx-auto" />
                <h2 className="text-2xl font-bold text-[var(--heading)]">
                  {isEn
                    ? 'Quotation Request Submitted Successfully'
                    : 'تم إرسال طلب عرض السعر بنجاح'}
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
                  {isEn
                    ? `Thank you, ${name}. Your quotation request for "${company}" (${requestedProducts}) has been registered. Our sales team will contact you shortly.`
                    : `شكرًا لك يا ${name}. تم تسجيل طلب عرض السعر الخاص بـ "${company}" للمنتجات المطلوبة (${requestedProducts})، وسيتواصل معك فريق المبيعات هاتفيًا قريبًا.`}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold cursor-pointer"
                  >
                    {isEn ? 'Submit Another Request' : 'إرسال طلب آخر'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Full Name' : 'الاسم'}
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                    {errors.name && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-company"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Company / Hospital Name' : 'اسم الشركة أو المنشأة'}
                    </label>
                    <input
                      id="quote-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                    {errors.company && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Phone Number' : 'رقم الهاتف'}
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      dir="ltr"
                      placeholder="01xxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Email Address ' : 'البريد الإلكتروني '}
                      <span className="text-[var(--muted-foreground)] font-normal">
                        {isEn ? '(Optional)' : '(اختياري)'}
                      </span>
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-gov"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Governorate / Region' : 'المحافظة'}
                    </label>
                    <select
                      id="quote-gov"
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--medical)]"
                    >
                      <option value="">
                        {isEn ? 'Select Governorate' : 'اختر المحافظة'}
                      </option>
                      {govList.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                    {errors.governorate && (
                      <p className="text-xs text-[var(--brand-red)]">
                        {errors.governorate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-qty"
                      className="block text-xs font-semibold text-[var(--heading)]"
                    >
                      {isEn ? 'Estimated Quantity ' : 'الكمية التقريبية '}
                      <span className="text-[var(--muted-foreground)] font-normal">
                        {isEn ? '(Optional)' : '(اختياري)'}
                      </span>
                    </label>
                    <input
                      id="quote-qty"
                      type="text"
                      placeholder={
                        isEn
                          ? 'e.g. 10,000 pcs / 50 cartons'
                          : 'مثال: 10,000 قطعة'
                      }
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-products"
                    className="block text-xs font-semibold text-[var(--heading)]"
                  >
                    {isEn ? 'Requested Products' : 'المنتجات المطلوبة'}
                  </label>
                  <input
                    id="quote-products"
                    type="text"
                    placeholder={
                      isEn
                        ? 'Enter product names or codes'
                        : 'اكتب أسماء المنتجات المطلوبة'
                    }
                    value={requestedProducts}
                    onChange={(e) => setRequestedProducts(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--medical)]"
                  />
                  {errors.requestedProducts && (
                    <p className="text-xs text-[var(--brand-red)]">
                      {errors.requestedProducts}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-details"
                    className="block text-xs font-semibold text-[var(--heading)]"
                  >
                    {isEn ? 'Additional Specifications ' : 'تفاصيل إضافية '}
                    <span className="text-[var(--muted-foreground)] font-normal">
                      {isEn ? '(Optional)' : '(اختياري)'}
                    </span>
                  </label>
                  <textarea
                    id="quote-details"
                    rows={4}
                    placeholder={
                      isEn
                        ? 'Any required sizes, colors, OEM private labeling, or delivery schedule'
                        : 'أي مواصفات خاصة بالمقاسات أو الألوان أو التوريد'
                    }
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 text-sm focus:outline-none focus:border-[var(--medical)]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-sm font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'Submit Quote Request' : 'إرسال الطلب'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar: Selected Inquiry List & Direct Factory Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-start">
            {inquiryProducts.length > 0 && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
                <h2 className="text-base font-bold text-[var(--heading)]">
                  {isEn
                    ? `Selected Products (${inquiryProducts.length})`
                    : `المنتجات المختارة (${inquiryProducts.length})`}
                </h2>
                <div className="space-y-2.5">
                  {inquiryProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)]"
                    >
                      <span className="text-xs font-semibold text-[var(--heading)] truncate">
                        {isEn ? p.nameEn : p.nameAr}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveInquirySlug(p.slug)}
                        className="text-[var(--muted-foreground)] hover:text-[var(--brand-red)] cursor-pointer"
                        aria-label={isEn ? 'Remove' : 'إزالة'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-[var(--heading)]">
                {isEn ? 'Direct Contact' : 'تواصل مباشر'}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                {isEn
                  ? 'Prefer immediate coordination? Contact our sales management directly via WhatsApp or telephone.'
                  : 'تفضل التواصل السريع؟ كلمنا مباشرة عبر واتساب أو الهاتف.'}
              </p>

              <a
                href={buildGeneralWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>
                  {isEn ? 'Contact via WhatsApp' : 'تواصل عبر واتساب'}
                </span>
              </a>

              <div className="pt-3 border-t border-[var(--border)] space-y-2 text-xs text-[var(--muted-foreground)]">
                <p
                  dir="ltr"
                  className="font-mono-num font-bold text-sm text-[var(--heading)]"
                >
                  {COMPANY_INFO.phone1}
                </p>
                <p
                  dir="ltr"
                  className="font-mono-num font-bold text-sm text-[var(--heading)]"
                >
                  {COMPANY_INFO.phone2}
                </p>
                <p>
                  {isEn ? 'Fax: ' : 'فاكس: '}
                  <span dir="ltr" className="font-mono-num">
                    {COMPANY_INFO.fax}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. COMPREHENSIVE TERMS & CONDITIONS PAGE (/terms)
   ========================================================================== */
export const TermsPage: React.FC<SubPageCommonProps> = ({
  onNavigate,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const sections = isEn
    ? [
        {
          id: 'scope',
          icon: <Landmark className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 01',
          title: '1. Corporate Identity, Scope & Legal Framework',
          paragraphs: [
            'These Terms and Conditions govern all institutional inquiries, technical catalog usage, B2B supply agreements, and custom manufacturing (OEM) orders executed with Surgy Med For Medical Industries ("Surgy Med"), operating from Factories No. (110) and (307), Tala Industrial Zone, Menofia Governorate, Arab Republic of Egypt.',
            'Our website, technical datasheets (/catalog), and digital quotation channels are designed for healthcare institutions, public and university hospitals, medical centers, dental clinics, pharmacies, and licensed medical supply distributors.',
          ],
          bullets: [
            'Official Manufacturing Site: Factories (110) & (307), Industrial Zone, Tala, Menofia, Egypt.',
            'Core Activity: Manufacturing, trading, and exporting single-use medical consumables and infection-control supplies.',
            'Direct Factory Verification: All official supply orders are confirmed exclusively through our registered phone lines (+20 109 224 0902 / +20 100 691 1056) or official factory office.',
          ],
        },
        {
          id: 'specs',
          icon: <FileCheck2 className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 02',
          title: '2. Technical Specifications, Raw Materials & Manufacturing Tolerances',
          paragraphs: [
            'Surgy Med manufactures all 14 product lines according to documented engineering specifications detailed in our Technical Catalog (/catalog). We utilize virgin medical-grade polymers, non-woven spunbond polypropylene (PP), laminated polyethylene (PE) films, Super Absorbent Polymer (SAP), and hypoallergenic medical acrylic/hot-melt adhesives.',
            'In accordance with standard industrial converting and textile manufacturing norms, minor dimensional tolerances (±2% to ±3% in roll length, sheet dimensions, or basis weight GSM) are considered within acceptable quality control limits unless tighter tolerances are explicitly contracted in writing.',
          ],
          bullets: [
            'Absorbent Products (Underpads, Dental Bibs, Surgical Drapes): Manufactured with verified cellulose pulp / SAP ratios and fluid-impervious PE backsheets.',
            'Sharps Disposal Containers (Safety Boxes): Molded from high-impact puncture-resistant polypropylene compliant with WHO and UN3291 standards (available in 1.25L, 5L, 7L, and 10L capacities).',
            'Sterilization Indicators: Chemical steam sterilization cards (Autoclave indicators) must be used strictly within the specified temperature and steam exposure parameters.',
          ],
        },
        {
          id: 'quotes',
          icon: <Scale className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 03',
          title: '3. B2B Quotations, Pricing Validity & Purchase Orders',
          paragraphs: [
            'Submitting an inquiry via the website Inquiry Cart, Quote Request Form (/quote), or WhatsApp constitutes an invitation to quote and does not form a binding supply contract until Surgy Med issues an official Proforma Invoice or written Quotation.',
            'Due to fluctuations in global petrochemical and medical paper raw material indices, price quotations remain valid for the specific duration stated on the official offer (typically 7 to 15 calendar days) and are subject to final confirmation upon Purchase Order (PO) issuance and down-payment clearance.',
          ],
          bullets: [
            'Prices may vary based on total order volume (carton tiers vs. full-truckload institutional contracts).',
            'All taxes, customs duties (for export orders), and freight charges are itemized separately according to the agreed Incoterms or local delivery schedule.',
          ],
        },
        {
          id: 'oem',
          icon: <Factory className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 04',
          title: '4. Custom Manufacturing (OEM), Private Labeling & Minimum Order Quantities (MOQ)',
          paragraphs: [
            'Surgy Med offers custom manufacturing options including bespoke dimensions, absorbency weights, polymer colors, and private-label packaging for hospitals and major distribution networks.',
            'Custom production runs require adherence to specific Minimum Order Quantities (MOQ) to calibrate high-speed converting lines and printing cylinders.',
          ],
          bullets: [
            'Custom Underpads (Special Sizes / Absorbency): Minimum order quantity of 100,000 pieces per custom production run, as documented in our technical datasheet.',
            'Custom Roll Widths & Lengths (Medical Exam Rolls / Towel Rolls): Subject to master-roll slitting multiples and factory production scheduling.',
            'Custom OEM orders require a non-refundable manufacturing deposit prior to raw material allocation and cannot be canceled once production has commenced.',
          ],
        },
        {
          id: 'delivery',
          icon: <PackageCheck className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 05',
          title: '5. Packaging, Delivery, Inspection & Acceptance Protocol',
          paragraphs: [
            'All products are packed in protective inner polyethylene bags and reinforced master corrugated cartons engineered for safe warehousing and multi-governorate transport across Egypt and export markets.',
            'The buyer or receiving hospital storekeeper must inspect the shipment upon delivery for carton count and visible external integrity. Any shortage or transit damage must be documented on the delivery receipt and reported to Surgy Med within 48 hours of receipt.',
          ],
          bullets: [
            'Standard stock items are dispatched according to the agreed warehouse release schedule.',
            'Returns are not accepted for medical consumables once inner hygienic packaging has been opened, tampered with, or stored in non-compliant environments.',
          ],
        },
        {
          id: 'storage',
          icon: <ShieldCheck className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 06',
          title: '6. Storage Conditions & Shelf-Life Preservation',
          paragraphs: [
            'The performance of medical adhesives (Silk Tape, Non-Woven Roll Plaster, Dressing Strips), sterilization indicator inks, and SAP absorbent cores depends directly on proper institutional storage.',
            'The buyer bears full responsibility for storing delivered goods in a clean, dry, well-ventilated medical warehouse away from direct sunlight, high humidity, boilers, or chemical fumes.',
          ],
          bullets: [
            'Recommended Storage Temperature: Between 15°C and 25°C, with relative humidity below 65%.',
            'Cartons must be stacked on pallets off the floor and away from exterior walls, following First-Expired, First-Out (FEFO) inventory rotation.',
          ],
        },
        {
          id: 'clinical',
          icon: <AlertTriangle className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 07',
          title: '7. Single-Use Medical Disclaimer & Infection Control Responsibility',
          paragraphs: [
            'Unless explicitly stated otherwise, Surgy Med consumables (Dental Bibs, Underpads, Exam Table Rolls, PE Aprons, Overshoes, Bouffant Caps, Surgical Drapes, and Sharps Containers) are strictly SINGLE-USE medical products.',
            'Re-using, washing, or attempting to re-process single-use non-woven or polyethylene barriers compromises fluid impermeability and creates severe cross-contamination risks for which Surgy Med assumes zero liability.',
          ],
          bullets: [
            'Sharps Containers must be permanently locked and disposed of once contents reach the marked 3/4 fill line in accordance with Egyptian Ministry of Health and WHO biohazard protocols.',
            'Non-sterile bulk consumables must undergo validated hospital sterilization if intended for invasive sterile fields.',
          ],
        },
        {
          id: 'ip',
          icon: <Lock className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'Clause 08',
          title: '8. Intellectual Property, Trademarks & Governing Law',
          paragraphs: [
            'All brand names, including "Surgy Med", product photography, technical datasheets, and medical articles published on this platform are the exclusive intellectual property of Surgy Med For Medical Industries.',
            'These Terms and Conditions and any supply dispute arising therefrom shall be governed by and construed in accordance with the laws of the Arab Republic of Egypt, under the jurisdiction of the competent courts in Menofia Governorate.',
          ],
        },
      ]
    : [
        {
          id: 'scope',
          icon: <Landmark className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند الأول',
          title: '1. الهوية القانونية للمصنع ونطاق تطبيق الشروط والأحكام',
          paragraphs: [
            'تُنظّم هذه الشروط والأحكام كافة التعاملات التجارية، طلبات عروض الأسعار، أوامر التوريد المؤسسية (B2B)، واستخدام الكتالوج الفني والنشرات الهندسية الخاصة بشركة ومصانع "سيرجي ميد للصناعات الطبية" (Surgy Med For Medical Industries)، والكائن مقرها الصناعي في: مصنع (110) و (307) بالمنطقة الصناعية – مدينة تلا – محافظة المنوفية – جمهورية مصر العربية.',
            'تُوجّه خدماتنا ومنتجاتنا للمستشفيات الحكومية والجامعية والخاصة، المراكز الطبية، عيادات الأسنان، الصيدليات، وشركات التوريدات الطبية المعتمدة داخل مصر وخارجها.',
          ],
          bullets: [
            'المقر التصنيعي الرسمي: مصنع (110) ومصنع (307) بالمنطقة الصناعية بتلا – المنوفية.',
            'نطاق النشاط: تصنيع وتجارة وتصدير المستهلكات والمستلزمات الطبية أحادية الاستخدام ومستلزمات مكافحة العدوى.',
            'قنوات الاعتماد الرسمية: لا يُعتد بأي أوامر توريد أو ارتباطات سعرية إلا الصادرة والمؤكدة عبر أرقام وإدارة المبيعات الرسمية للمصنع.',
          ],
        },
        {
          id: 'specs',
          icon: <FileCheck2 className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند الثاني',
          title: '2. المواصفات الفنية، الخامات القياسية، ونسب السماحية التصنيعية',
          paragraphs: [
            'تلتزم سيرجي ميد بتصنيع منتجاتها الـ 14 وفق المواصفات الفنية الموثقة في قسم الكتالوج الفني (/catalog)، باستخدام خامات طبية أولية عالية الجودة تشمل البولي بروبيلين غير المنسوج (Non-Woven PP)، أفلام البولي إيثيلين العازلة للسوائل (PE Film)، البوليمر فائق الامتصاص (SAP)، واللواصق الطبية المضادة للحساسية (Hypoallergenic Medical Adhesives).',
            'وفقًا للأعراف الصناعية القياسية في خطوط تحويل الورق الطبي والمنسوجات غير المنسوجة والحقن البلاستيكي، تُقبل نسبة سماحية قياسية طفيفة (±2% إلى ±3% في أطوال الرولات أو أبعاد المفارش أو الوزن الجرامي GSM) ما لم يتم الاتفاق كتابيًا في أمر التوريد على مواصفة خاصة مغايرة.',
          ],
          bullets: [
            'منتجات الامتصاص والعزل (مفارش الأسنان، مفارش كبار السن، ملايات العمليات): تُنتج بطبقات سيلولوز وSAP مختبرة لضمان عدم النفاذية.',
            'صناديق النفايات الحادة (Safety Box): تُصنع من البولي بروبيلين المقاوم للثقب والكسر وفق معايير منظمة الصحة العالمية (WHO) ومواصفة الأمم المتحدة (UN3291) بسعات 1.25 و5 و7 و10 لتر.',
            'كروت مؤشرات التعقيم: مخصصة للتحقق من كفاءة دورات التعقيم بالبخار (Autoclave) ويجب استخدامها ضمن درجات الحرارة وأزمنة التعرض القياسية.',
          ],
        },
        {
          id: 'quotes',
          icon: <Scale className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند الثالث',
          title: '3. عروض الأسعار، صلاحية التسعير، وأوامر الشراء (B2B)',
          paragraphs: [
            'إن إضافة المنتجات إلى "قائمة الاستفسارات" بالموقع أو إرسال نموذج "اطلب عرض سعر" (/quote) أو المراسلة عبر واتساب يُعد طلب استعلام تسعيري ولا يُنشئ التزامًا تعاقديًا إلا بعد إصدار عرض سعر رسمي أو فاتورة مبدئية (Proforma Invoice) من إدارة مبيعات سيرجي ميد.',
            'نظرًا لارتباط تكلفة المستهلكات الطبية بأسعار الخامات البتروكيماوية والورق الطبي عالميًا، تكون عروض الأسعار سارية خلال المدة المحددة في العرض الرسمي فقط (عادةً من 7 إلى 15 يومًا)، وتخضع للتأكيد النهائي عند تعميد أمر الشراء وسداد الدفعة المقدمة المتفق عليها.',
          ],
          bullets: [
            'تخضع الشرائح السعرية لحجم الكميات المطلوبة (طلبات الكراتين القياسية مقابل عقود التوريد السنوية للمستشفيات والمناقصات).',
            'يتم توضيح الضرائب المقررة قانونًا وتكاليف الشحن والنقل بشكل تفصيلي ومستقل في الفواتير الرسمية.',
          ],
        },
        {
          id: 'oem',
          icon: <Factory className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند الرابع',
          title: '4. التصنيع المخصص للغير (OEM) والحد الأدنى للكميات (MOQ)',
          paragraphs: [
            'يتيح مصنع سيرجي ميد إمكانية تخصيص المقاسات، الأوزان الجرامية، الألوان، ومعدلات الامتصاص، بالإضافة إلى التعبئة والتغليف لحساب الغير (Private Label / OEM) للمستشفيات الكبرى وشركات التوزيع.',
            'تخضع طلبات التصنيع المخصص للحد الأدنى للكميات التشغيلية (MOQ) اللازمة لضبط خطوط الإنتاج واسطوانات القص والطباعة:',
          ],
          bullets: [
            'مفرش كبار السن (Underpads) بالمقاسات أو الأوزان الخاصة: الحد الأدنى للتشغيل المخصص هو 100,000 قطعة للطلبية الواحدة كما هو موثق في النشرة الفنية للمنتج.',
            'رولات الكشف الطبي ورولات التنشيف بالمقاسات الخاصة: تخضع لمضاعفات عرض الرول الأم (Jumbo Roll) وجدول تشغيل الماكينات بالمصنع.',
            'تتطلب أوامر التصنيع المخصص (OEM) دفعة تعاقد مقدمة غير قابلة للاسترداد بعد بدء حجز الخامات وتشغيل خط الإنتاج.',
          ],
        },
        {
          id: 'delivery',
          icon: <PackageCheck className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند الخامس',
          title: '5. التعبئة والتغليف، التسليم، وفحص ومطابقة الشحنات',
          paragraphs: [
            'تُعبأ جميع منتجات سيرجي ميد داخل أكياس داخلية محكمة الإغلاق وكراتين خارجية مقواة مصممة لتحمل ظروف الشحن والتخزين في المخازن الطبية بمختلف محافظات الجمهورية والتصدير.',
            'يلتزم العميل أو أمين المخزن الطبي بالمنشأة المستلمة بفحص الشحنة ظاهريًا فور الاستلام للتأكد من مطابقة عدد الكراتين وسلامة العبوات الخارجية، وفي حال وجود أي ملاحظة أو تلف ناتج عن النقل يجب إثباته في إذن الاستلام وإخطار إدارة المبيعات خلال 48 ساعة كحد أقصى.',
          ],
          bullets: [
            'لا يُقبل استرجاع أو استبدال المستهلكات الطبية بعد فتح العبوات الداخلية أو فض أختام التغليف حفاظًا على معايير السلامة الصحية ومنع التلوث.',
            'تلتزم الشركة باستبدال أي صنف يثبت وجود عيب صناعي مصنعي به شريطة الإبقاء عليه في عبوته الأصلية وإخطار المصنع رسميًا.',
          ],
        },
        {
          id: 'storage',
          icon: <ShieldCheck className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند السادس',
          title: '6. اشتراطات التخزين القياسية والحفاظ على الصلاحية الفنية',
          paragraphs: [
            'تعتمد كفاءة المستلزمات الطبية — وخاصة اللواصق الطبية (الحرير، النون ووفن، بلاستر الجروح)، كروت التعقيم الكيميائية، والمفارش فائقة الامتصاص — بشكل مباشر على ظروف التخزين لدى العميل بعد التسليم.',
            'تخلي شركة سيرجي ميد مسؤوليتها عن أي تغير في خواص المادة اللاصقة أو كفاءة المؤشرات الكيميائية ناتج عن سوء التخزين لدى المشتري.',
          ],
          bullets: [
            'يجب تخزين الكراتين في مخازن طبية جافة وجيدة التهوية بعيدًا عن أشعة الشمس المباشرة ومصادر الحرارة والرطوبة العالية (درجة حرارة موصى بها 15° إلى 25° مئوية ورطوبة نسبية أقل من 65%).',
            'يُوصى برص الكراتين على بالتات مرتفعة عن الأرض وعدم تكديسها فوق الارتفاع المسموح به، مع تطبيق نظام الصرف حسب الأقدم إنتاجًا (FIFO / FEFO).',
          ],
        },
        {
          id: 'clinical',
          icon: <AlertTriangle className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند السابع',
          title: '7. إخلاء المسؤولية الإكلينيكية وضوابط الاستخدام الأحادي (Single-Use)',
          paragraphs: [
            'صُممت المستهلكات الطبية التي تنتجها سيرجي ميد (مفارش الأسنان، مفارش كبار السن، رولات الكشف، المرايل، الأوفرشوز، أغطية الرأس، ملايات العمليات، وصناديق الأمان) لتكون منتجات أحادية الاستخدام (Single-Use Disposable) ما لم يُنص على غير ذلك.',
            'يُحظر تمامًا إعادة غسل أو تدوير أو إعادة استخدام المستهلكات أحادية الاستخدام بين المرضى؛ لما يسببه ذلك من فقدان خواص العزل وانتقال العدوى المكتسبة بالمستشفيات (HAIs)، وتقع مسؤولية الالتزام ببروتوكولات مكافحة العدوى كاملة على عاتق المنشأة الطبية المستخدمة.',
          ],
          bullets: [
            'يجب إغلاق صناديق النفايات الحادة (Safety Box) نهائيًا فور وصول المخلفات إلى خط الامتلاء الأقصى (3/4 السعة) والتخلص منها عبر المحارق الطبية المرخصة.',
            'المنتجات الموردة في عبوات غير معقمة (Non-Sterile Bulk) والتي يُراد استخدامها في بيئة جراحية معقمة يجب إخضاعها لدورات تعقيم معتمدة داخل قسم التعقيم المركزي (CSSD) بالمستشفى.',
          ],
        },
        {
          id: 'ip',
          icon: <Lock className="w-5 h-5 text-[var(--medical)]" />,
          badge: 'البند الثامن',
          title: '8. حقوق الملكية الفكرية، القانون الواجب التطبيق، والاختصاص القضائي',
          paragraphs: [
            'جميع العلامات التجارية، الشعارات، الصور الفوتوغرافية للمنتجات، الجداول الهندسية بالكتالوج الفني، والمقالات العلمية المنشورة على هذا الموقع هي ملكية فكرية خالصة لشركة سيرجي ميد للصناعات الطبية، ويُحظر نسخها أو استخدامها لأغراض تجارية دون إذن كتابي مسبق.',
            'تخضع هذه الشروط والأحكام وكافة المعاملات الناشئة عنها لقوانين جمهورية مصر العربية، وتختص المحاكم المصرية المختصة بمحافظة المنوفية بالنظر في أي نزاع قد ينشأ بشأن تفسيرها أو تنفيذها.',
          ],
        },
      ];

  return (
    <div className="space-y-14 pb-20">
      <section className="relative overflow-hidden bg-grid-pattern border-b border-[var(--border)]/60 py-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
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
              {isEn ? 'Terms & Conditions' : 'الشروط والأحكام'}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--heading)] leading-tight max-w-4xl">
            {isEn
              ? 'Terms & Conditions of Manufacturing, Supply & Technical Compliance'
              : 'الشروط والأحكام العامة للتصنيع والتوريد والالتزام الفني'}
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-3xl leading-relaxed">
            {isEn
              ? 'A comprehensive legal and technical framework governing B2B medical consumable supply, OEM customization, quality tolerances, storage standards, and clinical safety protocols at Surgy Med For Medical Industries.'
              : 'وثيقة تنظيمية وفنية شاملة توضح ضوابط التوريد للمستشفيات والشركات، معايير الجودة والسماحية الهندسية، شروط التصنيع المخصص (OEM)، واشتراطات التخزين والسلامة الطبية لمصانع سيرجي ميد للصناعات الطبية.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 text-start">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[var(--heading)]">
                {isEn ? 'Clauses Table of Contents' : 'فهرس بنود الشروط والأحكام'}
              </h2>
              <nav className="space-y-1.5">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(sec.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="block px-3.5 py-2.5 rounded-xl text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)] hover:text-[var(--heading)] transition-colors"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[var(--heading)]">
                {isEn
                  ? 'Institutional Contracts & Tenders'
                  : 'التعاقدات المؤسسية والمناقصات'}
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {isEn
                  ? 'For annual hospital supply contracts, technical tender envelopes, or custom OEM agreements, contact our factory sales management directly.'
                  : 'لطلبات التعاقد السنوي للمستشفيات، المظاريف الفنية للمناقصات، أو اتفاقيات التصنيع للغير (OEM)، تواصل مع إدارة المصنع مباشرة.'}
              </p>
              <div className="space-y-2.5">
                <a
                  href="/quote"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/quote');
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{isEn ? 'Request Official Quote' : 'اطلب عرض سعر رسمي'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>
                <a
                  href="/catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/catalog');
                  }}
                  className="w-full py-2.5 px-5 rounded-xl border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>
                    {isEn
                      ? 'Review Technical Catalog'
                      : 'مراجعة الكتالوج الفني المعتمد'}
                  </span>
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6 text-start">
            {sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-28"
              >
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                    {sec.icon}
                  </div>
                  <span className="text-xs font-bold text-[var(--medical)]">
                    {sec.badge}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">
                  {sec.title}
                </h2>

                <div className="space-y-3">
                  {sec.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[var(--foreground)] leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {sec.bullets && (
                  <ul className="bg-[var(--surface)]/60 border border-[var(--border)]/70 rounded-xl p-4 sm:p-5 space-y-2.5 mt-3">
                    {sec.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--heading)] leading-relaxed"
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
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. PRIVACY POLICY PAGE (/privacy)
   ========================================================================== */
export const PrivacyPage: React.FC<SubPageCommonProps> = ({
  onNavigate,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 text-start">
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
        <span className="text-[var(--medical)] font-medium">
          {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
        </span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)]">
        {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
      </h1>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-7 sm:p-10 space-y-6 text-sm text-[var(--foreground)] leading-relaxed">
        <p>
          {isEn
            ? 'Surgy Med For Medical Industries respects the privacy of all visitors and B2B partners. Contact data and quotation inquiries submitted through our forms are used exclusively to respond to supply requests and provide technical and commercial support.'
            : 'تحترم شركة سيرجي ميد للصناعات الطبية خصوصية زوار موقعها الإلكتروني، وتلتزم بحماية البيانات التي يتم مشاركتها عبر نماذج التواصل وطلب عروض الأسعار.'}
        </p>
        <h2 className="text-lg font-bold text-[var(--heading)]">
          {isEn ? 'Data We Collect' : 'البيانات التي نجمعها'}
        </h2>
        <p>
          {isEn
            ? 'When submitting a contact message or quotation request, we collect your name, phone number, company or hospital name, governorate, and requested product list solely to enable our sales team to contact you.'
            : 'عند إرسال طلب عرض سعر أو رسالة تواصل، نقوم بجمع الاسم، رقم الهاتف، اسم الشركة أو المنشأة، المحافظة، وتفاصيل المنتجات المطلوبة بهدف تمكين فريق المبيعات من الرد على استفساراتكم.'}
        </p>
        <h2 className="text-lg font-bold text-[var(--heading)]">
          {isEn ? 'How We Use Information' : 'استخدام المعلومات'}
        </h2>
        <p>
          {isEn
            ? 'Submitted information is used strictly to prepare quotations, coordinate supply deliveries, and respond to technical inquiries. We never sell or share client data with third parties.'
            : 'تُستخدم البيانات المقدمة حصريًا للتواصل معكم بخصوص المنتجات وطلبات التوريد وعروض الأسعار، ولا تتم مشاركتها مع أي أطراف خارجية لأغراض تسويقية.'}
        </p>
      </div>
    </div>
  );
};

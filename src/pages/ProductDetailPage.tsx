import React, { useState } from 'react';
import {
  Phone,
  Plus,
  Check,
  Share2,
  Copy,
  Printer,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  X,
  ArrowUpLeft,
  ArrowUpRight,
  FileText,
  BookOpen,
} from 'lucide-react';
import { PRODUCTS, COMPANY_INFO, Language } from '../data/surgymedData';
import {
  buildProductWhatsAppUrl,
  getArticlesForProduct,
} from '../utils/catalogLogic';
import { ProductCard } from '../components/ProductCard';
import { ArticleCard } from '../components/ArticleCard';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppIcon } from '../components/Icons';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  inquirySlugs: string[];
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  inquirySlugs,
  onToggleInquiry,
  lang = 'ar',
}) => {
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isInInquiry = inquirySlugs.includes(product.slug);
  const linkedArticles = getArticlesForProduct(product);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.categorySlug === product.categorySlug
  ).slice(0, 3);

  if (relatedProducts.length < 3) {
    const extras = PRODUCTS.filter(
      (p) =>
        p.slug !== product.slug &&
        !relatedProducts.some((rel) => rel.slug === p.slug)
    ).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extras);
  }

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: isEn
            ? `${product.nameEn} — ${COMPANY_INFO.fullNameEn}`
            : `${product.nameAr} — ${COMPANY_INFO.nameAr}`,
          text: isEn ? product.shortDescEn : product.shortDescAr,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const advantages = isEn
    ? product.advantagesEn || product.advantages
    : product.advantages;
  const uses = isEn ? product.usesEn || product.uses : product.uses;

  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Breadcrumbs */}
      <nav
        aria-label={isEn ? 'Breadcrumb' : 'مسار التنقل'}
        className="text-xs text-[var(--muted-foreground)] flex flex-wrap items-center gap-1.5 no-print"
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
          href="/products"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/products');
          }}
          className="hover:text-[var(--heading)]"
        >
          {isEn ? 'Products' : 'المنتجات'}
        </a>
        <span>/</span>
        <a
          href={`/products?category=${product.categorySlug}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/products?category=${product.categorySlug}`);
          }}
          className="hover:text-[var(--heading)]"
        >
          {isEn ? product.categoryNameEn : product.categoryNameAr}
        </a>
        <span>/</span>
        <span className="text-[var(--medical)] font-semibold">
          {isEn ? product.nameEn : product.nameAr}
        </span>
      </nav>

      {/* Main Split: Gallery (7 cols) + Sticky Inquiry Module (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Product Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[32px] p-4">
            <div className="relative bg-white rounded-[24px] p-6 sm:p-10 aspect-[1.1/1] flex items-center justify-center">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                aria-label={isEn ? 'Zoom Image' : 'تكبير الصورة'}
                className="absolute top-4 left-4 w-10 h-10 rounded-full border border-[var(--border)] bg-white hover:bg-slate-100 text-[#0B3D54] flex items-center justify-center transition-colors cursor-pointer no-print shadow-2xs"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <SmartImage
                src={product.images[activeImgIdx] || product.images[0]}
                alt={isEn ? product.nameEn : product.nameAr}
                priority
                className="w-full h-full max-h-[420px] object-contain"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImgIdx(
                        (prev) => (prev + 1) % product.images.length
                      )
                    }
                    aria-label={isEn ? 'Next image' : 'الصورة التالية'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--border)] bg-white/95 hover:bg-white shadow-xs flex items-center justify-center text-[#0B3D54] cursor-pointer no-print"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImgIdx(
                        (prev) =>
                          (prev - 1 + product.images.length) %
                          product.images.length
                      )
                    }
                    aria-label={isEn ? 'Previous image' : 'الصورة السابقة'}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--border)] bg-white/95 hover:bg-white shadow-xs flex items-center justify-center text-[#0B3D54] cursor-pointer no-print"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-print">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIdx(idx)}
                  aria-label={`${isEn ? 'View image' : 'عرض صورة'} ${idx + 1}`}
                  className={`w-20 h-20 rounded-2xl bg-white p-2 border transition-all cursor-pointer shrink-0 ${
                    activeImgIdx === idx
                      ? 'border-[var(--medical)] ring-2 ring-[var(--medical)]/25'
                      : 'border-[var(--border)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <SmartImage
                    src={imgUrl}
                    alt={`${isEn ? product.nameEn : product.nameAr} ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Inquiry Card (5 cols) */}
        <div className="lg:col-span-5 text-start space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block bg-[var(--surface)] text-[var(--medical)] text-xs font-semibold px-3.5 py-1.5 rounded-full">
                {isEn ? product.categoryNameEn : product.categoryNameAr}
              </span>
              <span className="font-en text-xs font-bold text-[var(--muted-foreground)] bg-[var(--card)] border border-[var(--border)] px-3 py-1 rounded-full">
                {product.code}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] pt-1">
              {isEn ? product.nameEn : product.nameAr}
            </h1>
            <p className="font-en text-sm text-[var(--muted-foreground)]">
              {isEn ? product.nameAr : product.nameEn}
            </p>
          </div>

          <p className="text-base text-[var(--foreground)] leading-relaxed">
            {isEn ? product.shortDescEn : product.shortDescAr}
          </p>

          {/* Action Box */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[26px] p-5 space-y-3 shadow-2xs no-print">
            <a
              href={buildProductWhatsAppUrl(product, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>
                {isEn ? 'Inquire via WhatsApp' : 'استفسر عبر واتساب'}
              </span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${COMPANY_INFO.phone1Raw}`}
                className="py-3 px-4 rounded-full border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--medical)]" />
                <span>{isEn ? 'Call Now' : 'اتصل الآن'}</span>
              </a>

              <button
                type="button"
                onClick={() => onToggleInquiry(product.slug)}
                className={`py-3 px-4 rounded-full border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isInInquiry
                    ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--heading)]'
                }`}
              >
                {isInInquiry ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>
                      {isEn ? 'Added to Inquiry' : 'مضاف للاستفسارات'}
                    </span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>
                      {isEn ? 'Add to Inquiry' : 'أضف للاستفسارات'}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Link to Branched Catalog Datasheet (/catalog/[slug]) */}
            <a
              href={`/catalog/${product.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/catalog/${product.slug}`);
              }}
              className="w-full py-3 px-4 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--heading)] border border-[var(--border)] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-[var(--medical)]" />
              <span>
                {isEn
                  ? 'Open Branched Catalog Datasheet (/catalog)'
                  : 'فتح النشرة الفنية بالكتالوج (/catalog)'}
              </span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-around text-xs text-[var(--muted-foreground)]">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 hover:text-[var(--heading)] py-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Share' : 'مشاركة'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 hover:text-[var(--heading)] py-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copied
                    ? isEn
                      ? 'Copied!'
                      : 'تم النسخ!'
                    : isEn
                    ? 'Copy Link'
                    : 'نسخ الرابط'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 hover:text-[var(--heading)] py-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isEn ? 'Print Sheet' : 'نشرة المنتج'}</span>
              </button>
            </div>
          </div>

          {/* Detailed Specifications Sections */}
          <div className="space-y-8 pt-4">
            {/* About Product */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-[24px] p-6 space-y-2.5">
              <h2 className="text-lg font-bold text-[var(--heading)]">
                {isEn ? 'About This Product' : 'عن المنتج'}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {isEn ? product.aboutEn || product.aboutAr : product.aboutAr}
              </p>
            </div>

            {/* Advantages & Uses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-[24px] p-6 space-y-3">
                <h2 className="text-base font-bold text-[var(--heading)]">
                  {isEn ? 'Key Advantages' : 'المزايا'}
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                  {advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--medical)] mt-2 shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-[24px] p-6 space-y-3">
                <h2 className="text-base font-bold text-[var(--heading)]">
                  {isEn ? 'Clinical Applications' : 'الاستخدامات'}
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                  {uses.map((u, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] mt-2 shrink-0" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-[24px] p-6 space-y-4">
              <h2 className="text-lg font-bold text-[var(--heading)]">
                {isEn ? 'Technical Specifications' : 'المواصفات الفنية'}
              </h2>
              <div className="divide-y divide-[var(--border)]">
                {product.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm"
                  >
                    <span className="font-semibold text-[var(--heading)] shrink-0">
                      {isEn ? spec.labelEn || spec.label : spec.label}
                    </span>
                    <span className="text-[var(--muted-foreground)] sm:text-end">
                      {isEn ? spec.valueEn || spec.value : spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-[24px] p-6 space-y-2">
              <h2 className="text-lg font-bold text-[var(--heading)]">
                {isEn ? 'Packaging & Supply' : 'التعبئة والتغليف'}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {isEn
                  ? product.packagingEn || product.packaging
                  : product.packaging}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Medical Articles for this Product */}
      {linkedArticles.length > 0 && (
        <section className="pt-8 border-t border-[var(--border)] no-print space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-start space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--medical)]">
                <BookOpen className="w-4 h-4" />
                <span>
                  {isEn
                    ? 'LINKED MEDICAL ARTICLES'
                    : 'مقالات طبية مرتبطة بالمنتج'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)]">
                {isEn
                  ? `Clinical Guides & Studies Related to ${product.nameEn}`
                  : `مقالات وأدلة إرشادية تخص ${product.nameAr}`}
              </h2>
            </div>

            <a
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/articles');
              }}
              className="text-xs sm:text-sm font-semibold text-[var(--medical)] inline-flex items-center gap-1 hover:underline"
            >
              <span>{isEn ? 'All Articles' : 'كل المقالات'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {linkedArticles.slice(0, 3).map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onNavigate={onNavigate}
                lang={lang}
              />
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="pt-8 border-t border-[var(--border)] no-print">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading)]">
            {isEn ? 'Related Medical Products' : 'منتجات ذات صلة'}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onNavigate={onNavigate}
              isInInquiry={inquirySlugs.includes(rel.slug)}
              onToggleInquiry={onToggleInquiry}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={
            isEn
              ? `Zoom image of ${product.nameEn}`
              : `تكبير صورة ${product.nameAr}`
          }
        >
          <div
            className="relative bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label={isEn ? 'Close' : 'إغلاق'}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <SmartImage
              src={product.images[activeImgIdx] || product.images[0]}
              alt={isEn ? product.nameEn : product.nameAr}
              className="max-h-[75vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

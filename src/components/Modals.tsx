import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Trash2,
  ArrowUpLeft,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { PRODUCTS, ARTICLES, Product, Language } from '../data/surgymedData';
import {
  filterAndSortProducts,
  filterArticles,
  buildGeneralWhatsAppUrl,
} from '../utils/catalogLogic';
import { SmartImage } from './SmartImage';
import { WhatsAppIcon, InquiryCartIcon } from './Icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  lang?: Language;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  lang = 'ar',
}) => {
  const [query, setQuery] = useState('');
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const productResults = filterAndSortProducts(PRODUCTS, { searchQuery: query });
  const articleResults = query.trim()
    ? filterArticles(ARTICLES, { searchQuery: query })
    : [];

  const handleGoToFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onNavigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Search Products & Articles' : 'البحث في المنتجات والمقالات'}
    >
      <div
        className="bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleGoToFullSearch}
          className="p-4 border-b border-[var(--border)] flex items-center gap-3"
        >
          <Search className="w-5 h-5 text-[var(--muted-foreground)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isEn
                ? 'Search by product name, code, specification, or article...'
                : 'ابحث بالاسم أو الكود أو المواصفات أو المقالات...'
            }
            aria-label={isEn ? 'Search query' : 'ابحث بالاسم أو الكود أو التصنيف'}
            className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold whitespace-nowrap cursor-pointer"
          >
            {isEn ? 'Full Search' : 'صفحة البحث'}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close search' : 'إغلاق البحث'}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--surface)] text-[var(--muted-foreground)] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        <div className="max-h-[55vh] overflow-y-auto p-3 divide-y divide-[var(--border)]">
          {productResults.length === 0 && articleResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--muted-foreground)]">
              {isEn
                ? `No matching results for "${query}"`
                : `لا توجد نتائج مطابقة لبحثك "${query}"`}
            </div>
          ) : (
            <>
              {productResults.map((product) => (
                <div
                  key={product.id}
                  className="w-full flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-[var(--surface)] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate(`/products/${product.slug}`);
                    }}
                    className="flex-1 flex items-center gap-4 text-start cursor-pointer min-w-0"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] p-1.5 shrink-0 flex items-center justify-center">
                      <SmartImage
                        src={product.images[0]}
                        alt={isEn ? product.nameEn : product.nameAr}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--medical)] font-medium">
                        {isEn ? product.categoryNameEn : product.categoryNameAr} ·{' '}
                        <span className="font-en">{product.code}</span>
                      </p>
                      <p className="text-sm font-bold text-[var(--heading)] truncate">
                        {isEn ? product.nameEn : product.nameAr}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] truncate">
                        {isEn ? product.shortDescEn : product.shortDescAr}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate(`/catalog/${product.slug}`);
                      }}
                      title={isEn ? 'Open Technical Datasheet' : 'النشرة الفنية بالكتالوج'}
                      className="px-2.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface-hover)] text-[11px] font-semibold text-[var(--medical)] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{isEn ? 'Datasheet' : 'النشرة الفنية'}</span>
                    </button>
                  </div>
                </div>
              ))}

              {articleResults.map((article) => (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate(`/articles/${article.slug}`);
                  }}
                  className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-[var(--surface)] transition-colors text-start cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] p-1.5 shrink-0 flex items-center justify-center">
                    <SmartImage
                      src={article.image}
                      alt={isEn ? article.titleEn : article.titleAr}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--medical)] font-medium">
                      {isEn
                        ? `Medical Article · ${article.categoryEn}`
                        : `مقال طبي · ${article.categoryAr}`}
                    </p>
                    <p className="text-sm font-bold text-[var(--heading)] truncate">
                      {isEn ? article.titleEn : article.titleAr}
                    </p>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" />
                </button>
              ))}
            </>
          )}
        </div>

        <div className="p-3 bg-[var(--surface)]/60 border-t border-[var(--border)] flex items-center justify-between text-xs">
          <span className="text-[var(--muted-foreground)]">
            {isEn
              ? 'Want advanced filtering across products, datasheets, and articles?'
              : 'تبحث عن تصفية شاملة للمنتجات والنشرات الفنية والمقالات؟'}
          </span>
          <button
            type="button"
            onClick={handleGoToFullSearch}
            className="font-bold text-[var(--medical)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{isEn ? 'Open Advanced Search Page' : 'افتح صفحة البحث المتقدم'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquirySlugs: string[];
  onRemoveSlug: (slug: string) => void;
  onClearAll: () => void;
  onNavigate: (path: string) => void;
  lang?: Language;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  inquirySlugs,
  onRemoveSlug,
  onClearAll,
  onNavigate,
  lang = 'ar',
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

  const selectedProducts: Product[] = inquirySlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  const whatsappListMessage =
    selectedProducts.length > 0
      ? isEn
        ? `Hello Surgy Med, I would like to request a quote for the following products:\n${selectedProducts
            .map((p, idx) => `${idx + 1}. ${p.nameEn} (${p.code})`)
            .join('\n')}`
        : `مرحبًا، أود الاستفسار وطلب عرض سعر للمنتجات التالية من سيرجي ميد:\n${selectedProducts
            .map((p, idx) => `${idx + 1}. ${p.nameAr} (${p.nameEn})`)
            .join('\n')}`
      : undefined;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Inquiry List' : 'قائمة الاستفسارات'}
    >
      <div
        className="bg-[var(--card)] border-x border-[var(--border)] w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <InquiryCartIcon className="w-5 h-5 text-[var(--medical)]" />
            <h2 className="text-base font-bold text-[var(--heading)]">
              {isEn
                ? `Inquiry List (${selectedProducts.length})`
                : `قائمة الاستفسارات (${selectedProducts.length})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close inquiry list' : 'إغلاق قائمة الاستفسارات'}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--surface)] text-[var(--muted-foreground)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {selectedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--muted-foreground)]">
                <InquiryCartIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[var(--heading)]">
                  {isEn ? 'Your Inquiry List is Empty' : 'قائمة الاستفسارات فارغة'}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] max-w-xs leading-relaxed">
                  {isEn
                    ? 'Add medical products to your list to submit a combined B2B quotation request or WhatsApp inquiry.'
                    : 'أضف المنتجات التي تهمك إلى القائمة لإرسال طلب عرض سعر مجمّع أو الاستفسار عنها عبر واتساب.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('/products');
                }}
                className="px-5 py-2.5 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isEn ? 'Browse Products' : 'تصفح المنتجات'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-[var(--border)] bg-[var(--background)]"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] p-1.5 shrink-0">
                    <SmartImage
                      src={product.images[0]}
                      alt={isEn ? product.nameEn : product.nameAr}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <p className="text-[11px] text-[var(--medical)] font-medium">
                      {isEn ? product.categoryNameEn : product.categoryNameAr}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate(`/products/${product.slug}`);
                      }}
                      className="text-sm font-bold text-[var(--heading)] hover:underline truncate block cursor-pointer"
                    >
                      {isEn ? product.nameEn : product.nameAr}
                    </button>
                    <p className="font-en text-xs text-[var(--muted-foreground)] truncate">
                      {product.code}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveSlug(product.slug)}
                    aria-label={
                      isEn
                        ? `Remove ${product.nameEn}`
                        : `حذف ${product.nameAr} من قائمة الاستفسارات`
                    }
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--brand-red)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedProducts.length > 0 && (
          <div className="p-5 border-t border-[var(--border)] space-y-2.5 bg-[var(--surface)]/50">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate('/quote');
              }}
              className="w-full py-3 px-5 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>
                {isEn
                  ? 'Request Quote for Selected Products'
                  : 'اطلب عرض سعر للمنتجات المختارة'}
              </span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <a
                href={buildGeneralWhatsAppUrl(whatsappListMessage, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-full bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{isEn ? 'Send via WhatsApp' : 'إرسال عبر واتساب'}</span>
              </a>
              <button
                type="button"
                onClick={onClearAll}
                className="py-2.5 px-4 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface)] text-xs font-medium text-[var(--muted-foreground)] transition-colors cursor-pointer"
              >
                {isEn ? 'Clear All' : 'إفراغ القائمة'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

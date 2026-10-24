import React from 'react';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Phone,
  Plus,
  Check,
  FileText,
} from 'lucide-react';
import { Product, COMPANY_INFO, Language } from '../data/surgymedData';
import { buildProductWhatsAppUrl } from '../utils/catalogLogic';
import { SmartImage } from './SmartImage';
import { WhatsAppIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  isInInquiry: boolean;
  onToggleInquiry: (slug: string) => void;
  lang?: Language;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onNavigate, isInInquiry, onToggleInquiry, lang = 'ar' }) => {
    const isEn = lang === 'en';
    const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

    const handleDetailClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate(`/products/${product.slug}`);
    };

    const handleDatasheetClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onNavigate(`/catalog/${product.slug}`);
    };

    const primarySpec = product.specs[0];
    const secondarySpec = product.specs[1];

    return (
      <article className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[var(--medical)]/50">
        {/* Studio Pedestal Product Frame (68% height emphasis) */}
        <div className="relative bg-white border-b border-[var(--border)]/70 p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
          <a
            href={`/products/${product.slug}`}
            onClick={handleDetailClick}
            className="w-full h-full flex items-center justify-center"
          >
            <SmartImage
              src={product.images[0]}
              alt={isEn ? product.nameEn : product.nameAr}
              className="w-full h-full max-h-48 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Unboxed Reference & Size Kicker Top Bar */}
          <div className="absolute top-3.5 inset-x-4 flex items-center justify-between pointer-events-none text-[11px] font-medium text-slate-500">
            <span className="font-mono-num font-semibold text-[#0B3D54]">
              {product.code}
            </span>
            {product.sizesBadge && (
              <span className="text-slate-600 font-medium truncate max-w-[160px]">
                {isEn
                  ? product.sizesBadgeEn || product.sizesBadge
                  : product.sizesBadge}
              </span>
            )}
          </div>

          {/* Quick Technical Datasheet Action Button */}
          <button
            type="button"
            onClick={handleDatasheetClick}
            title={
              isEn
                ? 'Open Technical Datasheet (/catalog)'
                : 'فتح النشرة الفنية بالكتالوج'
            }
            aria-label={
              isEn
                ? 'Open Technical Datasheet'
                : 'فتح النشرة الفنية بالكتالوج'
            }
            className="absolute bottom-3 left-3 z-10 h-8 px-2.5 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3 h-3 text-sky-300" />
            <span>{isEn ? 'Datasheet' : 'نشرة فنية'}</span>
          </button>
        </div>

        {/* Architectural Card Body */}
        <div className="p-5 flex flex-col flex-1 text-start">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-1.5">
            <span className="font-medium text-[var(--medical)] truncate">
              {isEn ? product.categoryNameEn : product.categoryNameAr}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-en text-[11px] truncate">
              {isEn ? product.nameAr : product.nameEn}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-[17px] font-bold text-[var(--heading)] leading-snug mb-2">
            <a
              href={`/products/${product.slug}`}
              onClick={handleDetailClick}
              className="hover:text-[var(--medical)] transition-colors"
            >
              {isEn ? product.nameEn : product.nameAr}
            </a>
          </h3>

          <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed line-clamp-2 mb-4">
            {isEn ? product.shortDescEn : product.shortDescAr}
          </p>

          {/* Compact Technical Spec Readout Table */}
          {primarySpec && (
            <div className="mt-auto mb-4 pt-3 border-t border-[var(--border)]/70 space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[var(--muted-foreground)] shrink-0">
                  {isEn
                    ? primarySpec.labelEn || primarySpec.label
                    : primarySpec.label}
                </span>
                <span className="font-medium text-[var(--heading)] truncate text-end tabular-nums">
                  {isEn
                    ? primarySpec.valueEn || primarySpec.value
                    : primarySpec.value}
                </span>
              </div>
              {secondarySpec && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[var(--muted-foreground)] shrink-0">
                    {isEn
                      ? secondarySpec.labelEn || secondarySpec.label
                      : secondarySpec.label}
                  </span>
                  <span className="font-medium text-[var(--heading)] truncate text-end tabular-nums">
                    {isEn
                      ? secondarySpec.valueEn || secondarySpec.value
                      : secondarySpec.value}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
            <a
              href={`/products/${product.slug}`}
              onClick={handleDetailClick}
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{isEn ? 'View Product' : 'عرض التفاصيل'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onToggleInquiry(product.slug)}
                aria-label={
                  isInInquiry
                    ? isEn
                      ? `Remove ${product.nameEn} from Inquiry List`
                      : `إزالة ${product.nameAr} من قائمة الاستفسارات`
                    : isEn
                    ? 'Add to Inquiry List'
                    : 'أضف إلى قائمة الاستفسارات'
                }
                title={
                  isInInquiry
                    ? isEn
                      ? 'Added to Quote List'
                      : 'مضاف لطلب التسعير'
                    : isEn
                    ? 'Add to Quote List'
                    : 'أضف لطلب التسعير'
                }
                className={`h-8 px-2.5 rounded-lg border text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isInInquiry
                    ? 'bg-[var(--surface)] border-[var(--medical)] text-[var(--heading)]'
                    : 'border-[var(--border)] hover:bg-[var(--surface)] text-[var(--foreground)]'
                }`}
              >
                {isInInquiry ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--medical)]" />
                    <span>{isEn ? 'Saved' : 'مضاف'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Quote' : 'تسعير'}</span>
                  </>
                )}
              </button>

              <a
                href={buildProductWhatsAppUrl(product, lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  isEn
                    ? `Inquire via WhatsApp about ${product.nameEn}`
                    : `استفسر عبر واتساب عن ${product.nameAr}`
                }
                title={isEn ? 'Inquire on WhatsApp' : 'استفسر عبر واتساب'}
                className="w-8 h-8 rounded-lg bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white flex items-center justify-center transition-colors shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone1Raw}`}
                aria-label={isEn ? 'Call Now' : 'اتصل الآن'}
                title={isEn ? 'Call Now' : 'اتصل الآن'}
                className="w-8 h-8 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--navy)] flex items-center justify-center transition-colors shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }
);

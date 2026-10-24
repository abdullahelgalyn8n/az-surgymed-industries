import React from 'react';
import { Phone, MapPin, Printer } from 'lucide-react';
import { CATEGORIES, COMPANY_INFO, Language } from '../data/surgymedData';
import { buildGeneralWhatsAppUrl } from '../utils/catalogLogic';
import { SmartImage } from './SmartImage';
import { WhatsAppIcon } from './Icons';

interface FooterProps {
  onNavigate: (path: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const isEn = lang === 'en';

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <footer
        role="contentinfo"
        className="bg-[var(--card)] border-t border-[var(--border)] text-[var(--foreground)] pt-16 pb-10 no-print"
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border)]">
            {/* Column 1: Brand Info (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--border)] bg-white p-0.5 shrink-0">
                  <SmartImage
                    src={COMPANY_INFO.logoUrl}
                    alt={isEn ? 'Surgy Med Logo' : 'شعار سيرجي ميد'}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-[var(--heading)]">
                    {isEn ? COMPANY_INFO.fullNameEn : COMPANY_INFO.nameAr}
                  </p>
                  <p className="font-en text-[11px] tracking-[0.12em] text-[var(--muted-foreground)] uppercase mt-0.5">
                    SURGY MED FOR MEDICAL INDUSTRIES
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm">
                {isEn ? COMPANY_INFO.footerSummaryEn : COMPANY_INFO.footerSummaryAr}
              </p>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <p className="text-sm font-bold text-[var(--heading)]">
                {isEn ? 'Quick Links' : 'روابط سريعة'}
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--muted-foreground)]">
                <li>
                  <a
                    href="/about"
                    onClick={(e) => handleNav(e, '/about')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'About Us' : 'من نحن'}
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    onClick={(e) => handleNav(e, '/products')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Our Products' : 'منتجاتنا'}
                  </a>
                </li>
                <li>
                  <a
                    href="/catalog"
                    onClick={(e) => handleNav(e, '/catalog')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Technical Catalog' : 'الكتالوج الفني'}
                  </a>
                </li>
                <li>
                  <a
                    href="/sectors"
                    onClick={(e) => handleNav(e, '/sectors')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Sectors We Serve' : 'القطاعات'}
                  </a>
                </li>
                <li>
                  <a
                    href="/articles"
                    onClick={(e) => handleNav(e, '/articles')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Medical Articles' : 'المقالات الطبية'}
                  </a>
                </li>
                <li>
                  <a
                    href="/search"
                    onClick={(e) => handleNav(e, '/search')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Advanced Search' : 'البحث الشامل'}
                  </a>
                </li>
                <li>
                  <a
                    href="/quote"
                    onClick={(e) => handleNav(e, '/quote')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Request a Quote' : 'اطلب عرض سعر'}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    onClick={(e) => handleNav(e, '/terms')}
                    className="hover:text-[var(--heading)] transition-colors"
                  >
                    {isEn ? 'Terms & Conditions' : 'الشروط والأحكام'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Categories (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <p className="text-sm font-bold text-[var(--heading)]">
                {isEn ? 'Product Categories' : 'التصنيفات'}
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--muted-foreground)]">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`/products?category=${cat.slug}`}
                      onClick={(e) => handleNav(e, `/products?category=${cat.slug}`)}
                      className="hover:text-[var(--heading)] transition-colors"
                    >
                      {isEn ? cat.nameEn : cat.nameAr}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <p className="text-sm font-bold text-[var(--heading)]">
                {isEn ? 'Contact Factory' : 'تواصل معنا'}
              </p>
              <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                <li>
                  <a
                    href={`tel:${COMPANY_INFO.phone1Raw}`}
                    className="inline-flex items-center gap-2 hover:text-[var(--heading)] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--medical)] shrink-0" />
                    <span dir="ltr" className="font-en tabular-nums">
                      {COMPANY_INFO.phone1}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY_INFO.phone2Raw}`}
                    className="inline-flex items-center gap-2 hover:text-[var(--heading)] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--medical)] shrink-0" />
                    <span dir="ltr" className="font-en tabular-nums">
                      {COMPANY_INFO.phone2}
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-[var(--medical)] shrink-0" />
                  <span>{isEn ? 'Fax:' : 'فاكس:'}</span>
                  <span dir="ltr" className="font-en tabular-nums">
                    {COMPANY_INFO.fax}
                  </span>
                </li>
                <li>
                  <a
                    href={buildGeneralWhatsAppUrl(undefined, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--whatsapp)] font-semibold hover:underline"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>{isEn ? 'WhatsApp Direct' : 'واتساب'}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 pt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[var(--medical)] shrink-0 mt-1" />
                  <span>{isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.addressAr}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
            <p>
              <a
                href="https://azagency.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[var(--heading)] transition-colors"
              >
                {isEn
                  ? 'All rights reserved. A.Z Agency 2026 ©'
                  : 'جميع الحقوق محفوظة. A.Z Agency 2026 ©'}
              </a>
            </p>
            <div className="flex items-center gap-5">
              <a
                href="/terms"
                onClick={(e) => handleNav(e, '/terms')}
                className="hover:text-[var(--heading)] font-medium transition-colors"
              >
                {isEn ? 'Terms & Conditions' : 'الشروط والأحكام'}
              </a>
              <a
                href="/privacy"
                onClick={(e) => handleNav(e, '/privacy')}
                className="hover:text-[var(--heading)] transition-colors"
              >
                {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom-Left WhatsApp Button */}
      <a
        href={buildGeneralWhatsAppUrl(undefined, lang)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isEn ? 'Chat with us on WhatsApp' : 'تواصل معنا عبر واتساب'}
        className="fixed bottom-5 left-5 z-40 h-14 rounded-full bg-[var(--card)] p-2 shadow-xl border border-[var(--border)] inline-flex items-center gap-0 hover:gap-2.5 hover:px-3 group transition-all duration-300 no-print"
      >
        <span className="w-10 h-10 rounded-full bg-[var(--whatsapp)] group-hover:bg-[var(--whatsapp-hover)] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors">
          <WhatsAppIcon className="w-5 h-5" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold text-[var(--heading)] group-hover:max-w-[140px] transition-all duration-300">
          {isEn ? 'WhatsApp Us' : 'تواصل عبر واتساب'}
        </span>
      </a>
    </>
  );
};

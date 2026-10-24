import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Search,
  Phone,
  ArrowUpLeft,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { CATEGORIES, COMPANY_INFO, Language } from '../data/surgymedData';
import { SmartImage } from './SmartImage';
import { InquiryCartIcon } from './Icons';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenSearch: () => void;
  onOpenInquiryDrawer: () => void;
  inquiryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  lang,
  onToggleLang,
  onOpenSearch,
  onOpenInquiryDrawer,
  inquiryCount,
}) => {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;
  const basePath = currentPath.split('?')[0];

  const isActive = (path: string) => {
    if (path === '/') return basePath === '/';
    return basePath === path || basePath.startsWith(path + '/');
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const navItems = [
    { label: isEn ? 'Home' : 'الرئيسية', path: '/' },
    { label: isEn ? 'About' : 'من نحن', path: '/about' },
    { label: isEn ? 'Products' : 'منتجاتنا', path: '/products', hasDropdown: true },
    { label: isEn ? 'Sectors' : 'القطاعات', path: '/sectors' },
    { label: isEn ? 'Articles' : 'المقالات', path: '/articles' },
    { label: isEn ? 'Catalog' : 'الكتالوج', path: '/catalog' },
    { label: isEn ? 'Search' : 'البحث', path: '/search' },
    { label: isEn ? 'Contact' : 'تواصل معنا', path: '/contact' },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:bg-[var(--primary)] focus:text-[var(--primary-foreground)] focus:px-4 focus:py-2 focus:rounded-lg text-sm font-medium"
      >
        {isEn ? 'Skip to content' : 'تخطَّ إلى المحتوى'}
      </a>

      <header className="sticky top-0 z-40 w-full bg-[var(--card)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors no-print">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Brand Emblem & Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            aria-label={isEn ? 'Surgy Med — Home' : 'سيرجي ميد — الصفحة الرئيسية'}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
              <SmartImage
                src={COMPANY_INFO.logoUrl}
                alt={isEn ? 'Surgy Med Logo' : 'شعار سيرجي ميد للصناعات الطبية'}
                priority
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col text-start" dir="ltr">
              <span className="font-en text-[15px] font-bold tracking-[0.04em] text-[var(--heading)] leading-tight">
                {COMPANY_INFO.nameEn}
              </span>
              <span className="font-en text-[9.5px] font-medium tracking-[0.14em] text-[var(--muted-foreground)] uppercase mt-0.5">
                {COMPANY_INFO.subtitleEn}
              </span>
            </div>
          </a>

          {/* Primary Navigation */}
          <nav
            aria-label={isEn ? 'Main Navigation' : 'القائمة الرئيسية'}
            className="hidden xl:flex items-center"
          >
            <ul className="flex items-center gap-5 text-[14px] font-medium">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <li
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <a
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`relative py-2 inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                        isActive('/products')
                          ? 'text-[var(--heading)] font-semibold'
                          : 'text-[var(--foreground)]/80 hover:text-[var(--heading)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      {isActive('/products') && (
                        <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[var(--brand-red)] rounded-full" />
                      )}
                    </a>

                    {productsDropdownOpen && (
                      <div
                        className={`absolute top-full ${
                          isEn ? 'left-0' : 'right-0'
                        } pt-2 w-72 z-50`}
                      >
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-2">
                          <a
                            href="/products"
                            onClick={(e) => handleLinkClick(e, '/products')}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[var(--heading)] hover:bg-[var(--surface)] transition-colors"
                          >
                            <span>{isEn ? 'All Products' : 'كل المنتجات'}</span>
                            <span className="text-xs text-[var(--muted-foreground)] tabular-nums">
                              14
                            </span>
                          </a>
                          <div className="my-1 border-t border-[var(--border)]" />
                          {CATEGORIES.map((cat) => (
                            <a
                              key={cat.id}
                              href={`/products?category=${cat.slug}`}
                              onClick={(e) =>
                                handleLinkClick(e, `/products?category=${cat.slug}`)
                              }
                              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)] hover:text-[var(--heading)] transition-colors"
                            >
                              <span>{isEn ? cat.nameEn : cat.nameAr}</span>
                              <span className="text-[11px] text-[var(--muted-foreground)] tabular-nums">
                                {cat.count}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`relative py-2 transition-colors whitespace-nowrap ${
                        isActive(item.path)
                          ? 'text-[var(--heading)] font-semibold'
                          : 'text-[var(--foreground)]/80 hover:text-[var(--heading)]'
                      }`}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[var(--brand-red)] rounded-full" />
                      )}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Actions & Request Quote CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={isEn ? 'التحويل إلى العربية' : 'Switch to English'}
              title={isEn ? 'العربية' : 'English'}
              className="h-9 px-3 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 hover:bg-[var(--surface)] text-[var(--heading)] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--medical)]" />
              <span className="font-en">{isEn ? 'AR' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={
                darkMode
                  ? isEn
                    ? 'Switch to Light Mode'
                    : 'تفعيل الوضع الفاتح'
                  : isEn
                  ? 'Switch to Dark Mode'
                  : 'تفعيل الوضع الداكن'
              }
              title={
                darkMode
                  ? isEn
                    ? 'Light Mode'
                    : 'الوضع الفاتح'
                  : isEn
                  ? 'Dark Mode'
                  : 'الوضع الداكن'
              }
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--navy)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-[18px] h-[18px]" />
              ) : (
                <Moon className="w-[18px] h-[18px]" />
              )}
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label={isEn ? 'Search products & articles' : 'البحث في المنتجات'}
              title={isEn ? 'Quick Search' : 'البحث السريع'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--navy)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={onOpenInquiryDrawer}
              aria-label={
                isEn
                  ? `Inquiry List (${inquiryCount})`
                  : `قائمة الاستفسارات (${inquiryCount})`
              }
              title={
                isEn
                  ? `Inquiry List (${inquiryCount})`
                  : `قائمة الاستفسارات (${inquiryCount})`
              }
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                inquiryCount > 0
                  ? 'bg-[var(--surface)] text-[var(--heading)] ring-1 ring-[var(--medical)]/40'
                  : 'text-[var(--navy)] hover:bg-[var(--surface)]'
              }`}
            >
              <InquiryCartIcon className="w-[18px] h-[18px]" />
              {inquiryCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--brand-red)] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                  {inquiryCount}
                </span>
              )}
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone1Raw}`}
              aria-label={`${isEn ? 'Call' : 'اتصل'} ${COMPANY_INFO.phone1}`}
              className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-[var(--navy)] hover:bg-[var(--surface)] transition-colors"
            >
              <Phone className="w-[17px] h-[17px]" />
            </a>

            <a
              href="/quote"
              onClick={(e) => handleLinkClick(e, '/quote')}
              className="hidden sm:inline-flex bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <span>{isEn ? 'Request a Quote' : 'اطلب عرض سعر'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen
                  ? isEn
                    ? 'Close Menu'
                    : 'إغلاق القائمة'
                  : isEn
                  ? 'Open Menu'
                  : 'فتح القائمة'
              }
              className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center text-[var(--navy)] hover:bg-[var(--surface)] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-4 space-y-1.5">
            {[
              ...navItems,
              { label: isEn ? 'Terms & Conditions' : 'الشروط والأحكام', path: '/terms' },
              { label: isEn ? 'Request a Quote' : 'اطلب عرض سعر', path: '/quote' },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-[var(--surface)] text-[var(--heading)] font-semibold'
                    : 'text-[var(--foreground)] hover:bg-[var(--surface)]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

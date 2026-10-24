/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal, InquiryDrawer } from './components/Modals';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArticlesPage, ArticleDetailPage } from './pages/ArticlesPage';
import { CatalogPage, CatalogDetailPage } from './pages/CatalogPages';
import { SearchPage } from './pages/SearchPage';
import {
  AboutPage,
  SectorsPage,
  ContactPage,
  QuotePage,
  TermsPage,
  PrivacyPage,
} from './pages/SubPages';
import { PRODUCTS, Language } from './data/surgymedData';
import { toggleInquiryProduct } from './utils/catalogLogic';
import { InquiryCartIcon } from './components/Icons';

const INQUIRY_STORAGE_KEY = 'surgymed_inquiry_slugs_v1';
const THEME_STORAGE_KEY = 'surgymed_theme_v1';
const LANG_STORAGE_KEY = 'surgymed_lang_v1';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [inquiryDrawerOpen, setInquiryDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [inquirySlugs, setInquirySlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquirySlugs));
    } catch {}
  }, [inquirySlugs]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'en' ? 'ltr' : 'rtl';
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleInquiry = useCallback(
    (slug: string) => {
      const prod = PRODUCTS.find((p) => p.slug === slug);
      setInquirySlugs((prev) => {
        const exists = prev.includes(slug);
        const next = toggleInquiryProduct(prev, slug);
        if (prod) {
          const pName = lang === 'en' ? prod.nameEn : prod.nameAr;
          setToastMessage(
            exists
              ? lang === 'en'
                ? `Removed "${pName}" from Inquiry List`
                : `تمت إزالة "${pName}" من قائمة الاستفسارات`
              : lang === 'en'
              ? `Added "${pName}" to Inquiry List`
              : `تمت إضافة "${pName}" إلى قائمة الاستفسارات`
          );
        }
        return next;
      });
    },
    [lang]
  );

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const [pathname, searchString] = currentPath.split('?');
  const searchParams = new URLSearchParams(searchString || '');
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';

  const renderPage = () => {
    if (pathname === '/' || pathname === '') {
      return (
        <HomePage
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname === '/products') {
      return (
        <ProductsPage
          initialCategory={categoryParam}
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname.startsWith('/products/')) {
      const slug = pathname.replace('/products/', '').trim();
      return (
        <ProductDetailPage
          slug={slug}
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname === '/catalog') {
      return (
        <CatalogPage
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname.startsWith('/catalog/')) {
      const slug = pathname.replace('/catalog/', '').trim();
      return (
        <CatalogDetailPage
          slug={slug}
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname === '/search') {
      return (
        <SearchPage
          initialQuery={queryParam}
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname === '/articles') {
      return <ArticlesPage onNavigate={navigate} lang={lang} />;
    }
    if (pathname.startsWith('/articles/')) {
      const slug = pathname.replace('/articles/', '').trim();
      return (
        <ArticleDetailPage
          slug={slug}
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onToggleInquiry={handleToggleInquiry}
          lang={lang}
        />
      );
    }
    if (pathname === '/about') {
      return <AboutPage onNavigate={navigate} lang={lang} />;
    }
    if (pathname === '/sectors') {
      return <SectorsPage onNavigate={navigate} lang={lang} />;
    }
    if (pathname === '/contact') {
      return <ContactPage onNavigate={navigate} lang={lang} />;
    }
    if (pathname === '/quote') {
      return (
        <QuotePage
          onNavigate={navigate}
          inquirySlugs={inquirySlugs}
          onRemoveInquirySlug={(slug) =>
            setInquirySlugs((prev) => prev.filter((s) => s !== slug))
          }
          lang={lang}
        />
      );
    }
    if (pathname === '/terms') {
      return <TermsPage onNavigate={navigate} lang={lang} />;
    }
    if (pathname === '/privacy') {
      return <PrivacyPage onNavigate={navigate} lang={lang} />;
    }
    return (
      <HomePage
        onNavigate={navigate}
        inquirySlugs={inquirySlugs}
        onToggleInquiry={handleToggleInquiry}
        lang={lang}
      />
    );
  };

  return (
    <div
      dir={lang === 'en' ? 'ltr' : 'rtl'}
      className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors"
    >
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenInquiryDrawer={() => setInquiryDrawerOpen(true)}
        inquiryCount={inquirySlugs.length}
      />

      <main id="main" className="flex-1">
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} lang={lang} />

      {/* Toast Feedback for Inquiry Cart */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 no-print"
        >
          <InquiryCartIcon className="w-4 h-4 text-[var(--medical)] shrink-0" />
          <span className="text-xs font-semibold text-[var(--heading)]">
            {toastMessage}
          </span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setInquiryDrawerOpen(true);
            }}
            className="text-xs font-bold text-[var(--medical)] hover:underline cursor-pointer mx-1"
          >
            {lang === 'en'
              ? `View List (${inquirySlugs.length})`
              : `عرض القائمة (${inquirySlugs.length})`}
          </button>
        </div>
      )}

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
        lang={lang}
      />

      <InquiryDrawer
        isOpen={inquiryDrawerOpen}
        onClose={() => setInquiryDrawerOpen(false)}
        inquirySlugs={inquirySlugs}
        onRemoveSlug={(slug) =>
          setInquirySlugs((prev) => prev.filter((s) => s !== slug))
        }
        onClearAll={() => setInquirySlugs([])}
        onNavigate={navigate}
        lang={lang}
      />
    </div>
  );
}

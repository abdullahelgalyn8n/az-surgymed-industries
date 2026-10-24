import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, CATEGORIES, ARTICLES, COMPANY_INFO } from '../data/surgymedData';
import {
  filterAndSortProducts,
  filterArticles,
  getArticlesForProduct,
  searchSiteContent,
  toggleInquiryProduct,
  buildProductWhatsAppUrl,
  validateQuoteForm,
  validateContactForm,
} from './catalogLogic';

test('filterAndSortProducts returns all 14 products by default', () => {
  const result = filterAndSortProducts(PRODUCTS, {});
  assert.equal(result.length, 14);
  assert.equal(result[0].slug, 'dental-bibs');
});

test('all images across products, categories, articles, and logo use .webp format', () => {
  assert.ok(COMPANY_INFO.logoUrl.endsWith('.webp'), 'Logo must be .webp');
  for (const p of PRODUCTS) {
    for (const img of p.images) {
      assert.ok(img.endsWith('.webp'), `Product ${p.slug} image ${img} must be .webp`);
    }
  }
  for (const c of CATEGORIES) {
    if (c.image) {
      assert.ok(c.image.endsWith('.webp'), `Category ${c.slug} image ${c.image} must be .webp`);
    }
  }
  assert.equal(ARTICLES.length, 6, 'Must have exactly 6 articles');
  for (const a of ARTICLES) {
    assert.ok(a.image.endsWith('.webp'), `Article ${a.slug} image ${a.image} must be .webp`);
  }
});

test('getArticlesForProduct returns relevant articles for every product in the catalog', () => {
  for (const p of PRODUCTS) {
    const related = getArticlesForProduct(p);
    assert.ok(related.length >= 1, `Product ${p.slug} must have at least 1 linked article`);
  }
});

test('searchSiteContent searches across products, articles, categories, and sectors in AR and EN', () => {
  const sapResults = searchSiteContent('SAP');
  assert.ok(sapResults.products.some((p) => p.slug === 'underpads'));
  assert.ok(sapResults.articles.some((a) => a.slug === 'underpads-sap-technology'));

  const dentalResults = searchSiteContent('Dental');
  assert.ok(dentalResults.products.some((p) => p.slug === 'dental-bibs'));
  assert.ok(dentalResults.sectors.some((s) => s.slug === 'dental-centers'));
});

test('filterArticles returns all 6 articles by default and filters by category and searchQuery', () => {
  const all = filterArticles(ARTICLES, {});
  assert.equal(all.length, 6);

  const sheetsArticles = filterArticles(ARTICLES, { categorySlug: 'sheets-consumables' });
  assert.equal(sheetsArticles.length, 2);

  const sapSearch = filterArticles(ARTICLES, { searchQuery: 'SAP' });
  assert.equal(sapSearch.length, 1);
  assert.equal(sapSearch[0].slug, 'underpads-sap-technology');
});

test('filterAndSortProducts filters accurately by categorySlug', () => {
  const sheets = filterAndSortProducts(PRODUCTS, { categorySlug: 'sheets-consumables' });
  assert.equal(sheets.length, 3);
  const dressings = filterAndSortProducts(PRODUCTS, { categorySlug: 'dressings-tapes' });
  assert.equal(dressings.length, 2);
});

test('filterAndSortProducts filters by Arabic and English search queries', () => {
  const byAr = filterAndSortProducts(PRODUCTS, { searchQuery: 'مفرش الأسنان' });
  assert.equal(byAr.length, 1);
  assert.equal(byAr[0].slug, 'dental-bibs');

  const byEn = filterAndSortProducts(PRODUCTS, { searchQuery: 'Sharps' });
  assert.equal(byEn.length, 1);
  assert.equal(byEn[0].slug, 'sharps-box');
});

test('toggleInquiryProduct adds and removes product slugs cleanly', () => {
  const step1 = toggleInquiryProduct([], 'dental-bibs');
  assert.deepEqual(step1, ['dental-bibs']);
  const step2 = toggleInquiryProduct(step1, 'underpads');
  assert.deepEqual(step2, ['dental-bibs', 'underpads']);
  const step3 = toggleInquiryProduct(step2, 'dental-bibs');
  assert.deepEqual(step3, ['underpads']);
});

test('buildProductWhatsAppUrl encodes Arabic and English product inquiry messages properly', () => {
  const urlAr = buildProductWhatsAppUrl({ nameAr: 'مفرش الأسنان', nameEn: 'Dental Bibs', slug: 'dental-bibs' }, 'ar');
  assert.ok(urlAr.startsWith('https://wa.me/201014881712?text='));
  assert.ok(decodeURIComponent(urlAr).includes('مفرش الأسنان'));

  const urlEn = buildProductWhatsAppUrl({ nameAr: 'مفرش الأسنان', nameEn: 'Dental Bibs', slug: 'dental-bibs' }, 'en');
  assert.ok(decodeURIComponent(urlEn).includes('Dental Bibs'));
});

test('validateQuoteForm enforces required fields in AR and EN', () => {
  const invalidEn = validateQuoteForm(
    {
      name: '',
      company: '',
      phone: 'abc',
      governorate: '',
      requestedProducts: '',
    },
    'en'
  );
  assert.equal(invalidEn.valid, false);
  assert.ok(invalidEn.errors.name.includes('Please'));

  const valid = validateQuoteForm({
    name: 'د. أحمد محمود',
    company: 'مستشفى الشفاء',
    phone: '01014881712',
    email: 'info@hospital.eg',
    governorate: 'القاهرة',
    requestedProducts: 'مفرش الأسنان، مفرش كبار السن',
  });
  assert.equal(valid.valid, true);
});

test('validateContactForm validates contact fields properly', () => {
  const invalid = validateContactForm({ name: 'أ', phone: '12', message: 'هلا' });
  assert.equal(invalid.valid, false);

  const valid = validateContactForm({
    name: 'محمد علي',
    phone: '01009602729',
    message: 'نرغب في الاستفسار عن توريد مفارش العمليات بكميات.',
  });
  assert.equal(valid.valid, true);
});

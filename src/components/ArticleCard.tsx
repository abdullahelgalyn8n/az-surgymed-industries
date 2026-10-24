import React from 'react';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { Article, Language } from '../data/surgymedData';
import { SmartImage } from './SmartImage';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
  lang?: Language;
  index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = React.memo(
  ({ article, onNavigate, lang = 'ar', index }) => {
    const isEn = lang === 'en';
    const ArrowIcon = isEn ? ArrowUpRight : ArrowUpLeft;

    const handleOpen = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate(`/articles/${article.slug}`);
    };

    return (
      <article className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[var(--medical)]/50">
        {/* 4:3 Visual Header */}
        <a
          href={`/articles/${article.slug}`}
          onClick={handleOpen}
          className="relative bg-white border-b border-[var(--border)]/70 p-6 aspect-[16/10] flex items-center justify-center overflow-hidden"
        >
          {typeof index === 'number' && (
            <span className="absolute top-3.5 left-4 font-mono-num text-xs font-semibold text-slate-400">
              0{index + 1}
            </span>
          )}
          <SmartImage
            src={article.image}
            alt={isEn ? article.titleEn : article.titleAr}
            className="w-full h-full max-h-44 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Editorial Body */}
        <div className="p-6 flex flex-col flex-1 text-start">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-2.5">
            <span className="font-semibold text-[var(--medical)]">
              {isEn ? article.categoryEn : article.categoryAr}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {isEn ? article.publishedDateEn : article.publishedDateAr}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isEn ? article.readTimeEn : article.readTimeAr}</span>
          </div>

          <h3 className="text-[18px] font-bold text-[var(--heading)] leading-snug mb-2.5">
            <a
              href={`/articles/${article.slug}`}
              onClick={handleOpen}
              className="hover:text-[var(--medical)] transition-colors"
            >
              {isEn ? article.titleEn : article.titleAr}
            </a>
          </h3>

          <p className="text-[13.5px] text-[var(--muted-foreground)] leading-relaxed line-clamp-3 mb-5 flex-1">
            {isEn ? article.excerptEn : article.excerptAr}
          </p>

          {/* Footer Action */}
          <div className="pt-3.5 border-t border-[var(--border)]/70 flex items-center justify-between gap-3">
            <a
              href={`/articles/${article.slug}`}
              onClick={handleOpen}
              className="text-xs font-bold text-[var(--heading)] group-hover:text-[var(--medical)] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>
                {isEn ? 'Read Technical Study' : 'اقرأ الدراسة الفنية'}
              </span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>

            <span className="font-mono-num text-[11px] text-[var(--muted-foreground)] tabular-nums">
              {isEn
                ? `${article.relatedProductSlugs.length} Linked Products`
                : `${article.relatedProductSlugs.length} منتجات مرتبطة`}
            </span>
          </div>
        </div>
      </article>
    );
  }
);

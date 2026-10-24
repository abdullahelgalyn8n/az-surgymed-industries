import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = React.memo(
  ({ src, alt, className = '', fallbackLabel, priority = false, ...rest }) => {
    const [hasError, setHasError] = useState(false);

    const normalizedSrc = src ? src.replace(/\.jpe?g$/i, '.webp') : undefined;

    if (!normalizedSrc || hasError) {
      return (
        <div
          className={`flex flex-col items-center justify-center bg-[var(--surface)] text-[var(--navy)] p-4 text-center ${className}`}
          role="img"
          aria-label={alt || fallbackLabel || 'صورة منتج طبي'}
        >
          <Package className="w-10 h-10 opacity-40 mb-2" />
          <span className="text-xs font-medium opacity-75 line-clamp-2">
            {fallbackLabel || alt || 'SURGY MED'}
          </span>
        </div>
      );
    }

    return (
      <img
        src={normalizedSrc}
        alt={alt || 'صورة منتج سيرجي ميد'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
        {...rest}
      />
    );
  }
);

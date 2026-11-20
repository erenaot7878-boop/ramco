import { useState } from 'react';
import { ImageAsset } from '../config/site';

interface MediaSlotProps {
  asset: ImageAsset;
  priority?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
  aspectClass?: string;
}

export function MediaSlot({
  asset,
  priority = false,
  tone = 'light',
  className = '',
  aspectClass,
}: MediaSlotProps) {
  const [hasError, setHasError] = useState(false);
  const showPlaceholder = !asset.src || hasError;

  const computedAspect = aspectClass ?? '';
  const ratioStyle =
    !computedAspect && asset.width && asset.height
      ? { aspectRatio: `${asset.width} / ${asset.height}` }
      : undefined;

  if (showPlaceholder) {
    const isDark = tone === 'dark';
    return (
      <div
        className={`relative flex items-end overflow-hidden rounded-[24px] ${
          isDark
            ? 'bg-[#14341F]/80 text-[#F3F9F4]'
            : 'pastel-sage text-[#4A5D50] border border-[#FFFFFF]/80'
        } ${computedAspect} ${className}`}
        style={ratioStyle}
        role="img"
        aria-label={asset.alt}
      >
        <div className="p-5">
          <p className="text-xs font-medium">
            {asset.placeholderCaption ?? asset.alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] pastel-sage ${computedAspect} ${className}`}
      style={ratioStyle}
    >
      <picture>
        {asset.avifSrcSet ? (
          <source type="image/avif" srcSet={asset.avifSrcSet} sizes={asset.sizes} />
        ) : null}
        {asset.webpSrcSet ? (
          <source type="image/webp" srcSet={asset.webpSrcSet} sizes={asset.sizes} />
        ) : null}
        <img
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={asset.sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : undefined}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          style={{ objectPosition: asset.focalPoint ?? '50% 50%' }}
          className="h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}

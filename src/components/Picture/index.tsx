import React from 'react';

type PictureProps = {
  /** 原始图片（png / jpg / jpeg） */
  src: string;

  /** alt 文本（必须） */
  alt: string;

  /** 是否懒加载，默认 lazy */
  loading?: 'lazy' | 'eager';

  /** 防止布局抖动（推荐） */
  width?: number | string;
  height?: number | string;

  /** 响应式 */
  sizes?: string;

  /** className 透传 */
  className?: string;

  /** 是否禁用 AVIF */
  disableAvif?: boolean;

  /** 是否禁用 WebP */
  disableWebp?: boolean;
};

function replaceExt(src: string, ext: string) {
  return src.replace(/\.[^.]+$/, ext);
}

export default function Picture({
  src,
  alt,
  loading = 'lazy',
  width,
  height,
  sizes,
  className,
  disableAvif = false,
  disableWebp = false,
}: PictureProps) {
  const avif = replaceExt(src, '.avif');
  const webp = replaceExt(src, '.webp');

  return (
    <picture className={className}>
      {!disableAvif && (
        <source
          srcSet={avif}
          type="image/avif"
          sizes={sizes}
        />
      )}

      {!disableWebp && (
        <source
          srcSet={webp}
          type="image/webp"
          sizes={sizes}
        />
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        decoding="async"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </picture>
  );
}

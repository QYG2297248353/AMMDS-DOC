import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * =========================
 * 配置区
 * =========================
 */

const IMAGE_DIR = 'static/img';

// 可作为“源图”的格式（不包含 webp / avif）
const SOURCE_EXTS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.tiff',
  '.bmp',
];

// 是否强制重生成
const FORCE_WEBP = process.env.FORCE_WEBP === '1';
const FORCE_AVIF = process.env.FORCE_AVIF === '1';

// 生成参数
const WEBP_OPTIONS = {
  quality: 80,
  effort: 4,
};

const AVIF_OPTIONS = {
  quality: 45,
  effort: 4,
};

/**
 * =========================
 * 工具函数
 * =========================
 */

function ext(file: string) {
  return path.extname(file).toLowerCase();
}

function withoutExt(file: string) {
  return file.slice(0, -path.extname(file).length);
}

function isSourceImage(file: string) {
  return SOURCE_EXTS.includes(ext(file));
}

function webpPath(src: string) {
  return `${withoutExt(src)}.webp`;
}

function avifPath(src: string) {
  return `${withoutExt(src)}.avif`;
}

async function genWebp(src: string, dest: string) {
  await sharp(src).webp(WEBP_OPTIONS).toFile(dest);
}

async function genAvif(src: string, dest: string) {
  await sharp(src).avif(AVIF_OPTIONS).toFile(dest);
}

/**
 * =========================
 * 主逻辑
 * =========================
 */

async function main() {
  const patterns = SOURCE_EXTS.map(ext => `${IMAGE_DIR}/**/*${ext}`);

  const sourceFiles = await fg(patterns, { onlyFiles: true });
  const allImages = await fg(`${IMAGE_DIR}/**/*.{webp,avif}`, { onlyFiles: true });

  const sourceSet = new Set(sourceFiles.map(f => withoutExt(f)));

  let webpCount = 0;
  let avifCount = 0;
  let removed = 0;

  /**
   * 1️⃣ 生成 WebP / AVIF
   */
  for (const src of sourceFiles) {
    if (!isSourceImage(src)) continue;

    const webp = webpPath(src);
    const avif = avifPath(src);

    // WebP
    if (FORCE_WEBP || !fs.existsSync(webp)) {
      console.log(`🟢 webp  ${path.relative(process.cwd(), src)}`);
      await genWebp(src, webp);
      webpCount++;
    }

    // AVIF
    if (FORCE_AVIF || !fs.existsSync(avif)) {
      console.log(`🔵 avif  ${path.relative(process.cwd(), src)}`);
      await genAvif(src, avif);
      avifCount++;
    }
  }

  /**
   * 2️⃣ 删除孤儿产物
   */
  for (const file of allImages) {
    const base = withoutExt(file);

    if (!sourceSet.has(base)) {
      fs.unlinkSync(file);
      console.log(`🗑️  remove orphan ${path.relative(process.cwd(), file)}`);
      removed++;
    }
  }

  console.log('\n=========================');
  console.log(`✔ webp generated : ${webpCount}`);
  console.log(`✔ avif generated : ${avifCount}`);
  console.log(`✔ orphan removed : ${removed}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

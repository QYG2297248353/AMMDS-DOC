import fs from 'fs';
import path from 'path';

const VERSIONS_JSON = 'versions.json';
const VERSIONED_DOCS_DIR = 'versioned_docs';
const VERSIONED_SIDEBARS_DIR = 'versioned_sidebars';
const I18N_DIR = 'i18n';

const LOCALES = ['en', 'ja', 'ko'] as const;

function versionDir(version: string) {
  return `version-${version}`;
}

function versionSidebarFile(version: string) {
  return `version-${version}-sidebars.json`;
}

function getI18nDocDir(version: string) {
  return path.join(I18N_DIR, '{locale}', 'docusaurus-plugin-content-docs', versionDir(version));
}

function getI18nDocJson(version: string) {
  return path.join(I18N_DIR, '{locale}', 'docusaurus-plugin-content-docs', `version-${version}.json`);
}

function removeDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`  ✔ 删除目录: ${dir}`);
  } else {
    console.log(`  - 目录不存在,跳过: ${dir}`);
  }
}

function removeFile(file: string) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`  ✔ 删除文件: ${file}`);
  } else {
    console.log(`  - 文件不存在,跳过: ${file}`);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('错误: 请指定要删除的版本号');
    console.error('用法: npm run rm:version -- v1.6.52');
    process.exit(1);
  }

  const version = args[0];

  // 检查 versions.json 是否存在
  if (!fs.existsSync(VERSIONS_JSON)) {
    console.error(`错误: ${VERSIONS_JSON} 不存在`);
    process.exit(1);
  }

  // 读取并更新 versions.json
  const versions: string[] = JSON.parse(fs.readFileSync(VERSIONS_JSON, 'utf-8'));

  const index = versions.indexOf(version);
  if (index === -1) {
    console.error(`错误: 版本 ${version} 不在 ${VERSIONS_JSON} 中`);
    process.exit(1);
  }

  versions.splice(index, 1);
  fs.writeFileSync(VERSIONS_JSON, JSON.stringify(versions, null, 2) + '\n');
  console.log(`  ✔ 已从 ${VERSIONS_JSON} 移除 ${version}`);

  // 删除 versioned_docs
  const vdDir = path.join(VERSIONED_DOCS_DIR, versionDir(version));
  removeDir(vdDir);

  // 删除 versioned_sidebars
  const vsFile = path.join(VERSIONED_SIDEBARS_DIR, versionSidebarFile(version));
  removeFile(vsFile);

  // 删除 i18n 中各语言的相关文件
  for (const locale of LOCALES) {
    const i18nDocDir = getI18nDocDir(version).replace('{locale}', locale);
    removeDir(i18nDocDir);

    const i18nDocJson = getI18nDocJson(version).replace('{locale}', locale);
    removeFile(i18nDocJson);
  }

  console.log(`\n✔ 版本 ${version} 已完全删除`);
}

main();

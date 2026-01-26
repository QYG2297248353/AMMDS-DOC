<div align="center">

# AMMDS-DOC

[![Version](https://img.shields.io/badge/Version-1.6.47-blue.svg)](https://github.com/QYG2297248353/AMMDS-Doc)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0-yellow.svg)](https://nodejs.org/)

</div>

---

## 📋 目录

<div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [目录结构](#目录结构)
- [命令说明](#命令说明)
  - [开发相关](#开发相关)
  - [文档相关](#文档相关)
  - [图片处理](#图片处理)
  - [部署相关](#部署相关)
- [安装部署](#安装部署)
  - [环境要求](#环境要求)
  - [安装依赖](#安装依赖)
  - [本地开发](#本地开发)
  - [构建生产版本](#构建生产版本)
  - [部署到GitHub Pages](#部署到github-pages)
- [开发指南](#开发指南)
  - [添加新文档](#添加新文档)
  - [添加新博客](#添加新博客)
  - [添加新翻译](#添加新翻译)
  - [添加新版本](#添加新版本)
- [贡献指南](#贡献指南)
  - [代码规范](#代码规范)
- [许可证](#许可证)

</div>

---

## 📝 项目简介

AMMDS-DOC是使用Docusaurus构建的文档网站，用于AMMDS（个人视频数据管理平台）的文档中心。该网站提供AMMDS的使用教程、部署指南、插件开发和常见问题等内容，支持多语言和多版本文档管理。

---

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Docusaurus | 3.9.2 | 静态网站生成器 |
| React | 19.0.0 | UI框架 |
| TypeScript | 5.6.2 | 类型系统 |
| Mermaid | - | 图表支持 |
| 多语言 | - | 英文、简体中文 |
| 多版本 | - | 支持历史版本文档管理 |

---

## 📁 目录结构

```tree
AMMDS-DOC/
├── .github/              # GitHub CI/CD配置
│   └── workflows/
│       └── deploy.yml    # 自动部署工作流
├── blog/                 # 博客内容
│   ├── 2023/             # 博客文章按年份组织
│   ├── authors.yml       # 作者配置
│   └── tags.yml          # 标签配置
├── docs/                 # 文档内容（当前版本）
│   ├── deploy/           # 部署相关文档
│   ├── plugin/           # 插件相关文档
│   ├── tutorial/         # 教程相关文档
│   ├── usage/            # 使用相关文档
│   ├── intro.md          # 文档首页
│   └── qa.md             # 常见问题
├── i18n/                 # 国际化配置
│   └── zh-Hans/          # 简体中文翻译
├── scripts/              # 自定义脚本
│   └── gen-webp.ts       # 生成WebP图片脚本
├── src/                  # 源代码
│   ├── components/       # React组件
│   ├── css/              # 样式文件
│   └── pages/            # 自定义页面
├── static/               # 静态资源
│   └── img/              # 图片资源
├── versioned_docs/       # 历史版本文档
├── versioned_sidebars/   # 历史版本侧边栏配置
├── .eslintrc             # ESLint配置
├── .gitignore            # Git忽略配置
├── docusaurus.config.ts  # Docusaurus主配置
├── package.json          # 项目依赖和脚本
├── sidebars.ts           # 侧边栏配置
├── tsconfig.json         # TypeScript配置
└── versions.json         # 版本管理配置
```

---

## 🧰 命令说明

### 开发相关

| 命令 | 说明 |
|------|------|
| `npm run start` | 启动本地开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 本地预览构建结果 |
| `npm run typecheck` | TypeScript类型检查 |
| `npm run clear` | 清理构建缓存 |

### 文档相关

| 命令 | 说明 |
|------|------|
| `npm run write-translations` | 生成翻译文件 |
| `npm run write-heading-ids` | 生成文档标题ID |
| `npm run swizzle` | 自定义Docusaurus组件 |

### 图片处理

| 命令 | 说明 |
|------|------|
| `npm run gen:webp` | 生成WebP格式图片 |
| `npm run prebuild` | 构建前准备（包括生成WebP图片） |

### 部署相关

| 命令 | 说明 |
|------|------|
| `npm run deploy` | 部署到GitHub Pages |

---

## 🚀 安装部署

### 环境要求

- Node.js >= 20.0

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run start
```

### 构建生产版本

```bash
npm run build
```

### 部署到GitHub Pages

使用SSH:

```bash
USE_SSH=true npm run deploy
```

不使用SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

---

## 📚 开发指南

### 添加新文档

1. 在`docs/`目录下创建新的Markdown文件
2. 文档会自动添加到侧边栏（基于目录结构）
3. 可以使用`_category_.json`文件自定义目录配置

### 添加新博客

1. 在`blog/`目录下创建新的Markdown文件
2. 文件名格式：`YYYY/MM/DD/title.md`
3. 在文件头部添加Front Matter配置

### 添加新翻译

1. 运行`npm run write-translations`生成翻译文件
2. 在`i18n/[locale]/`目录下编辑翻译文件
3. 支持的语言：`en`（英文）、`zh-Hans`（简体中文）

### 添加新版本

1. 编辑`versions.json`文件，添加新版本号
2. 运行`npm run docusaurus docs:version [version]`创建新版本文档
3. 编辑`docusaurus.config.ts`中的版本配置

---

## 🤝 贡献指南

1. Fork本仓库
2. 创建新的分支
3. 提交代码
4. 创建Pull Request

### 代码规范

- 遵循ESLint配置
- 使用TypeScript类型检查
- 保持代码风格一致

---

## 📄 许可证

MIT License

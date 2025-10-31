# Vera Photography — Portfolio

Hero section (image to be added)

## Contents

- [Vera Photography — Portfolio](#vera-photography--portfolio)
  - [Contents](#contents)
  - [1. Project Overview](#1-project-overview)
    - [Specification](#specification)
    - [Figma design](#figma-design)
    - [Live demo](#live-demo)
  - [2. Tech stack](#2-tech-stack)
  - [3. Getting started](#3-getting-started)
  - [4. Features](#4-features)
  - [5. Architecture](#5-architecture)
  - [6. Performance and optimizations](#6-performance-and-optimizations)
  - [7. Accessibility](#7-accessibility)
  - [8. Project structure](#8-project-structure)
  - [9. Scripts](#9-scripts)
  - [10. Deployment](#10-deployment)
  - [11. License](#11-license)

## 1. Project Overview

'Vera Photography — Portfolio' is a fast, content‑driven single‑page site for Vera — an acclaimed French photographer working across Europe. The site highlights her work and services through an elegant hero, curated portfolio slider, pricing packages, FAQ, and a streamlined booking flow.

The project is built with TypeScript, SCSS, Nunjucks, Webpack and GitHub Actions, following the Atomic Design methodology (atoms → molecules → organisms → templates → pages). All copy, meta tags, and media configuration are centralized in `src/data/pages/index.json`, which is injected into Nunjucks templates at build time. The result is a maintainable, scalable, and SEO‑ready static site with high Lighthouse Perfomance Scoring (90+).

### Specification

- https://github.com/rolling-scopes-school/tasks/blob/master/stage1/tasks/portfolio/portfolio.md

### Figma design

- https://www.figma.com/design/iFsApEUsf6tPwXas56gOiT/Portfolio

### Live demo

- https://elrouss.github.io/portfolio/

[back to contents](#contents)

## 2. Tech stack

![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS Badge](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Nunjucks Badge](https://img.shields.io/badge/Nunjucks-1C4913?style=for-the-badge&logo=nunjucks&logoColor=white)
![Webpack Badge](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Github Actions Badge](https://img.shields.io/badge/Github%20Actions-282a2e?style=for-the-badge&logo=githubactions&logoColor=367cfe)

- TypeScript 5, strict typed UI logic
- Nunjucks templating via `html-bundler-webpack-plugin`
- SCSS with PostCSS Preset Env
- Webpack 5 toolchain (dev server, production build)
- ESLint, Stylelint, Prettier, Husky

[back to contents](#contents)

## 3. Getting started

1. `git clone https://github.com/elrouss/portfolio.git` — clone project
2. `npm ci` — install dependencies
3. `npm run dev` — start dev server (http://localhost:8080)

[back to contents](#contents)

## 4. Features

1. Adaptive and responsive layout (380 px, 768 px, 1440 px+)
2. Accessible header with hamburger + drawer, smooth in‑page navigation
3. Custom portfolio slider
   - Desktop: hover areas trigger smooth auto‑scroll with `requestAnimationFrame`
   - Mobile & Tablet: swipe interactions
4. FAQ accordion with persisted open state (LocalStorage) and smart first‑visit default
5. Pricing card list with booking dialog
6. Content‑driven templating (JSON → Nunjucks) for clean separation of content and layout
7. SEO‑ready meta: Open Graph + Twitter cards, favicons, theme color

[back to contents](#contents)

## 5. Architecture

- Atomic Design structure: `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`

[back to contents](#contents)

## 6. Performance and optimizations

- Responsive images (`<picture>`) with WebP and multiple resolutions
- Lazy media loading where supported (slider data is marked as lazy)
- Critical CSS extraction (`src/assets/styles/_critical.scss`)
- Minified, hashed assets for long‑term caching
- PostCSS preset env and Browserslist targeting for cross‑browser support
- Event throttling and `requestAnimationFrame` for smooth, jank‑free interactions

[back to contents](#contents)

## 7. Accessibility

- Semantic landmarks and headings for better screen reader navigation
- Keyboard‑friendly navigation
- ARIA attributes
- Respect for user motion preferences and clear focus styles on interactive controls

[back to contents](#contents)

## 8. Project structure

```text
src/
  assets/
    styles/              # SCSS (variables, mixins, critical, themes)
    images/ fonts/ icons # optimized static assets
  components/
    atoms/               # button, icon, input, picture, etc.
    molecules/           # nav, drawer, pricing-card, etc.
    organisms/           # header, hero, portfolio slider, faq, contacts
    templates/           # page templates (home)
  data/
    pages/index.json     # all page copy + meta + media config
  utils/                 # throttle, styles utils
  services/              # local-storage, touch-device adapters
  constants/             # breakpoints, transitions
```

[back to contents](#contents)

## 9. Scripts

- `npm run dev` — start development server
- `npm run build:dev` — development build
- `npm run build:prod` — production build
- `npm run tsc` — check TypeScript types
- `npm run eslint` / `npm run eslint:fix` — lint TypeScript
- `npm run stylelint` / `npm run stylelint:fix` — lint styles
- `npm run prettier:check` / `npm run prettier` — format

[back to contents](#contents)

## 10. Deployment

Hosted on GitHub Pages: `https://elrouss.github.io/portfolio` (see `homepage` in `package.json`).

Build with `npm run build:prod` and publish the `dist/` folder (e.g., via CI or manual upload). CI is configured with GitHub Actions to run linting and produce artifacts on push.

[back to contents](#contents)

## 11. License

ISC © 2025 Boris Zashliapin

[back to contents](#contents)

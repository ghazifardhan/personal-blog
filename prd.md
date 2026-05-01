# PRD: Personal Branding Website — Blog & Projects

**Product**: Personal Branding Website
**Stack**: Nuxt.js (Frontend) + Nuxt Studio (CMS Backend)
**Version**: 1.0
**Date**: May 2026

***

## 1. Product Overview

This product is a minimalist, content-first personal branding website that showcases your blog and projects. It uses **Nuxt Content** for structured markdown content and **Nuxt Studio** as the self-hosted, open-source CMS — running directly alongside your app with no external dependencies. The editorial experience is Notion-like (powered by TipTap), with Monaco code editing and real-time Git commits. [nuxt](https://nuxt.studio/introduction)

***

## 2. Goals & Non-Goals

**Goals:**
- Establish a strong personal brand with a professional, modern, and minimal aesthetic
- Allow frictionless content creation through Nuxt Studio's visual editor [dev](https://dev.to/jqueryscript/nuxt-studio-self-hosted-content-editing-for-production-sites-116j)
- Showcase blog articles and personal/professional projects in one cohesive site
- Achieve excellent Core Web Vitals, SEO, and accessibility

**Non-Goals:**
- E-commerce or monetization features
- Multi-author CMS workflows
- Complex user authentication for visitors

***

## 3. Target Users

| User | Description |
|---|---|
| **You (Author)** | Manage content via Nuxt Studio's visual interface, push changes via GitHub OAuth  [dev](https://dev.to/jqueryscript/nuxt-studio-self-hosted-content-editing-for-production-sites-116j) |
| **Recruiters / Clients** | Scan projects quickly; verify skills and expertise |
| **Fellow Developers** | Read deep-dive blog posts; share and engage |
| **General Visitors** | Casual discovery via search or social links |

***

## 4. Site Architecture

```
/                    → Home (Hero + featured posts + featured projects)
/blog                → Blog index (list of all posts)
/blog/[slug]         → Single blog post
/projects            → Projects showcase grid
/projects/[slug]     → Single project detail
/about               → About page (bio, stack, social)
/uses                → Tools & gear page (optional)
```

Routing is handled by Nuxt's file-based router, with content stored as `.md` / `.yaml` files managed via **Nuxt Content v3**. [content.nuxt](https://content.nuxt.com)

***

## 5. Feature Requirements

### 5.1 Blog
- **Post listing**: Card-based grid with title, excerpt, tag(s), read time, and date
- **Single post view**: Full MDC rich content — headings, code blocks with syntax highlighting, callouts, blockquotes, embedded Vue components
- **Tags / categories**: Filterable taxonomy
- **Table of Contents**: Auto-generated sticky sidebar on desktop
- **Reading progress bar**: Thin top bar indicator
- **SEO**: Auto-populated `useSeoMeta()` per post (title, description, OG image)
- **Related posts**: Bottom-of-post section based on shared tags

### 5.2 Projects
- **Grid layout**: Card per project with cover image, title, short description, tech stack badges, and live/GitHub links
- **Detail page**: Full case study — problem, solution, stack, screenshots, links
- **Filter by category**: Web, OSS, Design, etc.

### 5.3 Home
- **Hero section**: Name, headline role, short bio, CTA buttons (Blog / Projects / Contact)
- **Featured articles**: 3 latest or pinned blog posts
- **Featured projects**: 3 pinned projects
- **Social links row**: GitHub, LinkedIn, Twitter/X, email

### 5.4 About
- Bio in rich markdown, tech stack icons grid, timeline (optional), CV download button

### 5.5 CMS / Nuxt Studio
- Self-hosted Nuxt Studio module for in-production visual editing [nuxt](https://nuxt.com/modules/studio)
- TipTap visual editor + Monaco for raw markdown [dev](https://dev.to/jqueryscript/nuxt-studio-self-hosted-content-editing-for-production-sites-116j)
- OAuth via GitHub (required for auth since Studio now requires SSR) [content.nuxt](https://content.nuxt.com/blog/studio-module-alpha)
- Media library for image uploads [dev](https://dev.to/jqueryscript/nuxt-studio-self-hosted-content-editing-for-production-sites-116j)
- YAML frontmatter form editor for post metadata

***

## 6. Design System

### 6.1 Stack
- **UI Library**: Nuxt UI v4 — 125+ accessible components powered by Tailwind CSS v4 and Reka UI (WAI-ARIA compliant) [ui.nuxt](https://ui.nuxt.com/docs/components)
- **Styling**: Tailwind CSS v4 with CSS variables and Tailwind Variants
- **Icons**: `@nuxt/icon` with Iconify (Lucide or Phosphor set)
- **Fonts**: Loaded via `@nuxt/fonts`

***

### 6.2 Color Palette

The system uses a **neutral base + single accent** strategy — keeping visual noise low and guiding attention to content. [bejamas](https://bejamas.com/blog/minimalist-web-design)

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-bg` | `#FAFAFA` | `#0D0D0D` | Page background |
| `--color-surface` | `#FFFFFF` | `#161616` | Cards, panels |
| `--color-surface-raised` | `#F4F4F5` | `#1F1F1F` | Hover states, code bg |
| `--color-border` | `#E4E4E7` | `#2A2A2A` | Dividers, card borders |
| `--color-text-primary` | `#18181B` | `#FAFAFA` | Headings, body |
| `--color-text-secondary` | `#71717A` | `#A1A1AA` | Captions, metadata |
| `--color-accent` | `#6366F1` (Indigo-500) | `#818CF8` (Indigo-400) | Links, CTAs, highlights |
| `--color-accent-hover` | `#4F46E5` | `#6366F1` | Interactive accent |
| `--color-code-bg` | `#F4F4F5` | `#1A1A1A` | Inline/block code |
| `--color-tag` | `#EEF2FF` | `#1E1B4B` | Tag/badge background |

> **Dark mode** is the default, with a light mode toggle. This aligns with developer-audience expectations.

***

### 6.3 Typography

Nuxt UI v4's typography system maps directly to Tailwind's `prose` classes. Use `@nuxt/fonts` for zero-config Google Font loading. [github](https://github.com/nuxt/ui/issues/4488)

| Role | Font | Weight | Size |
|---|---|---|---|
| **Display / Hero** | `Inter` | 700–800 | `clamp(2.5rem, 5vw, 4rem)` |
| **Heading H1** | `Inter` | 700 | `2.25rem` (36px) |
| **Heading H2** | `Inter` | 600 | `1.75rem` (28px) |
| **Heading H3** | `Inter` | 600 | `1.375rem` (22px) |
| **Body** | `Inter` | 400 | `1rem` (16px), `line-height: 1.75` |
| **Caption / Meta** | `Inter` | 400 | `0.875rem` (14px) |
| **Code (inline/block)** | `JetBrains Mono` | 400 | `0.875rem` (14px) |

- Max content column width: `65ch` (optimal reading line length) [bejamas](https://bejamas.com/blog/minimalist-web-design)
- Prose styles handled by `@tailwindcss/typography` (`prose prose-zinc dark:prose-invert`)

***

### 6.4 Spacing Scale

Based on an 4px base unit, following Tailwind's default scale:

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps (icon padding) |
| `space-2` | 8px | Inline element gaps |
| `space-4` | 16px | Component inner padding |
| `space-6` | 24px | Section sub-spacing |
| `space-8` | 32px | Card padding, section gap |
| `space-16` | 64px | Section vertical rhythm |
| `space-24` | 96px | Hero / large section padding |

***

### 6.5 Component Inventory

All components extend **Nuxt UI v4** primitives: [ui.nuxt](https://ui.nuxt.com)

#### Layout Components
- `<AppHeader>` — sticky, blurred backdrop (`backdrop-blur-md`), logo left, nav center/right, dark mode toggle + mobile hamburger
- `<AppFooter>` — minimal: copyright, social icons row, back-to-top
- `<PageContainer>` — centered max-width `1280px` wrapper with horizontal padding

#### Blog Components
| Component | Description |
|---|---|
| `<PostCard>` | Tag chip, title, excerpt (2-line clamp), date + read time, hover: subtle lift shadow |
| `<PostHeader>` | Hero of single post: title, tags, author avatar, date, read time |
| `<PostBody>` | MDC content renderer with `prose` styles |
| `<PostTOC>` | Sticky sidebar on `lg:` breakpoint, active section highlight |
| `<ReadingProgress>` | Fixed 2px top bar, accent color fill |
| `<PostTag>` | Small pill badge: `bg-tag text-accent` |
| `<RelatedPosts>` | 2-col grid of `<PostCard>` filtered by tags |
| `<CodeBlock>` | Shiki-powered syntax highlighted block with copy button |

#### Project Components
| Component | Description |
|---|---|
| `<ProjectCard>` | Cover image, title, short desc, tech badge row, icon links (GitHub, Live) |
| `<ProjectHeader>` | Detail page hero with cover, title, status badge |
| `<TechBadge>` | Pill with Devicon icon + label |

#### Global / Shared
| Component | Description |
|---|---|
| `<HeroSection>` | Full viewport hero with animated gradient text or subtle noise texture bg |
| `<SectionTitle>` | H2 + optional subtitle, with a short accent underline decoration |
| `<SocialLinks>` | Row of icon-only `<UButton variant="ghost">` links |
| `<ThemeToggle>` | Sun/Moon icon toggle, persisted via `useColorMode()` |
| `<TagFilter>` | Horizontal scroll chip group for blog/project filtering |

***

### 6.6 Elevation & Effects

- **Card hover**: `translate-y(-2px)` + `shadow-md` — soft lift, no border flash
- **Focus rings**: `ring-2 ring-accent ring-offset-2` (WCAG 2.1 AA compliant)
- **Backdrop blur**: Used on sticky header (`backdrop-blur-md bg-bg/80`)
- **Gradient accents**: Hero headline uses `bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500`
- **No heavy animations** — only `transition-all duration-200 ease-out` for micro-interactions

***

### 6.7 Responsive Breakpoints

Follows Tailwind's defaults:

| Breakpoint | Width | Layout behavior |
|---|---|---|
| `sm` | 640px | Single column, stacked nav |
| `md` | 768px | 2-col blog grid, hamburger → inline nav |
| `lg` | 1024px | 3-col grid, TOC sidebar appears |
| `xl` | 1280px | Max content width locked |

***

## 7. Content Schema (Nuxt Content v3)

### Blog Post Frontmatter
```yaml
---
title: "Your Post Title"
description: "SEO-friendly excerpt, 150 chars max"
publishedAt: 2026-05-01
updatedAt: 2026-05-10
tags: ["nuxt", "vue", "frontend"]
cover: /images/blog/my-post-cover.jpg
readTime: 5       # minutes, auto-calculated fallback
featured: false   # pin to homepage
draft: false
---
```

### Project Frontmatter
```yaml
---
title: "Project Name"
description: "One-line summary"
cover: /images/projects/project-cover.jpg
tags: ["nuxt", "open-source"]
status: "completed"   # completed | in-progress | archived
stack: ["nuxt", "tailwindcss", "supabase"]
github: "https://github.com/..."
live: "https://..."
featured: true
order: 1
---
```

***

## 8. Tech Stack Summary

| Layer | Technology |
|---|---|
| **Framework** | Nuxt.js (SSR/Hybrid) |
| **CMS** | Nuxt Studio (self-hosted, OSS)  [nuxt](https://nuxt.com/modules/studio) |
| **Content** | Nuxt Content v3 (MDC, git-based)  [content.nuxt](https://content.nuxt.com) |
| **UI Library** | Nuxt UI v4 (125+ components, Tailwind CSS v4)  [ui.nuxt](https://ui.nuxt.com) |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/typography` |
| **Syntax Highlighting** | Shiki (via Nuxt Content) |
| **Icons** | `@nuxt/icon` + Iconify (Lucide set) |
| **Fonts** | `@nuxt/fonts` (Inter + JetBrains Mono) |
| **SEO** | `@nuxtjs/seo` module + `useSeoMeta()` |
| **Color Mode** | `@nuxtjs/color-mode` |
| **Deployment** | Vercel / Netlify / Coolify (SSR required for Studio auth)  [content.nuxt](https://content.nuxt.com/blog/studio-module-alpha) |

***

## 9. SEO & Performance Requirements

- **Lighthouse score**: ≥ 95 on Performance, Accessibility, SEO, Best Practices
- **OG images**: Auto-generated per post using `nuxt-og-image`
- **Sitemap**: Auto-generated via `@nuxtjs/sitemap`
- **Robots.txt**: Block `/studio` admin route from indexing
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, INP < 200ms

***

## 10. Milestones

| Phase | Deliverable | Est. Duration |
|---|---|---|
| **1 — Setup** | Nuxt project, Nuxt UI v4, Nuxt Content, Nuxt Studio config | 1–2 days |
| **2 — Design** | Global layout, design tokens, typography, dark mode | 2–3 days |
| **3 — Blog** | Post listing, single post, TOC, tags, code blocks | 3–4 days |
| **4 — Projects** | Projects grid, detail pages, filters | 2–3 days |
| **5 — Home & About** | Hero, featured sections, about page | 1–2 days |
| **6 — CMS & Auth** | Nuxt Studio setup, GitHub OAuth, frontmatter forms | 1–2 days |
| **7 — Polish** | SEO, OG images, sitemap, animations, Lighthouse audit | 2–3 days |
| **Total** | | **~2–3 weeks** |
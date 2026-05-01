---
title: "Embracing Nuxt 4 and Tailwind v4"
description: "A deep dive into setting up a modern personal branding website with Nuxt 4, Nuxt Content v3, and the latest Tailwind CSS v4 features."
publishedAt: "2026-05-01"
tags: ["nuxt", "tailwindcss", "frontend"]
cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
readTime: 4
featured: true
---

# Introduction

Welcome to my new personal branding website. It is built using the latest modern web technologies. We chose **Nuxt 4** for its powerful SSR capabilities and **Nuxt Content v3** for a seamless git-based CMS experience.

## Why Nuxt 4?

Nuxt has always provided an excellent developer experience. With the new version, performance is better than ever, and the integration with tools like Nuxt UI makes scaffolding complex layouts trivial.

```typescript
// Example of the new content querying API
const { data } = await useAsyncData('blog', () => 
  queryCollection('blog').all()
)
```

## Styling with Tailwind v4

Tailwind v4 fundamentally changes how we write our CSS configuration. Gone are the days of complex `tailwind.config.js` files; now everything is defined in standard CSS using `@theme` blocks.

> This allows for a much more standard CSS-first approach while maintaining all the benefits of utility classes.

### The Future

I plan to keep documenting my journey here. Stay tuned for more posts covering projects, architecture, and design!

import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        tags: z.array(z.string()),
        cover: z.string(),
        readTime: z.number().default(5),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false)
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        cover: z.string(),
        tags: z.array(z.string()),
        status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
        stack: z.array(z.string()),
        github: z.string().optional(),
        live: z.string().optional(),
        featured: z.boolean().default(false),
        order: z.number().default(99)
      })
    })
  }
})

import { defineCollection, z } from 'astro:content'
import { rssSchema } from '@astrojs/rss'

const newsCollection = defineCollection({
  type: 'content',
  schema: rssSchema.merge(
    z.object({
      updatedDate: z.coerce.date().optional(),
      image: z.string().optional(),
    }),
  ),
})

const exhibitCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    headImage: z.string(),
  }),
})

export const collections = {
  news: newsCollection,
  exhibit: exhibitCollection,
}

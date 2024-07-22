import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts'

export const GET: APIRoute = async context =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? '',
    items: (await getCollection('news')).map(post => ({
      ...post.data,
      link: `/news/${post.slug}/`,
    })),
    stylesheet: '/rss/styles.xsl',
  })

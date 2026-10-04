import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { courses } from '@/lib/courses'
import { posts } from '@/lib/blog'

// Required for `output: 'export'` so the route is prerendered at build time.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // The site is built with `trailingSlash: true`, so list the canonical
  // directory form. Without the slash these entries would only resolve via a
  // 301 redirect from the static host.
  const url = (path = '/'): string => `${siteConfig.url}${path}`

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url(), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/courses/'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/about/'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/blog/'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/contact/'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: url(`/courses/${course.slug}/`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(`/blog/${post.slug}/`),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...courseRoutes, ...postRoutes]
}

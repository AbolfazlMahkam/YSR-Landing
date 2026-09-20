import { SiteHeader } from '@/components/sections/site-header'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { About } from '@/components/sections/about'
import { Courses } from '@/components/sections/courses'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { Blog } from '@/components/sections/blog'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/sections/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="page-content">
        <Hero />
        <StatsBar />
        <About />
        <Courses />
        <Features />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

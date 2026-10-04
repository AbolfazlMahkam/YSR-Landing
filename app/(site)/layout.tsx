import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/site-footer'

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="page-content">{children}</main>
      <SiteFooter />
    </>
  )
}

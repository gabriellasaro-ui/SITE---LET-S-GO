import type { Metadata } from 'next'
import { site } from '@/config/site'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { HomeHero } from '@/components/sections/HomeHero'
import { HighlightsMarquee } from '@/components/ui/HighlightsMarquee'
import { IntroSection } from '@/components/sections/IntroSection'
import { PartiesSection } from '@/components/sections/PartiesSection'
import { FunZoneSection } from '@/components/sections/FunZoneSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'

const title = `${site.name} | Espaço para festas infantis na Pampulha em BH`
const description =
  'Espaço para festas infantis na orla da Lagoa da Pampulha, em BH: Festa Coquetel e Festa Kids com buffet, decoração, monitores e Espaço Diversão com Kid Play e Cinema 6D.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/', absoluteTitle: true })

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/', name: title, description })} />
      <HomeHero />
      <HighlightsMarquee tone="primary" />
      <IntroSection />
      <SoftCurve from="paper" to="mist" />
      <PartiesSection />
      <SoftCurve from="mist" to="accent-deep" />
      <FunZoneSection compact />
      <SoftCurve from="accent-deep" to="paper" flip />
      <TestimonialsSection />
      <SoftCurve from="paper" to="mist" />
      <GalleryPreview />
      <SoftCurve from="mist" to="primary" flip />
      <FinalCta />
    </>
  )
}

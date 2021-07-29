import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

export default function OfflinePage() {
  return (
    <>
      <DefaultSeo {...SEO} />
      <h1>This is offline fallback page</h1>
      <h2>When offline, any page route will fallback to this page</h2>
    </>
  )
}

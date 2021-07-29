import { useEffect } from 'react'
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

export const analytics = Analytics({
  app: 'personal',
  debug: process.env.NODE_ENV === 'development',
  plugins: [
    googleAnalytics({
      trackingId: process.env.NEXT_PUBLIC_GA,
    }),
  ],
})

const trackOnLoad: typeof analytics.page = async (...args) => {
  await analytics.page(...args)
}

export function useTrackPage(...args: Parameters<typeof analytics.page>) {
  useEffect(() => {
    trackOnLoad(...args).then(() => {})
  })
}

export interface EventMap {
  skills_clear: null
  skills_add: string
  skills_remove: string
  skills_copied: string
  blog_devto_read_external: null
  theme: 'dark' | 'light'
  side_projects_open: string
  nav_email: null
  socials: string
}

export async function trackEvent<K extends keyof EventMap>(eventName: K, props: EventMap[K]): Promise<void> {
  await analytics.track(eventName, props)
}

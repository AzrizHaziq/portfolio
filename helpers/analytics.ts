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
  skills_clear: { category: 'skill' }
  skills_add: { category: 'skill'; label: string }
  skills_remove: { category: 'skill'; label: string }
  skills_copied: { category: 'skill'; label: string }
  code_copied: { category: 'blog'; label: string }
  blog_devto_read_external: { category: 'blog'; label: string }
  theme: { category: 'user_preference'; label: 'dark' | 'light' }
  side_projects_open: { category: 'side_projects'; label: string }
  nav_email: { category: 'socials'; label: 'email' }
  socials_click: { category: 'socials'; label: string }
  // example_playVideo: {
  //   category: 'Videos'
  //   label: 'Fall Campaign'
  //   value: 42
  // }
}

export async function trackEvent<K extends keyof EventMap>(eventName: K, props: EventMap[K]): Promise<void> {
  await analytics.track(eventName, props)
}

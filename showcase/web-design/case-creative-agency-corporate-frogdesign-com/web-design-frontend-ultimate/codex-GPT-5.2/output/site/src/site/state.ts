import type { TeamRegionKey } from './content'

export type CookieConsent = 'unset' | 'accepted' | 'declined'

export type AppState = {
  heroIndex: number
  heroAutoPlay: boolean
  teamRegion: TeamRegionKey
  teamIndex: number
  languageOpen: boolean
  languageValue: string
  cookieConsent: CookieConsent
  cookieSettingsOpen: boolean
}

export const defaultState = (): AppState => {
  let cookieConsent: CookieConsent = 'unset'
  try {
    const stored = localStorage.getItem('leap_cookie_consent')
    if (stored === 'accepted' || stored === 'declined') cookieConsent = stored
  } catch {
    // ignore
  }

  let languageValue = 'en-global'
  try {
    const stored = localStorage.getItem('leap_language')
    if (stored) languageValue = stored
  } catch {
    // ignore
  }

  return {
    heroIndex: 0,
    heroAutoPlay: true,
    teamRegion: 'north-america',
    teamIndex: 0,
    languageOpen: false,
    languageValue,
    cookieConsent,
    cookieSettingsOpen: false,
  }
}

export const persistCookieConsent = (value: CookieConsent) => {
  try {
    if (value === 'accepted' || value === 'declined') {
      localStorage.setItem('leap_cookie_consent', value)
    } else {
      localStorage.removeItem('leap_cookie_consent')
    }
  } catch {
    // ignore
  }
}

export const persistLanguage = (value: string) => {
  try {
    localStorage.setItem('leap_language', value)
  } catch {
    // ignore
  }
}


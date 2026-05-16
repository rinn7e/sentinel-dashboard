import { type Theme } from './type'

export const themes: Record<string, Theme> = {
  modernBlue: {
    id: 'modernBlue',
    name: 'Modern Blue',
    primaryColor: '#2563eb', // blue-600
    secondaryColor: '#0f172a', // slate-900
    headerFont: "'Inter', sans-serif",
    normalFont: "'Inter', sans-serif",
  },
  midnightPurple: {
    id: 'midnightPurple',
    name: 'Midnight Purple',
    primaryColor: '#7c3aed', // violet-600
    secondaryColor: '#020617', // slate-950
    headerFont: "'Outfit', sans-serif",
    normalFont: "'Inter', sans-serif",
  },
  emeraldForest: {
    id: 'emeraldForest',
    name: 'Emerald Forest',
    primaryColor: '#059669', // emerald-600
    secondaryColor: '#064e3b', // emerald-950
    headerFont: "'Roboto Condensed', sans-serif",
    normalFont: "'Inter', sans-serif",
  },
}

export const defaultTheme = themes.modernBlue

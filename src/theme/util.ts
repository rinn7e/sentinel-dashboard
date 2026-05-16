import { type Theme } from './type'

export const injectTheme = (theme: Theme): void => {
  const root = document.documentElement
  
  root.style.setProperty('--color-primary', theme.primaryColor)
  root.style.setProperty('--color-secondary', theme.secondaryColor)
  root.style.setProperty('--font-header', theme.headerFont)
  root.style.setProperty('--font-normal', theme.normalFont)
  
  // Also set some derived variables if needed (e.g., transparent versions)
  // For simplicity, we'll start with these core ones
}

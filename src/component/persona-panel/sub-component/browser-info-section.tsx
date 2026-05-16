import React from 'react'
import { type ColorScheme } from '@/theme/util'

export const BrowserInfoSection: React.FC<{
  themeName: string
  colorScheme: ColorScheme
}> = ({ themeName, colorScheme }) => {
  const [info, setInfo] = React.useState({
    browser: 'Loading...',
    os: 'Loading...',
    resolution: 'Loading...'
  })

  React.useEffect(() => {
    const ua = navigator.userAgent
    let browser = "Unknown"
    if (ua.indexOf("Firefox") > -1) browser = "Firefox"
    else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Browser"
    else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera"
    else if (ua.indexOf("Trident") > -1) browser = "Internet Explorer"
    else if (ua.indexOf("Edge") > -1) browser = "Edge"
    else if (ua.indexOf("Chrome") > -1) browser = "Chrome"
    else if (ua.indexOf("Safari") > -1) browser = "Safari"

    let os = "Unknown"
    if (ua.indexOf("Win") != -1) os = "Windows"
    else if (ua.indexOf("Mac") != -1) os = "MacOS"
    else if (ua.indexOf("Linux") != -1) os = "Linux"
    else if (ua.indexOf("Android") != -1) os = "Android"
    else if (ua.indexOf("like Mac") != -1) os = "iOS"

    setInfo({
      browser,
      os,
      resolution: `${window.screen.width}x${window.screen.height}`
    })
  }, [])

  return (
    <div className='mb-[24px] grid grid-cols-2 gap-[8px] border border-theme-primary/10 rounded-[8px] bg-theme-secondary/30 p-[12px]'>
      <div className='flex flex-col'>
        <span className='text-[9px] text-theme-primary uppercase font-black tracking-widest'>Browser</span>
        <span className='text-[11px] text-white font-mono'>{info.browser}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-[9px] text-theme-primary uppercase font-black tracking-widest'>Operating System</span>
        <span className='text-[11px] text-white font-mono'>{info.os}</span>
      </div>
      <div className='flex flex-col mt-[4px]'>
        <span className='text-[9px] text-theme-primary uppercase font-black tracking-widest'>Resolution</span>
        <span className='text-[11px] text-white font-mono'>{info.resolution}</span>
      </div>
      <div className='flex flex-col mt-[4px]'>
        <span className='text-[9px] text-theme-primary uppercase font-black tracking-widest'>Status</span>
        <span className='text-[11px] text-green-400 font-mono'>Connected</span>
      </div>
      <div className='flex flex-col mt-[4px]'>
        <span className='text-[9px] text-theme-primary uppercase font-black tracking-widest'>Theme</span>
        <span className='text-[11px] text-white font-mono'>{themeName}</span>
      </div>
      <div className='flex flex-col mt-[4px] col-span-2'>
        <span className='text-[9px] text-theme-primary uppercase font-black tracking-widest'>Color Scheme</span>
        <span className='text-[11px] text-white font-mono'>{colorScheme}</span>
      </div>
    </div>
  )
}

import React from 'react'
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon,MoonIcon } from '@heroicons/react/24/solid';
const DarkModeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    
    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme

  return (
      <div className='flex space-x-3 w-full cursor-pointer' onClick={() => { setTheme(currentTheme === 'dark' ? 'light' : 'dark') }}>
          {currentTheme === 'dark' ? (
              <SunIcon className='h-5 w-5 text-yellow-400'   />
          ): (
                  <MoonIcon className='h-5 w-5 text-white'  />
          )}
          <p>
              {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </p>
      </div>
  )
}

export default DarkModeButton
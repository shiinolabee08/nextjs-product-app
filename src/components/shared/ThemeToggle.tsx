'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const ThemeToggle = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme, toggleTheme }: any = useContext(ThemeContext)

  return (
    <button
      className={`toggle ${theme === 'dark' ? 'toggle--dark' : ''}`}
      onClick={toggleTheme}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle
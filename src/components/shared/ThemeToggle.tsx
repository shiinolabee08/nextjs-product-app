'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme, toggleTheme }: any = useContext(ThemeContext)

  return (
    <button
      className={`flex-1 hover:cursor-pointer focus:outline-none ${theme === 'dark' ? 'toggle--dark' : ''}`}
      onClick={toggleTheme}
    >
      { theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggle
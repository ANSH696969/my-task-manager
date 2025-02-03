'use client'; 
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';  

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-700 text-white rounded transition-all hover:bg-gray-600 md:p-3 flex items-center gap-2"
    >
      {darkMode ? (
        <>
          <FaSun className="text-yellow-500" /> Light Mode
        </>
      ) : (
        <>
          <FaMoon className="text-blue-500" /> Dark Mode
        </>
      )}
    </button>
  );
}

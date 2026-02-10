import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme state based on localStorage or System Preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light'; // Default
  });

  // Initialize Zen Mode state (for reduced motion)
  const [zenMode, setZenMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zenMode') === 'true';
    }
    return false;
  });

  // Handle Theme Side Effects
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old classes and add new one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Persist to local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle Zen Mode Side Effects
  useEffect(() => {
    localStorage.setItem('zenMode', zenMode);
  }, [zenMode]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleZenMode = () => {
    setZenMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, zenMode, toggleZenMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
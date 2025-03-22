// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the type for our context
type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

// Create a context with default values
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component that wraps our app
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user prefers dark mode initially
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize state with user preference or localStorage value
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme !== null 
      ? JSON.parse(savedTheme) 
      : prefersDarkMode;
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply theme class to document body
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Listen for changes in system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // This function will run when the system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Provide the theme context to child components
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultContextValue: AppContextType = {
  darkMode: false,
  toggleDarkMode: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export function useAppContext() {
  return useContext(AppContext);
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const value = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

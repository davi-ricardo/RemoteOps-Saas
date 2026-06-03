import { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("userPreferences");
    return saved
      ? JSON.parse(saved)
      : {
          theme: "system",
          sidebar: "expanded",
        };
  });

  // Aplicar tema automaticamente quando preferences mudar
  useEffect(() => {
    const applyTheme = (theme) => {
      const root = document.documentElement;
      
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else if (theme === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
      } else { // system
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          root.classList.add("dark");
          root.classList.remove("light");
        } else {
          root.classList.add("light");
          root.classList.remove("dark");
        }
      }
    };
    applyTheme(preferences.theme);

    // Listener para mudanças no tema do sistema (apenas se theme for "system")
    let mediaQuery;
    if (preferences.theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e) => applyTheme("system");
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [preferences.theme]);

  // Salvar preferências no localStorage e no backend
  const savePreferences = async (newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences));
    try {
      // Se você quiser salvar no backend também, é aqui
      // await api.put("/api/user-preferences", updatedPreferences);
    } catch (err) {
      console.error("Failed to save preferences:", err);
    }
  };

  return (
    <PreferencesContext.Provider value={{ preferences, savePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
// src/app/components/organisms/ThemeContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ETheme } from '@/utils/constants/theme.enum'; // Enum para los temas
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Definir el contexto
interface ThemeContextType {
  themeMode: ETheme;
  toggleTheme: () => void;
}

// Creamos el contexto con un valor por defecto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Proveedor del contexto
export const ThemeProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeMode, setThemeMode] = useState<ETheme>(ETheme.LIGHT);

  // Cargar el tema desde localStorage o usar el preferido del sistema
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode') as ETheme | null;
      if (savedMode) {
        setThemeMode(savedMode);
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setThemeMode(prefersDark ? ETheme.DARK : ETheme.LIGHT);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newThemeMode =
      themeMode === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT;
    setThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);
  };

  // Crear el tema dinámico basado en el modo
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#8C54FF',
      },
      secondary: {
        main: '#FF0000',
      },
      background: {
        default: themeMode === ETheme.DARK ? '#000000' : '#FFFFFF',
        paper: themeMode === ETheme.DARK ? '#000000' : '#FFFFFF',
      },
      text: {
        primary: themeMode === ETheme.DARK ? '#ffffff' : '#000000',
      },
      info: {
        main: themeMode === ETheme.DARK ? '#8C54FF' : '#8C54FF',
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'filled',
          slotProps: {
            input: {
              disableUnderline: true,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProviderComponent');
  }
  return context;
};

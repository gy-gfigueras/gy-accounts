'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface ThemeSwitchProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export function ThemeSwitch({ theme, setTheme }: ThemeSwitchProps) {
  return (
    <IconButton
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      color="inherit"
    >
      {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}{' '}
      {/* Íconos para el tema */}
    </IconButton>
  );
}

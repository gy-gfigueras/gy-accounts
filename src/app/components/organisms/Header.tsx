// src/app/components/organisms/Header.tsx

'use client';

import { Box, Typography } from '@mui/material';
import { valorantFont } from '@/utils/fonts';
import Image from 'next/image';
import { ThemeSwitch } from '../atoms/ThemeSwitch';
import { useTheme } from './ThemeContext'; // Importamos el hook useTheme
import React from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps): JSX.Element {
  const { themeMode, toggleTheme } = useTheme(); // Aquí estamos usando el contexto del tema

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: 1,
        fontFamily: valorantFont.style.fontFamily,
        height: '64px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100vw',
        paddingX: '10%',
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box display="flex" alignItems="center" gap="1rem" height="100%">
        <Image src="/gycoding.svg" alt="gy-image" width={32} height={32} />
        <Typography
          marginTop={'4px'}
          fontSize="20px"
          fontWeight={700}
          fontFamily={valorantFont.style.fontFamily}
          variant="h5"
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem" height="100%">
        <ThemeSwitch theme={themeMode} setTheme={toggleTheme} />
      </Box>
    </Box>
  );
}

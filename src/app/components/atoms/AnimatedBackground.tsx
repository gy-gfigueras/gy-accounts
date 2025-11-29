/* eslint-disable react/react-in-jsx-scope */
'use client';

import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component={motion.div}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Gradient orb 1 - Morado principal */}
      <Box
        component={motion.div}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(140, 84, 255, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(140, 84, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Gradient orb 2 - Morado claro/Rosa */}
      <Box
        component={motion.div}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(163, 112, 255, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(163, 112, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Gradient orb 3 - Morado oscuro */}
      <Box
        component={motion.div}
        animate={{
          x: [0, 60, 0],
          y: [0, -70, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '30%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(115, 64, 230, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(115, 64, 230, 0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Noise texture overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isDark ? 0.02 : 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </Box>
  );
}

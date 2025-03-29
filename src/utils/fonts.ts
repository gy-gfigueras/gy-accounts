import { Lexend } from 'next/font/google';
import localFont from 'next/font/local';

export const valorantFont = localFont({
  src: '../app/fonts/Valorant Font.ttf',
  variable: '--font-valorant',
});

export const lexendFont = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

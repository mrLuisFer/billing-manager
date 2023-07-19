import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';

const inter = Inter({ subsets: ['latin'] });
export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

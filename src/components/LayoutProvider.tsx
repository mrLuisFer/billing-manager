import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from './ThemeProvider';

const inter = Inter({ subsets: ['latin'] });
export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

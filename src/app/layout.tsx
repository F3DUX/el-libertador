import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Merriweather } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EL LIBERTADOR — La Vida de José de San Martín',
  description:
    'Vive la epopeya histórica del General San Martín desde Yapeyú (1778) hasta Boulogne-sur-Mer (1850). Toma decisiones estratégicas y decide el destino de América del Sur.',
  keywords: ['San Martín', 'historia argentina', 'independencia', 'juego histórico', 'libertador'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} ${merriweather.variable}`}
    >
      <body className="min-h-screen bg-fondo-patrio text-texto-patrio font-merriweather antialiased">
        {children}
      </body>
    </html>
  );
}

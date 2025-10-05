import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Preguntas Anónimas - Juego Interactivo',
  description: 'Juega con tus amigos respondiendo preguntas anónimas y adivinando quién escribió cada respuesta',
  keywords: 'preguntas, juego, anónimo, interactivo, multijugador',
  authors: [{ name: 'Tu Equipo' }],
  openGraph: {
    title: 'Preguntas Anónimas',
    description: 'Juego interactivo de preguntas anónimas',
    type: 'website',
  },
  verification: {
    google: '2OG0s1XAsC_7JK8VTryb3GLyxZzB9IsKYSFMwsOsqWo',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* 👇 Script de Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JDFP37FYVR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JDFP37FYVR');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


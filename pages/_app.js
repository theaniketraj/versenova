import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} ${playfair.variable} font-sans`}>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;

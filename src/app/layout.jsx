import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import TransitionOverlay from './components/transition/TransitionOverlay';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Maria Abdurakhmanova - Frontend Developer Portfolio',
  description: 'Designed and developed by Maria Abdurakhmanova',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${dmSans.variable} ${playfairDisplay.variable}`}>
        <TransitionOverlay />
        {children}
      </body>
    </html>
  );
}

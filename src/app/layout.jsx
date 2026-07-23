// import global styles
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import TransitionOverlay from './components/transition/TransitionOverlay';

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
      <body>
        <TransitionOverlay />
        {children}
      </body>
    </html>
  );
}

// import global styles
import './globals.css';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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
      <body>{children}</body>
    </html>
  );
}

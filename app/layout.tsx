import type { Metadata, Viewport } from 'next';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/400.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lohitha Damisetti · Unmasked · Full Stack Developer',
  description: "Everyone wanted to know what's under the mask. Scroll to play the episode.",
  openGraph: {
    title: 'Kakashi: Unmasked',
    description: "What's under the mask? Scroll to play.",
    images: ['/stills/face.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#000000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

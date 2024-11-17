// app/layout.js

import './globals.css';

export const metadata = {
  title: 'My Next.js App with Animated Background',
  description: 'Example of an animated background in Next.js',
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        {/* Background Video */}
        <video
          className="background-video"
          src="/lofi-background.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}

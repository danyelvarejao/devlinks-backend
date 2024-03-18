import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Devlinks',
  description:
    'Devlinks é uma aplicação desenvolvida com o auxílio do create next app. Explore um mundo de conexões e recursos para desenvolvedores, onde você pode descobrir ferramentas, tutoriais e comunidades relevantes para aprimorar suas habilidades e projetos de desenvolvimento.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

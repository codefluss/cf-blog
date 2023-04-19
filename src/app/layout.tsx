import './globals.scss';
import Header from '@/components/header';

export const metadata = {
  title: 'Codefluss - Blog',
  description: 'Friedrich Bachinger Dev Blog',
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
      {/* @ts-expect-error Server Component */}
      <Header />
        <div className="z-10">
          {children}
        </div>
      </body>
    </html>
  )
}

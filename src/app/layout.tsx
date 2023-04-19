import './globals.scss'

export const metadata = {
  title: 'Codefluss - Blog',
  description: 'Friedrich Bachinger Dev Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

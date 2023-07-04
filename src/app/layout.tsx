import Header from '@/components/Header'
import './globals.css'

export const metadata = {
  title: 'Google Shopping',
  description: 'Google Shopping Clone with Oxylabs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

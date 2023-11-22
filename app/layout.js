import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  openGraph: {
    images: `https://sanity-and-next-js-14.vercel.app/og?title=hiThisIsMyBlog`,
  },
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

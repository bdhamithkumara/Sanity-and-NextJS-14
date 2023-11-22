import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  openGraph: {
    title: "Generate Dynamic Open Graph and Twitter Images in Next.js",
    description:"A guide on how to optimize SEO with static and dynamic metatags using Next.js 13's new Metadata API.",
    images: 'https://sanity-and-next-js-14.vercel.app/og?title=hiThisIsMyBlog',
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate Dynamic Open Graph and Twitter Images in Next.js",
    description:
      "A guide on how to optimize SEO with static and dynamic metatags using Next.js 13's new Metadata API.",
    images: [
      'https://sanity-and-next-js-14.vercel.app/og?title=hiThisIsMyBlog',
    ],
  }

}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

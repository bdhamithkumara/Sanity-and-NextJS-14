"use client"
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { client } from '../../client'
import groq from 'groq'
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';
import Link from 'next/link';
import BlockContent from "@sanity/block-content-to-react"
import { PortableText, toPlainText } from '@portabletext/react'
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'next/navigation'
import MyPage from './MyPage'


const builder = imageUrlBuilder(client);

function urlFor(source) {
  console.log(builder.image(source))
  return builder.image(source)
}



const SinglePage = () => {



  const { slug } = useParams()
  const [singlePost, setSinglePost] = useState([])
  const [isLoading, setIsLoading] = useState(true)




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(groq`*[slug.current == "${slug}"]{
          title, 
          date, 
          coverImage, 
          content , 
          "images": content[_type == "innerimage"]
              {'_ref':asset._ref}
        }`)
        setSinglePost(response[0]);
        setIsLoading(false)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    //console.log(singlePost.images);
  }, [slug])

  const myPortableTextComponents = {
    types: {
      innerimage: ({ value }) =>
        <Image
          width={200}
          height={200}
          decoding="async"
          data-nimg="1"
          src={urlFor(value.asset._ref).width(200).height(300).url()}
          alt='image2'
        />,
    },
    block: {
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl font-bold">{children}</h3>,
      h4: ({ children }) => <h4 className="text-lg font-bold">{children}</h4>,
      p: ({ children }) => <p className="text-base">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 p-4">
          {children}
        </blockquote>
      ),
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-gray-200 p-2 rounded">{children}</code>
      ),
      u: ({ children }) => <u className="underline">{children}</u>,
      s: ({ children }) => <s className="line-through">{children}</s>,
      ul: ({ children }) => (
        <ul className="list-disc pl-4">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal pl-4">
          {children}
        </ol>
      ),
      a: ({ children, href }) => (
        <a className="text-blue-500 underline" href={href}>
          {children}
        </a>),

    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul className="list-disc pl-4">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-4">
          {children}
        </ol>),

      // Ex. 2: rendering custom lists
      checkmarks: ({ children }) => <ol className="m-auto text-lg">{children}</ol>,
    },
  }


  return (
    <>
      
    <Helmet>
    <title>{singlePost.title}</title>
    <meta name="keywords" content="Next.js, React, SEO" />
    <meta name="description" content="Put your description here."></meta>
    <meta property="og:title" content="My Page Title for Open Graph" />
    <meta property="og:description" content="This is a page description for Open Graph." />
    <meta property="og:image" content="https://sanity-and-next-js-14.vercel.app/og"/>
    <meta name="application-name" content="Next.js" />
    <meta name="author" content="Seb" />
    <link rel="author" href="https://nextjs.org" />
    <meta name="author" content="Josh" />
    <meta name="generator" content="Next.js" />
    <meta name="keywords" content="Next.js,React,JavaScript" />
    <meta name="referrer" content="origin-when-cross-origin" />
    <meta name="color-scheme" content="dark" />
    <meta name="creator" content="Jiachi Liu" />
    <meta name="publisher" content="Sebastian Markbåge" />
    <meta name="format-detection" content="telephone=no, address=no, email=no" />
    <link rel="canonical" href="https://acme.com" />
    <link rel="alternate" hreflang="en-US" href="https://acme.com/en-US" />
    <link rel="alternate" hreflang="de-DE" href="https://acme.com/de-DE" />
    <meta property="og:image" content="https://sanity-and-next-js-14.vercel.app/og" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="sample title by damith" />
    <meta property="og:description" content="sample description by damith" />
    <meta property="og:image" content="https://sanity-and-next-js-14.vercel.app/og" />

    <meta name="twitter:card" content="https://sanity-and-next-js-14.vercel.app/og" />
    <meta name="twitter:image:alt" content="PSGC API Banner"/>
    <meta name="twitter:title" content="Philippine Standard Geographic Code API"/>
    <meta name="twitter:description" content="API used for listing all the region, province, city, municipality, barangay, and its data. Philippine Standard Geographic Codes (PSGC) data came from Philippine Statistics Authority."/>

  </Helmet>

      <MyPage/>
      <p>Simple Usage</p>
      {isLoading ? (
        <h1 className="uppercase font-bold text-4xl tracking-wide mb-5 md:text-6xl lg:text-8xl flex items-center justify-center h-screen">
          Loading... !
        </h1>
      ) : (
        <section className="px-5 xl:max-w-6xl xl:mx-auto pb-20">
          <h1 className="uppercase font-bold text-4xl tracking-wide mb-10 md:text-6xl lg:text-8xl text-center mt-5">
            {singlePost.title}
          </h1>
          
          {singlePost.coverImage && singlePost.coverImage.asset && (
            <Image
              width={200}
              height={200}
              src={urlFor(singlePost.coverImage.asset._ref).width(200).height(300).url()}
              alt='image'
            />
          )}

          <p>PortableText</p>
          <div>
            <PortableText
              value={singlePost.content}
              components={myPortableTextComponents}
            />
          </div>

          <button className='mt-[20px]'>
            <Link
              href="/blog"
              className=" py-2 px-6 rounded shadow text-white bg-blue-700 hover:bg-transparent border-2 border-black transition-all duration-500 hover:text-black font-bold"
            >
              Read more articles
            </Link>
          </button>
          <div>
          <br/>
          
        </div>
        </section>
      )}
    </>
  )
}

export default SinglePage


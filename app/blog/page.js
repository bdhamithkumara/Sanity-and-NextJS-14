"use client"
import React, { useState, useEffect } from 'react'
import { client } from '../client'
import groq from 'groq';
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';
import Link from 'next/link';
import { ArticleJsonLd } from 'next-seo';


const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source)
}

const Blog = () => {



    const [posts, setPost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.fetch(groq`*[_type == "exampleDocumentType"]{
              title,date, coverImage  ,content, slug , excerpt , author , 
            }`)

                setPost(response);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [])

    return (
        <div>
            <p>total blog post count is {posts.length}</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <article key={post.slug.current}>
                        <Image 
                            width={200}
                            height={200} 
                            src={urlFor(post.coverImage.asset._ref).width(200).height(300).url()} 
                            alt={post.title} />
                        <h4 className="text-xl mt-2">{post.title}</h4>
                        <button className="mt-5 mb-10">
                            <Link
                            href={`/blog/`} 
                            as={`/blog/${post.slug.current}?title=${post.title}`}
                                className="py-2 px-6 rounded shadow text-white bg-black hover:bg-transparent border-2 border-black transition-all duration-500 hover:text-black font-bold"
                            >
                                Read Full Article
                            </Link>
                        </button>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Blog

export async function getStaticPaths() {
    const response = await client.fetch(groq`*[_type == "exampleDocumentType"]`)

    return { props: { response } }
  }


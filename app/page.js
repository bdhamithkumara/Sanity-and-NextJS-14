"use client"
import Image from 'next/image';
import { client } from './client'
import { useEffect, useState } from 'react'
import groq from 'groq'
import imageUrlBuilder from "@sanity/image-url";
import { useNextSanityImage } from 'next-sanity-image';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source)
}

export default function Home() {

  const [posts, setPost] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(groq`*[_type == "post"]{
          title,date,excerpt , mainImage  ,content
        }`)

        setPost(response);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    const fetchImages = async () => {

      try {
        const responseImage = await client.fetch(groq`*[_type == "images"]{
          title,mainImage
        }`)

        setImages(responseImage);
        console.log(responseImage)
      } catch (error) {
        console.error(error);
      }

    }

    fetchData();
    fetchImages();
    console.log(posts)
  }, []);



  return (
    <div >

    <div className="container mx-auto mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {images.map((image, id) => (
      <div key={id} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-black">{image.title}</h2>

        <div className="mb-4">
          <Image
            data-nimg="1"
            alt="sample"
            decoding="async"
            width={200}
            height={200}
            className="rounded"
            src={urlFor(image.mainImage.asset._ref).width(200).height(300).url()}
          />
        </div>
        <p className="text-gray-600">{image.excerpt}</p>
      </div>
    ))}
  </div>

      <div className="container mx-auto mt-8"> 
      {posts.map((post, id) => (
        <div key={id} className="bg-white p-8 rounded shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4 text-black">{post.title}</h2>
          <p className="text-gray-500 mb-2">{post.date}</p>
          <div className="mb-4">
            <p className="text-gray-700">{post.content}</p>
          </div>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="mb-4">
            <Image
              data-nimg="1"
              alt="sample"
              decoding="async"
              width={200}
              height={200}
              className="rounded"
              src={urlFor(post.mainImage.asset._ref).width(200).height(300).url()}
            />
          </div>
        </div>
      ))}
      </div>
      <p>-------------</p>



    </div>
  );
}

import { useParams } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import { client } from '../client'
import groq from 'groq';
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';
import Link from 'next/link';

const SinglePage = () => {

    const {slug} = useParams()
    const [singlePost, setSinglePost] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     client
    //     .fetch(
    //         `*[slug.current == ""] {
    //         title
    //         }
    //       }`
    //       )
    //       .then((data) => setSinglePost(data[0]))
    //     setIsLoading(false)
    //   }, [slug])

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await client.fetch(groq`*[_type == "${slug}"]{
              title
            }`)
    
          setSinglePost(response[0]);
            console.log(response)
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();

    },[])


    return (
        <>
          {isLoading ? (
            <h1 className="uppercase font-bold text-4xl tracking-wide mb-5 md:text-6xl lg:text-8xl flex items-center justify-center h-screen">
              Loading...
            </h1>
          ) : (
            <section className="px-5 xl:max-w-6xl xl:mx-auto pb-20">
              <h1 className="uppercase font-bold text-4xl tracking-wide mb-10 md:text-6xl lg:text-8xl text-center mt-5">
                {singlePost.title}
              </h1>
            </section>
          )}
        </>
      )
}

export default SinglePage
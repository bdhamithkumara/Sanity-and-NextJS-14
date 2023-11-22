import Head from "next/head";

export async function getStaticProps() {
    const pageTitle = "My Page Title";
    const pageDescription = "My page description";
  
    return {
      props: {
        pageTitle,
        pageDescription
      }
    }
  }
  
  function MyPage({pageTitle, pageDescription}) {
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content="Images in Next.js"/>
          <meta property="og:description" content="A guide on how to optimize "/>
          <meta property="og:image" content="https://sanity-and-next-js-14.vercel.app/og?title=hiThisIsMyBlog"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Generate Dynamic Open Graph"/>
          <meta name="twitter:description" content="A guide on how to optimize "/>
          <meta name="twitter:image" content="https://sanity-and-next-js-14.vercel.app/og?title=mytesttt"></meta>
        </Head>
      </>
    );
  }
  
  export default MyPage;
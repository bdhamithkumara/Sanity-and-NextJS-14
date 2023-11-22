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
        </Head>
        {/* page content */}
      </>
    );
  }
  
  export default MyPage;
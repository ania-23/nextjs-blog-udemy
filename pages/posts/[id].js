import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/post";
import utilStyles from "../../styles/utils.module.css";
// import Head from "next/head";
import Head from "next/head";
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

// idに応じて記事のデータを持ってくる
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function post({ postData }) {
  console.log(postData);

  return (
    <Layout>
      {/* <Head>
        <title>{postData.title}</title>
      </Head> */}
      <article key={postData.id}>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <br />
        <div className={utilStyles.lightText}>{postData.date}</div>
        <br />

        <div
          dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}
        ></div>

        <br />
      </article>
    </Layout>
  );
}

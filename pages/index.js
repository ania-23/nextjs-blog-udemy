import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "@/lib/post";

// SSGの場合
export async function getStaticProps() {
  // 一度だけデータを取得する
  const allPostsData = getPostsData();
  // console.log("index.js gSP", allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  console.log("index.js", allPostsData);
  // return <div>a</div>;
  return (
    <Layout home>
      {/* <Head>
        <title>{siteTitle}</title>
      </Head> */}
      <section className={utilStyles.headingMd}>
        <p>私はフルスタックエンジニアです/好きな言語はNext.jsです</p>
        {/* <Link href="/posts/first-post">最初の投稿はこちら</Link>  あとで外す*/}
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>エンジニアのブログ</h2>

        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

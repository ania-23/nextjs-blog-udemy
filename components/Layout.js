import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import utilStyles from "../styles/utils.module.css";

export const siteTitle = "Next.js blog";
const name = "Shin Code";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      {/* <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head> */}
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">←ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;

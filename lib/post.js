// import path from "path";
// import fs from "fs";
// import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

// const postsDirectory = path.join(process.cwd(), "posts");

// export function getPostsData() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map((fileName) => {
//     const id = fileName.replace(/\.md$/, ""); //ファイル名

//     // mdファイル文字列として読み取る
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");

//     // メタデータ（タイトル、日付、サムネイル）
//     const matterResult = matter(fileContents);

//     // 全部で4つの項目を返却
//     return {
//       id,
//       ...matterResult.data,
//     };
//   });

//   // console.log(allPostsData);
//   return allPostsData;
// }

// // postsディレクトリ全てのファイル名をリストで返却する
// export function getAllPostIds() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   return fileNames.map((fileName) => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, ""),
//       },
//     };
//   });
// }

// // id に基づいてブログ投稿データを返す
// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContent = fs.readFileSync(fullPath, "utf8");

//   const matterResult = matter(fileContent);

//   // matterResult.content//MarkdownParser前の（本文の）文字列
//   const blogContent = await remark().use(html).process(matterResult.content);

//   const blogContentHTML = blogContent.toString();

//   return {
//     id,
//     blogContentHTML,
//     ...matterResult.data,
//   };
// }

import path from "path";
import fs from "fs";
import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
// console.log(postsDirectory);

//mdファイルのデータを日付順に取り出す(トップページのブログ一覧出力で使う)
export function getPostsData() {
  // /posts配下のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log(fileNames);
  const allPostsData = fileNames.map((fileName) => {
    // idを取得するためにファイル名の拡張子を除外
    const id = fileName.replace(/\.md$/, "");

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //投稿のメタデータ部分を解析
    const matterResult = matter(fileContents);

    //idとデータを返す。
    return {
      id,
      ...matterResult.data,
    };
  });
  // console.log(allPostsData);
  //投稿を日付でソートする
  // return allPostsData.sort((a, b) => {
  //   if (a.data < b.data) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // });
  return allPostsData;
}

//動的ルーティング時に設定
//postsディレクトリの中の全てのファイル名をリストで返す
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // 以下のような配列を返します:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      //あとで、これら(id)がルーティングのパスになる。
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

//idに基づいてブログの投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents);
  // console.log(matterResult);

  // マークダウンをHTML文字列に変換するためにremarkを使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const blogContentHTML = processedContent.toString();
  // console.log(contentHTML);

  //データをidと組み合わせる。
  return {
    id,
    blogContentHTML, //あとで追加
    ...matterResult.data,
  };
}

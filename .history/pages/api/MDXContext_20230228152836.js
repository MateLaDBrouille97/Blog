import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";

// const fs = require("fs");
// const path = require("path");

// const POSTS_PATH = path.join(process.cwd(), "content");

// console.log(POSTS_PATH)

// //1- get slugs who are the equivalent of url
// export const getSlugs = () => {
//     const paths = fetch(`${POSTS_PATH}/*.mdx`);
//     console.log(paths)
//     return [];
//     // return paths.map((path) => {
//     //   const parts = path.split("/");
//     //   const fileName = parts[parts.length - 1];
//     //   const [slug, _ext] = fileName.split(".");
//     //   return slug;
//     // });

//   };

// export const getAllPosts = () => {
//     getSlugs()
//     // const posts = getSlugs()
//     //   .map((slug) => getPostFromSlug(slug))
//     //   .sort((a, b) => {
//     //     if (a.meta.date > b.meta.date) return 1;
//     //     if (a.meta.date < b.meta.date) return -1;
//     //     return 0;
//     //   })
//     //   .reverse();
//     // return posts;
//   };
  

const root = process.cwd()

export default function getFiles(type){
  return fs.readdirSync(path.join(root,'content',type))
}

export async function getFileBySlug(type,slug ){
  const source = slug? fs.readFileSync (path.join(root,'content',type,`${slug}.mdx`),'utf8'):
  fs.readFileSync (path.join(root,'content',`${type}.mdx`),'utf8')

  const {data,context}=matter(source)
  const mdxSource= await renderToString(context,{components:Article})


  return{mdxSource,
    fontMatter:{
    wordCount:context.split(/\s+/gu).length,
    slug:slug||null,
    ...data
  }}
}
// import path from "path";
// import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

const fs = require("fs");
const path = require("path");

const POSTS_PATH = path.join(process.cwd(), "../content/posts");

console.log(POSTS_PATH)

//1- get slugs who are the equivalent of url
export const getSlugs = () => {
    const paths = sync(`${POSTS_PATH}/*.mdx`);
    console.log(paths)
    return [];
    // return paths.map((path) => {
    //   const parts = path.split("/");
    //   const fileName = parts[parts.length - 1];
    //   const [slug, _ext] = fileName.split(".");
    //   return slug;
    // });

  };

export const getAllPosts = () => {
    getSlugs()
    // const posts = getSlugs()
    //   .map((slug) => getPostFromSlug(slug))
    //   .sort((a, b) => {
    //     if (a.meta.date > b.meta.date) return 1;
    //     if (a.meta.date < b.meta.date) return -1;
    //     return 0;
    //   })
    //   .reverse();
    // return posts;
  };
  
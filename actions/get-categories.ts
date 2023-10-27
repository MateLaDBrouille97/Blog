import { CategoryBlog } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (id: string): Promise<CategoryBlog> => {
  const res = await fetch(URL);

  return res.json();
};

export default getCategories;
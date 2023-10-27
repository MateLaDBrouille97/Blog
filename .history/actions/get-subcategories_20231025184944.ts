import { SubCategoryBlog } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/subcategories`;

const getSubCategories = async (id: string): Promise<SubCategoryBlog> => {
  const res = await fetch(URL);

  return res.json();
};

export default getSubCategories;
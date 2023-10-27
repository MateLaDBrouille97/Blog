import { Author } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/authors`;

const getAuthors = async (id: string): Promise<Author> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getAuthors;
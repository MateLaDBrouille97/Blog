import { Blogarticle } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/blogarticles`;

const getArticles = async (id: string): Promise<Blogarticle> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getArticles;
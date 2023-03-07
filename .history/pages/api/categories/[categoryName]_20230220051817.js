import blogData from "./blogDataName"

export default function handler(req, res) {
  const { categoriesName} = req.query;
  const {categories}=blogData;
  if ( categoriesName) {
    const post = Posts.find((value) => value.id == postId);
    return res.status(200).json(post);
  }
  return res.status(404).json({ error: "Data not found" });
}

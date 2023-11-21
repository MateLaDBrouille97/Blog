import prismadb from "../../lib/prismadb"; // Import your Prisma client

// eslint-disable-next-line import/no-anonymous-default-export


const getBlogArticle = async (req, res) => {
  const { BlogArticleId } = req.query;

  try {
    const blogarticle = await prismadb.blogarticle.findUnique({
      where: {
        id: BlogArticleId,
      },
      include: {
        category: true,
        subcategory: true,
        author: true,
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    res.status(200).json(blogarticle);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Article" });
  }
};

export default getBlogArticle;

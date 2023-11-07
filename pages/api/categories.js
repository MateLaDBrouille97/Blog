import prismadb from "@/lib/prismadb"; // Import your Prisma client

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  
    try {
      const categories = await prismadb.categoryBlog.findMany({
        where: {
          blogId: "53e14296-c624-473b-b844-07e6cf57df84",
        },
      });


      res.status(200).json(categories);
      return categories
      
      
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
 
};

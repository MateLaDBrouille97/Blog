import prismadb from "../../lib/prismadb"; // Import your Prisma client

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

  const { categoryId } = req.query
  

 
    try {
        const category = await prismadb.category.findUnique({
            where: {
              id: categoryId,
            },
            
          });

      res.status(200).json(category);
      
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
};

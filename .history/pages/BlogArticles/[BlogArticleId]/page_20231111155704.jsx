import { useEffect } from "react";
import prismadb from "../../../lib/prismadb";
import { useRouter } from "next/navigation";
// import { useHistory } from 'react-router-dom';


// const BlogArticleIdPage = async ({
//   params
// }: {
//   params: { BlogArticleId: string; }
// }) => {

//   console.log(params.BlogArticleId)
//   const blogarticle = await prismadb.blogarticle.findUnique({
//     where: {
//       id: params.BlogArticleId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         orderBy: {
//           position: "asc"
//         }
//       }
//     }
//   });

//   if (!blogarticle) {
//     return redirect("/");
//   }
//   // return redirect(`/BlogArticles/${blogarticle.id}`);
//   return redirect(`/BlogArticles/${blogarticle.id}/chapters/${blogarticle.chapters[0].id}`);
// }
 
// export default BlogArticleIdPage;

const BlogArticleIdPage = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const blogarticle = await prismadb.blogarticle.findUnique({
          where: {
            id: params.BlogArticleId,
          },
          include: {
            chapters: {
              where: {
                isPublished: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
          },
        });

        
      } catch (error) {
        console.error('Error fetching blog article:', error);
        // Handle error, for example, redirect to an error page
      }
    };

    fetchData();
  }, [params.BlogArticleId, history]);

  if (!blogarticle) {
   return router.push('/');
  } else {
    // Assuming there is at least one chapter
    const firstChapterId = blogarticle.chapters[0].id;
   return router.push(`/BlogArticles/${blogarticle.id}/chapters/${firstChapterId}`);
  }

  // You might want to render a loading indicator while fetching data
};

export default BlogArticleIdPage;
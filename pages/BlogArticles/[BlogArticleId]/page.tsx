import prismadb from "../../../lib/prismadb";
import { redirect } from "next/navigation";

const BlogArticleIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const blogarticle = await prismadb.blogarticle.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!blogarticle) {
    return redirect("/");
  }

  return redirect(`/BlogArticles/${blogarticle.id}/chapters/${blogarticle.chapters[0].id}`);
}
 
export default BlogArticleIdPage;
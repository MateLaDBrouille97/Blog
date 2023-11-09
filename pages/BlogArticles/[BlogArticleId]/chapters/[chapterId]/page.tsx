// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";


import { Banner } from "../../../../../components/banner";
import { Separator } from "../../../../../components/ui/separator";
import { Preview } from "../../../../../components/previews";

import { VideoPlayer } from "./_components/video-player";
import { BlogArticleEnrollButton } from "./_components/blog-enroll-button";
import { BlogArticleProgressButton } from "./_components/blog-progress-button";

const ChapterIdPage = async ({
  params
}: {
  params: { blogarticleId: string; chapterId: string }
}) => {
//   const { userId } = auth();
  
//   if (!userId) {
//     return redirect("/");
//   } 

  const {
    chapter,
    blogarticle,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    // userId,
    chapterId: params.chapterId,
    blogarticleId: params.blogarticleId,
  });

  if (!chapter || !blogarticle) {
    return redirect("/")
  }


  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return ( 
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            blogarticleId={params.blogarticleId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <BlogArticleProgressButton
                chapterId={params.chapterId}
                blogarticleId={params.blogarticleId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <BlogArticleEnrollButton
                blogarticleId={params.blogarticleId}
                price={blogarticle.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {/* {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
   );
}
 
export default ChapterIdPage;


async function getChapter({}) {
    const response = await fetch("/api/getChapter");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const articles = await response.json();
    return articles;
  }
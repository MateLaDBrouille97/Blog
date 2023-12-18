// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { useEffect, useState } from "react";
// import { Banner } from "../../../../../components/banner";
import { Separator } from "../../components/ui/separator";
import { Preview } from "../../components/previews";
import Image from "next/image";
import  VideoPlayer  from "../ChaptersBA/_components/video-player";
// import { BlogArticleEnrollButton } from "./_components/blog-enroll-button";
// import { BlogArticleProgressButton } from "./_components/blog-progress-button";
import Button from "../../components/_child/Button";



// export async function getServerSideProps(blogarticleId, chapterId) {
//   const response = await fetch(`http://localhost:3000/api/getChapter?blogarticleId=${blogarticleId}&chapterId=${chapterId}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch data in category");
//   }
//   const chapterBA = await response.json();
//   return { props: { chapterBA } }
// }


// async function getChapter(blogarticleId, chapterId) {
//   try {
//     const response = await fetch(
//       `/api/getChapter?blogarticleId=${blogarticleId}&chapterId=${chapterId}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching chapter:", error);
//     throw error;
//   }
// }

function ChapterIdPage({blogarticleId, chapterBA}) {


  const [chapterData, setChapterData] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [blogArticle, setBlogArticle] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [muxData, setMuxData] = useState(null);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getChapter(blogarticleId, chapterId);
        setChapterData( chapterBA);
        setAttachments( chapterBA?.attachments);
        
        setBlogArticle( chapterBA?.blogArticle);
        setNextChapter( chapterBA?.nextChapter);
        setMuxData( chapterBA?.muxData);
      } catch (error) {
        console.error("Error fetching chapter:", error);
        
      }
    };

    fetchData();
  }, [blogArticle,chapterBA]);


  return (
    <div className="">
      {/* {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )} */}
      {/* {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )} */}
      <div className="flex flex-col max-w-4xl mx-auto pb-20 ">
      
        {chapterData?.imageUrl ? (
          <div className="p-4">
            <Image src={chapterData?.imageUrl} alt="" width={700} height={650}  className="rounded postCol__img custom-image" />
          </div>
        ) : null}
       
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold mb-2">{chapterData?.title}</h2>
            {/* {purchase ? (
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
            )} */}
          </div>
          <Separator />
          <div>
            <Preview value={chapterData?.description} />
          </div>
          {chapterData?.videoUrl ? (
            <div className="p-4">
              <VideoPlayer
                chapterId={chapterData?.id}
                title={chapterData?.title}
                blogarticleId={blogarticleId}
                nextChapterId={chapterData?.nextChapter?.id}
                playbackId={muxData?.playbackId}
                // isLocked={isLocked}
                // completeOnEnd={completeOnEnd}
              />
            </div>
          ) : null}

          {attachments && (
            <div>
              {!!attachments?.length && (
                <>
                  <Separator />
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a
                        href={attachment?.url}
                        target="_blank"
                        key={attachment?.id}
                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                        rel="noreferrer"
                      >
                        <File />
                        <p className="line-clamp-1">{attachment?.name}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <div className="py-2 m-6">
            <Button address={chapterData?.href} text="Source" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;



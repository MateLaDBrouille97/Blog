"use client"



import { File } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../../../components/ui/separator";
import { Preview } from "../../../components/previews";
import Image from "next/image";
import VideoPlayer from "./_components/video-player";
import Button from "../../../components/_child/Button";
import Youtube from "../../../components/Youtube";
import React from "react";

// interface Attachment {
//     id: string;
//     url: string;
//     name: string;
//   }
  
//   interface MuxData {
//     playbackId: any;
//   }
  
//   interface ChapterData {
//     id: any;
//     imageUrl?: string;
//     youtubeUrl?: string;
//     title: string;
//     description: string;
//     blogarticleId:any,
//     videoUrl?: any;
//     nextChapter?: {
//       id: string;
//     };
//     href?: string;
//     attachments?: Attachment[];
//   }
  
//   interface BlogArticle {
//     price?: number;
//   }
  
//   interface ChapterBA {
//     id:any
//     attachments?: Attachment[];
//     blogArticle?: BlogArticle;
//     nextChapter?: {
//       id: string;
//     };
//     muxData?: MuxData;
//     title: string;
//     blogarticleId:any,
//     description: string;
//     imageUrl?: string;
//     youtubeUrl?: string;
//     videoUrl?: string;
//     href?: string;
//   }
  
  // interface ChapterIdPageProps {
    
  //   chapterBA: any ;
  // }


const ChapterIdPage  = ({  chapterBA }) => {
  const [chapterData, setChapterData] = useState(chapterBA);
  const [attachments, setAttachments] = useState(chapterBA?.attachments);
  // const [chapter, setChapter] = useState(null);
  const [blogArticle, setBlogArticle] = useState(chapterBA?.blogArticle);
  const [nextChapter, setNextChapter] = useState(chapterBA?.nextChapter);
  const [muxData, setMuxData] = useState(chapterBA?.muxData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getChapter(blogarticleId, chapterId);
        setChapterData(chapterBA);
        setAttachments(chapterBA?.attachments);

        setBlogArticle(chapterBA?.blogArticle);
        setNextChapter(chapterBA?.nextChapter);
        setMuxData(chapterBA?.muxData);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };

    fetchData();
  }, [blogArticle, chapterBA]);

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
            <Image
              src={chapterData?.imageUrl}
              alt=""
              width={700}
              height={650}
              className="rounded postCol__img custom-image"
            />
          </div>
        ) : null}
        <br />
        {chapterData?.youtubeUrl ? (
          <div className="p-4">
            <Youtube id={chapterData?.youtubeUrl} />
          </div>
        ) : null}
        <br />
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold mb-2">
              {chapterData?.title}
            </h2>
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
                blogarticleId={chapterData?.blogarticleId}
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
          {chapterData?.href? (<div className="py-2 m-6">
            <Button address={chapterData?.href} text="Source" />
          </div>):null}
        </div>
      </div>
    </div>
  );
}


export default ChapterIdPage;
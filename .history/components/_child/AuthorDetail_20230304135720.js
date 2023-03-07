import Image from 'next/image';
// import SocialIconLink from '../SocialIconLink/SocialIconLink';
// import bmcButton from '../../../public/images/bmc-button.png';
import React, { useEffect, useState } from "react";
import im1 from "../../public/ManuelTL2.jpg";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";


const AuthorDetails = ({ author }) => {
 
    const [image, setImage] = useState();
    const aws = require("aws-sdk");
    const s3 = new aws.S3();
   
    /* Fetch Image */
    aws.config.update({
      accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
      secretAccessKey: "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",
    });
  
    useEffect(() => {
      const fetchImage = async () => {
        const params = {
          Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
          Key: author?.avatar,
        };
        await s3
          .getSignedUrlPromise("getObject", params)
          .then((i) => setImage(i));
      };
      fetchImage();
    }, [author]);

  return (
    <div>
      <hr className="my-10 border-gray-700" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="w-36 h-36 relative rounded-full overflow-hidden">
          {image && (
            <Image
              src={image}
              width={144}
              height={144}
              alt={`${author.name} profile picture`}
            />
          )}
        </div>

        <div className="flex-1 sm:ml-5 mt-5 sm:mt-0 text-center sm:text-left">
          <h2 className="text-4xl">{author?.firstName}</h2>
{/* 
          <div className="flex flex-row my-3 justify-center sm:justify-start">
            <SocialIconLink type="Twitter" url={author.Twitter} />
            <SocialIconLink type="LinkedIn" url={author.LinkedIn} />
            <SocialIconLink type="Github" url={author.Github} />
            <SocialIconLink type="Facebook" url={author.Facebook} />
            <SocialIconLink type="Instagram" url={author.Instagram} />
            <SocialIconLink type="Youtube" url={author.Youtube} />
          </div> */}

          <p
            className="text-gray-400"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: author?.description.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            }}
          />

          {/* {author.buyMeACoffee && (
            <>
              <p className="mt-5 mb-2 font-semibold">
                If you want to support me personally, you can
              </p>
              <a href={author.buyMeACoffee} target="_blank" rel="noreferrer">
                <Image width={218} src={bmcButton} alt="Buy me a coffee" />
              </a>
            </>
          )} */}
        </div>
      </div>

      <hr className="my-10 border-gray-700" />
    </div>
  );
};

export default AuthorDetails;
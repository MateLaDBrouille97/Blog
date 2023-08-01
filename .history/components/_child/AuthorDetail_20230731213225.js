import Image from 'next/image';
// import SocialIconLink from '../SocialIconLink/SocialIconLink';
// import bmcButton from '../../../public/images/bmc-button.png';
import React, { useEffect, useState } from "react";
import SocialIconLink from './SocialIconLink';
import bmc from "../../public/bmc-button.png";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    InstagramShareButton,
  } from "react-share";
  
  import {
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,

  } from "react-share";

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
    <div className='lg:w-4/6 md:w-5.5/6'>
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

          <div className="flex flex-row my-3 justify-center sm:justify-start">
            <SocialIconLink instagram={author?.instagram} github={author?.github} facebook={author?.facebook} twitter={author?.twitter} linkedIn={author?.linkedIn} telegram={author?.telegram}/>
          {/* <ul className="icons-share">
              <FacebookShareButton
                // url={href}
                className="social__link-share"
              >
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>

              <LinkedinShareButton
                // url={href}
                className="social__link-share"
              >
                <LinkedinIcon size={30} round={true} />
              </LinkedinShareButton>
              <TwitterShareButton
                // url={href}
                className="social__link-share"
              >
                <TwitterIcon size={30} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                // url={href}
                className="social__link-share"
              >
                <WhatsappIcon size={30} round={true} />
              </WhatsappShareButton>
              <TelegramShareButton
                url="http://localhost:3000/"
                className="social__link-share"
              >
                <TelegramIcon size={30} round={true} />
              </TelegramShareButton>
            </ul> */}
          </div>

          <p
            className="text-gray-400"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: author?.description.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            }}
          />

          {author?.buyMeACoffee && (
            <>
              <p className="mt-5 mb-2 font-semibold">
                If you want to support me personally, you can
              </p>
              <a href={author?.buyMeACoffee} target="_blank" rel="noreferrer" className='author_detail'>
                <Image width={218} src={bmc}  alt="Buy me a coffee" />
              </a>
            </>
          )}
          <>
          
          </>
        </div>
      </div>

      <hr className="my-10 border-gray-700" />
    </div>
  );
};

export default AuthorDetails;
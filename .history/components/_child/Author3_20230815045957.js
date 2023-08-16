import React, { useEffect, useState } from "react";
import Image from "next/image";
import im1 from "../../public/ManuelTL2.jpg";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";

export default function Author3({ author }) {
  
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
    <div className="author flex py-2">
      {/* <Image
        className="rounded-full "
        alt=""
        src={image}
        width={50}
        height={50}
      /> */}
      <div className="flex flex-col justify-center">
        
       by <Link href="/" legacyBehavior>
          <a className="text-md flex justify-begin font-bold text-gray-800 hover:text-gray-600">
           {author?.firstName}
          </a>
        </Link>
        <span className="text-sm text-gray-500">
          {author?.title?.[1] ? author?.title?.[1] : author?.title?.[0]}
        </span>
      </div>
    </div>
  );
}

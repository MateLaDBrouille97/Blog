import React, { useEffect, useState } from "react";

import Link from "next/link";


export default function Author2({ author }) {
  
  const [image, setImage] = useState();
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
 
  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DIDZCALTUA",
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
  }, [author, s3]);

  return (
    <div className="author flex  py-3">
      {/* <Image
        className="rounded-full "
        alt=""
        src={image}
        width={50}
        height={50}
      /> */}
      <div className="flex flex-col justify-center px-4 ">
        <Link href="/" legacyBehavior>
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

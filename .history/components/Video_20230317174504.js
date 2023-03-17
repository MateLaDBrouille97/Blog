import { useState,useEffect } from "react";
import React  from "react";

export default function Video({ video }) {

  const [video1, setVideo1] = useState();
  const aws = require("aws-sdk");
  const s3 = new aws.S3();

  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    secretAccessKey: "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",
  });

  useEffect(() => {
    const fetchVideo = async () => {
      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: video,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) =>  setVideo1(i));
    };
    fetchVideo();
  }, [video]);

  return (
    <div className="container__youtube">
      <video 
       controls
       autoPlay
       className="frame"
       src={video1}
      />
        {/* <source  type="video/mp4" /> */}
      {/* </video> */}
    </div>
  );
}
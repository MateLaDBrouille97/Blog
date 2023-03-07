import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import im1 from "../../public/ManuelTL2.jpg";
import Link from 'next/link';
import { useUserContext } from '@/contexts/UserContext';

export default function Author({author}) {


  const [image, setImage] = useState();
  const [user,setUser]=useState();
  const { dbUser } = useUserContext();
  const s3 = new aws.S3();
  const aws = require("aws-sdk");
  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    secretAccessKey: "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",
  });

  useEffect(()=>{
   
    setUser(dbUser);
  },[dbUser])

  useEffect(() => {
    const fetchImage = async () => {
      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: dbUser?.image,
      };
      await s3.getSignedUrlPromise("getObject", params).then((i) => setImage(i));
    };
    fetchImage();
  }, [dbUser]);

  return (
    <div className='author flex py-5'>
         <Image   
         className='rounded-full'     
          alt=""
          src={image}
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center px-4 ">
          <Link href="/" legacyBehavior>
            <a className='text-md font-bold text-gray-800 hover:text-gray-600'>
               {dbUser?.firstName}
            </a>
          </Link>
          <span className='text-sm text-gray-500'>{dbUser?.title?.[1]?dbUser?.title?.[1]:dbUser?.title?.[0]}</span>
        </div>
    </div>
  )
}

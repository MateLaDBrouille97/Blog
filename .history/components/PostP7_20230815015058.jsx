import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import Error from "./_child/Error";
import Spinner from "./_child/Spinner";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";
import Author2 from "./_child/Author2";

export default function PostP7({ post }) {
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    const convertAwsDateToDate = (awsDate) => {
      const year = awsDate.substring(0, 4);
      const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
      const day = awsDate.substring(8, 10);
      const newDate = new Date(year, month, day).toLocaleDateString();
      setDate(newDate);
    };
    convertAwsDateToDate(post?.createdAt);
  }, [post]);

  useEffect(() => {
    const fetchUser = async () => {
      await DataStore.query(User, (user) => user.id.eq(post?.userID)).then(
        (user) => setUser(user[0])
      );
    };
    fetchUser();
  }, []);

  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    secretAccessKey: "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",
  });

  useEffect(() => {
    const fetchImage = async () => {
      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: post?.image,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setPostImage(i));
    };
    fetchImage();
  }, [dbUser]);

  return (
    <>
      <div class="container2 grid">
        <div class="col-div-6">
          <div class="box-1">
            <div className="image flex flex-col justify-start custom-image-wrapper3">
              <Link href={`/Posts/${post?.[0]?.slug}`} legacyBehavior>
                <a className="postCol__img">
                  {postImage && (
                    <Image
                      src={postImage || ""}
                      alt=""
                      width={600}
                      height={500}
                      className=" rounded postCol__img custom-image3 b-img"
                    />
                  )}
                </a>
              </Link>
            </div>

            <div className="info flex justify-center flex-col py-4">
              <div className="cat flex gap-3 mb-4 ">
                <Link
                  href={`/Categories/${
                    post?.category == "OPINIONS" ? "NEWS" : post?.category
                  }`}
                  legacyBehavior
                >
                  <a className="text-orange-600 hover:text-orange-800 ">
                    {post?.category || "UnKnown"}
                  </a>
                </Link>
                <Link href="/" legacyBehavior>
                  <a className="text-gray-600 hover:text-gray-800 ">
                    {date || "UnKnown"}
                  </a>
                </Link>
              </div>
              <div className="title mb-2  text">
                <Link href={`/Posts/${post?.slug}`} legacyBehavior>
                  <a className=" postCol__title text-xl font-bold text-gray-800 hover:text-gray-600  ">
                    {post?.title}
                  </a>
                </Link>
                <hr className=" line-under" />
              </div>
              {/* <div className="description">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="postCol__description text-m  text-gray-800 hover:text-gray-600 mt-10">
              {post?.description}
              </a>
            </Link>
          </div> */}
              {user ? <Author2 author={user} /> : <></>}
            </div>
          </div>
        </div>
        <div class="col-div-6">
          <div class="lr-box">
            <div class="col-div-6">
              <h3 class="heading1">Food</h3>
              <p class="blog-heading-1">Good Food Good Health</p>
              <p class="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
              </p>
              <span class="name">Manoj Singh . SEP 21, 2021</span>
            </div>
            <div class="col-div-6"></div>
            <div class="clearfix"></div>
          </div>

          <div class="lr-box">
            <div class="col-div-6">
              <h3 class="heading1">Technology</h3>
              <p class="blog-heading-1">Looking for tech blogs</p>
              <p class="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
              </p>
              <span class="name">Manoj Singh . SEP 21, 2021</span>
            </div>
            <div class="col-div-6"></div>
            <div class="clearfix"></div>
          </div>

          <div class="lr-box">
            <div class="col-div-6">
              <h3 class="heading1">Food</h3>
              <p class="blog-heading-1">Good Food Good Health</p>
              <p class="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
              </p>
              <span class="name">Manoj Singh . SEP 21, 2021</span>
            </div>
            <div class="col-div-6"></div>
            <div class="clearfix"></div>
          </div>
        </div>

        <div class="clearfix"></div>
      </div>

      <div className="container2">
        <div>Latest stories</div>

        <div className="box-2">
          <div className="image flex flex-col justify-start custom-image-wrapper3">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="postCol__img">
                {postImage && (
                  <Image
                    src={postImage || ""}
                    alt=""
                    width={300}
                    height={250}
                    className=" rounded postCol__img custom-image3 b-img"
                  />
                )}
              </a>
            </Link>
          </div>
          <div className="heading1">Entertainment</div>
          <p className="blog-heading-1">Entertainment good for health</p>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
          </p>
          <span className="name">Manoj Singh . SEP 21, 2021</span>
        </div>

        <div className="box-2">
          <div className="image flex flex-col justify-start custom-image-wrapper3"></div>
          <div className="heading1">Animals</div>
          <p className="blog-heading-1">Good Food Good Health</p>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
          </p>
          <span className="name">Manoj Singh . SEP 21, 2021</span>
        </div>

        <div className="box-2">
          <div className="image flex flex-col justify-start custom-image-wrapper3"></div>
          <div className="heading1">Photograpy</div>
          <p className="blog-heading-1">Good Food Good Health</p>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
          </p>
          <span className="name">Manoj Singh . SEP 21, 2021</span>
        </div>

        <div className="clearfix"></div>

        <div className="box-2">
          <div className="image flex flex-col justify-start custom-image-wrapper3"></div>
          <div className="heading1">Fun</div>
          <p className="blog-heading-1">Good Food Good Health</p>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
          </p>
          <span className="name">Manoj Singh . SEP 21, 2021</span>
        </div>

        <div className="box-2">
          <div className="image flex flex-col justify-start custom-image-wrapper3"></div>
          <div className="heading1">Food</div>
          <p className="blog-heading-1">Good Food Good Health</p>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
          </p>
          <span className="name">Manoj Singh . SEP 21, 2021</span>
        </div>

        <div className="box-2">
          <div className="image flex flex-col justify-start custom-image-wrapper3"></div>
          <div className="heading1">Food</div>
          <p className="blog-heading-1">Good Food Good Health</p>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
          </p>
          <span className="name">Manoj Singh . SEP 21, 2021</span>
        </div>

        <div className="clearfix"></div>
      </div>
    </>
  );
}

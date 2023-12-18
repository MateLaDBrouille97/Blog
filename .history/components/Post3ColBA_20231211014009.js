import Author from "./_child/Author";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// import { useUserContext } from "../contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "../src/models";
import Spinner from "./_child/Spinner";
import Like3 from "./Like3";
import {  getUser} from "../src/graphql/queries"
import { API, graphqlOperation } from 'aws-amplify';

export default function Post3colBA({ postBA }) {
   
    const [user, setUser] = useState([]);
    const [user2, setUser2] = useState(null);
   
    useEffect(() => {
      const fetchUser = async () => {
        await DataStore.query(User, (user) => user.email.eq(postBA?.author?.email)).then(
          (user) => setUser(user[0])
        );
      };
      fetchUser();
    }, [postBA]);

    const formatDate = (createdAt) => {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return new Date(createdAt).toLocaleDateString(undefined, options);
    };
  
    console.log(postBA)
  
    return (
      <div className="item postCol3-container ">
        <div className='custom-image-wrapper'>
          <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
            <a className="postCol__img">
              {!postBA?.imageUrl ? (
                <Spinner />
              ) : (
                <Image
                  src={postBA?.imageUrl || "/"}
                  alt=""
                  width={350}
                  height={200}
                  className="rounded postCol__img custom-image"
                />
              )}
            </a>
          </Link>
        </div>
        <div className="info flex justify-center flex-col py-4">
          <div className="cat flex gap-6 pt-2 pb-2">
            <Link
              href={`/Categories/${
                postBA?.category?.name == "OPINIONS"|| postBA?.category?.name =="ANALYSIS"|| postBA?.category?.name =="GEOPOL" ? "NEWS" : postBA?.category?.name
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800">
                {postBA?.category?.name || "UnKnown"}
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800">
              {postBA?.createdAt ? `${formatDate(postBA.createdAt)}` : "UnKnown"}
              </a>
            </Link>
          </div>
          <div className="title post3col-title">
            <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
              <a className="text-3xl font-bold text-gray-800 hover:text-gray-600 ">
                {postBA?.title}
              </a>
            </Link>
          </div>
          <div className="postCol3-description">
            <p className="text-gray-500 py-3 ">{postBA?.description}</p>
          </div>
          <div>
            {user ? <Author author={user} /> : <></>}
            <div className="slide__end-bar">
              <Like3 id={postBA?.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
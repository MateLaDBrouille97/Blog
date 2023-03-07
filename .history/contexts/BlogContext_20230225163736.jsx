import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Category, PortfolioPost ,BlogPost} from "../src/models";
import { useUserContext } from "./UserContext";
import React from 'react';

const userId="6a4ad658-8482-4df0-a5a1-4e8d757782f2"

const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {

    const{dbUser}=useUserContext();

    const[blogUFH,setBlogUFH]=useState([]);
    const[blogP,setBlogP]=useState([]);
    const[blogN,setBlogN]=useState([]);
    const[categories,setCategories]=useState([]);
    const [data,setData]= useState([]);

    useEffect(()=>{
        const fetchPort= async () => {
          await DataStore.query(BlogPost,u=>u.userID.eq(userId)).then(ports=>setData(ports));
          data.filter(d=>d?.category=="USEFULHACKS").then(port=>setBlogUFH(port));


          // await DataStore.query(BlogPost,p=>p.category.eq("USEFULHACKS")).then(port=>setBlogUFH(port));
          await DataStore.query(BlogPost,p=>p.category.eq("PROJECTS")).then(port=>setBlogP(port));
          await DataStore.query(BlogPost,p=>p.category.eq("NEWS")).then(port=>setBlogN(port));
          

        }
        fetchPort();
    },[dbUser])

    console.log(blogUFH)

    useEffect(()=>{
      getCategories();
    },[dbUser])

    const getCategories= async ()=>{
      await DataStore.query(Category).then(cats=>setCategories(cats));
    }

   

    
    
 return (
    <BlogContext.Provider 
       value={{
        categories,
        getCategories,
        blogUFH,
        blogP,
        blogN,
        data,
        setBlogUFH,
        setBlogP,
        setBlogN,
        setData
         }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

export const useBlogContext = () => useContext(BlogContext);
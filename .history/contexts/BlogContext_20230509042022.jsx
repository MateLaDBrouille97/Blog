import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Category,BlogPost} from "../src/models";
import { useUserContext } from "./UserContext";
import React from 'react';



const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {

    const{dbUser}=useUserContext();

    const[blogUFH,setBlogUFH]=useState([]);
    const[blogP,setBlogP]=useState([]);
    const[blogN,setBlogN]=useState([]);
    const[blogO,setBlogO]=useState([]);
    const[categories,setCategories]=useState([]);
    const [data,setData]= useState([]);
    const[tools,setTools]=useState([]);

    useEffect(()=>{
        const fetchPort= async () => {
          await DataStore.query(BlogPost,u=>u.userID.eq(dbUser?.id)).then(ports=>setData(ports));
          const blog1 =data.filter(d=>d?.category=="USEFULHACKS");setBlogUFH(blog1);
          const blog2 =data.filter(d=>d?.category=="PROJECTS");setBlogP(blog2);
          const blog3 =data.filter(d=>d?.category=="NEWS");setBlogN(blog3);
          const blog4 =data.filter(d=>d?.category=="OPINIONS");setBlogO(blog4);
          const blog5 =data.filter(d=>d?.category=="TOOLS");setTools(blog5);
          // await DataStore.query(BlogPost,p=>p.category.eq("USEFULHACKS")).then(port=>setBlogUFH(port));
          // await DataStore.query(BlogPost,p=>p.category.eq("PROJECTS")).then(port=>setBlogP(port));
          // await DataStore.query(BlogPost,p=>p.category.eq("NEWS")).then(port=>setBlogN(port));
        }
        fetchPort();
    },[dbUser,categories])



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
        blogO,
        data,
        tools,
        setBlogUFH,
        setBlogP,
        setBlogN,
        setData,
        setBlogO,
        setTools,
         }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

export const useBlogContext = () => useContext(BlogContext);
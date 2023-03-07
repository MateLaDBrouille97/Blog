import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Caetegory, PortfolioPost } from "../src/models";
import { useUserContext } from "./UserContext";
import React from 'react';

const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {

    const{dbUser}=useUserContext();

    const[portfolioApp,setPortfolioApp]=useState([]);
    const[portfolioWeb,setPortfolioWeb]=useState([]);
    const[portfolioSci,setPortfolioSci]=useState([]);
    const[categories,setCategories]=useState([]);
    const [data,setData]= useState([]);

    useEffect(()=>{
        const fetchPort= async () => {
         await DataStore.query(PortfolioPost,p=>p.type.eq("APP")).then(port=>setPortfolioApp(port));
          await DataStore.query(PortfolioPost,p=>p.type.eq("WEB")).then(port=>setPortfolioWeb(port));
          await DataStore.query(PortfolioPost,p=>p.type.eq("SCIENCE")).then(port=>setPortfolioSci(port));
          await DataStore.query(PortfolioPost).then(ports=>setData(ports));
        }
        fetchPort();
    },[dbUser])

    const getCategories= async ()=>{
      const cats=await DataStore.query(Caetegory).then(cats=>setCategories(cats));
      return{
        cats,
      }
    }

    console.log(categories)
 return (
    <BlogContext.Provider 
       value={{
        portfolioApp,
        portfolioWeb,
        setPortfolioApp,
        setPortfolioWeb,
        portfolioSci,
        setPortfolioSci,
        data,
        setData,
        categories,
        getCategories }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

export const useBlogContext = () => useContext(BlogContext);
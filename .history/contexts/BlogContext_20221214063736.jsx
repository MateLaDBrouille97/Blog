import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { PortfolioPost } from "../src/models";
import { useUserContext } from "./UserContext";
import React from 'react';

const PortfolioContext = createContext({});

const PortfolioContextProvider = ({ children }) => {

    const{dbUser}=useUserContext();

    const[portfolioApp,setPortfolioApp]=useState([]);
    const[portfolioWeb,setPortfolioWeb]=useState([]);
    const[portfolioSci,setPortfolioSci]=useState([]);
    const [data,setData]= useState([]);

    useEffect(()=>{
        const fetchPort= () => {
          DataStore.query(PortfolioPost,p=>p.type.eq("APP")).then(port=>setPortfolioApp(port));
          DataStore.query(PortfolioPost,p=>p.type.eq("WEB")).then(port=>setPortfolioWeb(port));
          DataStore.query(PortfolioPost,p=>p.type.eq("SCIENCE")).then(port=>setPortfolioSci(port));
          DataStore.query(PortfolioPost).then(ports=>setData(ports));
        }
        fetchPort();
    },[dbUser])

    

 return (
    <PortfolioContext.Provider 
       value={{
        portfolioApp,
        portfolioWeb,
        setPortfolioApp,
        setPortfolioWeb,
        portfolioSci,
        setPortfolioSci,
        data,
        setData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;

export const usePortfolioContext = () => useContext(PortfolioContext);
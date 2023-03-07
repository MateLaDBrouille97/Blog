import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../src/models";
import React from 'react';

const UserContext = createContext({});

const aws = require('aws-sdk');

const UserContextProvider = ({ children }) => {
  
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    
    const sub = authUser?.attributes?.sub;
    const nameU=authUser?.attributes?.name;
   
    useEffect( () => {   
       Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
       
    }, []);

    
    // Ici on va chercher l'utilisateur qui utilise l'appli
    useEffect(  () => {
       const fetchUser =()=>
          {  
            DataStore.query(User).then((users) =>
            setDbUser(users[0])
           );
          }
           fetchUser();
      }
  , []);

  
  const [image,setImage]=useState();
  const [cv,setCV]= useState(null);
  const s3 = new aws.S3();


/* Fetch Image */
  aws.config.update({
    accessKeyId: 'AKIAQK7EQ4DINBSQQM5L',
    secretAccessKey: "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"
  });

 useEffect(()=>{
  const fetchImage=async()=>{
    const params = {
      Bucket: 'portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging',
      Key: dbUser?.image,
    };
    await s3.getSignedUrlPromise('getObject', params).then((i)=>setImage(i));
  }
 fetchImage();
 },[dbUser])

 
 useEffect(()=>{
  const fetchCV = async()=>{
    const params = {
      Bucket: 'portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging',
      Key: dbUser?.CV,
    };
    await s3.getSignedUrlPromise('getObject', params).then((cv)=>setCV(cv));  
    
  }
 fetchCV();
 },[dbUser])

 

//Ici on check les restaurants et on va chercher le restaurant d'interet en fonction de l'utilisateur (adminSub) 
//On va chercher le restaurant d'interet des que le sub change c'est pourquoi ici 
/**
 * useEffect(()=>{},[sub])
 */



  return (
    <UserContext.Provider value={{ dbUser,image,cv }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);



/**
 Pour creer un context que l'on va pouvoir utiliser dans toute l'application 

 I-Creation Context 

 1- Importer createContext from 'react'
 2- Creation context : const OrderContext = createContext({}); ==>Ici on a une destructuration dans createContext({})
 3- Definition du context avec une fonction : const OrderContextProvider =({children})=>{} cette fonction aura des parametres qui sont les children
 4- Appel du context dans un element de return <OrderContext.provider value= {parametres attendus}> {children} </OrderContext.provider>
 5- Lors de la definition du context on definit tous les parametres qui seront ultimement utilises comme les children dans le cas  ci dessus on cherche a obtenir tous ce qui est apparente au order 
       ==> On va fetch l'order, les plats lies a un order specifique et on peut aussi ajouter des fonctions specifiques au Order 

 II-Utilisation du context 
  
 Pour donner acces au context ou on veut dans l'application (les differents Screens) il faut wrapper l'application dans le context 

  Dans App.js 
  1- On utilse un Hook export const useOrderContext = () => useContext(OrderContext); ==> Exporter le context (dernier ligne de code ici)
  2- importer contextProvider 
  3- <contextProvider> <App/> </contextProvider>
 */
import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../src/models";
import React from "react";
import {  getUser} from "../src/graphql/queries"
import { API, graphqlOperation } from 'aws-amplify';


const UserContext = createContext({});

const aws = require("aws-sdk");

const UserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const userId="c2a3d3c4-78ac-41ee-bd4f-c38c48fb6d68"
  const s3 = new aws.S3();
  const sub = authUser?.attributes?.sub;
  const nameU = authUser?.attributes?.name;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  // Ici on va chercher l'utilisateur qui utilise l'appli
  useEffect(() => {
    const fetchUser = async () => {
      const user = await API.graphql({
        query: getUser,
        variables: { id: userId }
      });
     setDbUser(user.data?.getUser)
  
    };
    fetchUser();
  }, []);


  const [image, setImage] = useState();
  const [avatar, setAvatar] = useState();
  const [cv, setCV] = useState(null);


  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIA3PIVPEUBT5DCEEPV",
    secretAccessKey: "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",
    region: 'us-east-2',
  });

  useEffect(() => {
    const fetchImage = async () => {
      const params = {
        Bucket: "portfolio-manulab-storage-878e139522942-staging",
        Key: dbUser?.image,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setImage(i));
    };
    fetchImage();
  }, [dbUser, s3]);

  useEffect(() => {
    const fetchAvatar = async () => {
      const params = {
        Bucket: "portfolio-manulab-storage-878e139522942-staging",
        Key: dbUser?.avatar,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setAvatar(i));
    };
    fetchAvatar();
  }, [dbUser, s3]);

 

  useEffect(() => {
    const fetchCV = async () => {
      const params = {
        Bucket: "portfolio-manulab-storage-878e139522942-staging",
        Key: dbUser?.CV,
      };
      await s3.getSignedUrlPromise("getObject", params).then((cv) => setCV(cv));
    };
    fetchCV();
  }, [dbUser, s3]);

  //Ici on check les restaurants et on va chercher le restaurant d'interet en fonction de l'utilisateur (adminSub)
  //On va chercher le restaurant d'interet des que le sub change c'est pourquoi ici
  /**
   * useEffect(()=>{},[sub])
   */

  

  return (
    <UserContext.Provider value={{ dbUser, image, cv, avatar }}>
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

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://blog2-mateladbrouille97.vercel.app";

//checks to see if its hosted on another website or localhost:1337 (strapi)

export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://127.0.0.1:3000";
// "https://main.d6iszn1o7sirg.amplifyapp.com" ||
 

export const PER_PAGE = 5; //global const for number of events per page
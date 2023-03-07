import useSWR from 'swr';


const baseUrl= "http://localhost:3000/api/posts";

const response = (...args) => fetch(...args).then(res => res.json());

export default function fetcher (){
  const {data, error}= useSWR();
}
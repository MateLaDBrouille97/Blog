import useSWR from 'swr';

const baseUrl= process.env.baseURL;

const response = (...args) => fetch(...args).then(res => res.json());

export default function fetcher (){
  const {data, error}= useSWR;
}
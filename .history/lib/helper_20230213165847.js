//Api post end point 

const baseUrl= "http://localhost:3000/api/posts";

export default async function getPost ()  {
    const res =await fetch(`${baseUrl}`);
    const posts= await res.json();
    return posts;
}

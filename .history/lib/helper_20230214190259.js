//Api post end point 

const baseUrl= "http://localhost:3000/api/posts";

export default async function getPost (id)  {
    const res =await fetch(`${baseUrl}`);
    const posts= await res.json();
    console.log(posts)
    if(id){
        return posts.find(value=>value.id==id)
    }
    return posts;
}

import blogData from "./blogDataName"

export default function handler (req,res){
 const {BlogName}=blogData;
 if (BlogName)
 {return res.status(200).json(BlogName)
}
return res.status(404).json({error:"Data not found"})
} 
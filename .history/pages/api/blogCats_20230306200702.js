import blogData from "../../public/blogDataName"

export default function handler (req,res){
 const {categoriesName}=blogData;
 if (categoriesName)
 {return res.status(200).json(categoriesName)
}
return res.status(404).json({error:"Data not found"})
} 
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Loading from "./loading"
export default function SearchedPosts(){
const {postResult , loading} = useSelector((state : any)  => state.search)
console.log('posts result is :' , postResult)
    const router = useRouter()
    return <div>{loading ? <Loading/>:<div className="w-full">
        {postResult.map((post    , index)=>{
return  <div key={index} className="w-full flex justify-start px-2">
            <div className="px-2 justify-between w-full mt-2 items-center flex">
                <div className="flex gap-2 items-center justify-center">
                    <div className="h-10 w-10 bg-[#1d1d1d] flex items-center justify-center">
                    <Image src={post?.images[0]} height={100} width={100}  alt="preview" className="h-9 w-fit rounded-[2px] object-cover"/></div>
                    <h6>{post?.name}</h6>
                </div>
                
                 </div>
        </div>
        })}
       
    </div>}</div>
}
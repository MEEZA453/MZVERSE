import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsOfAsset } from "../store/actions/attach";
import PostCard from "./PostCard";
import Loading from "./loading";

export default function Useages({assetId , token}){
    const dispatch  = useDispatch<AppDispatch>();
    const {postsOfAsset , loading} = useSelector((state:any)=>state.attach)
    console.log(postsOfAsset)
    useEffect(()=>{
        dispatch(getPostsOfAsset(assetId , token))
    } , [dispatch])
    return <div>
         {   !loading ? <div>{postsOfAsset?.length > 0 ?<div className='lg:grid-cols-5 lg:gap-5 gap-2  mt-10 grid-cols-2 grid'>
        {postsOfAsset.map((post , index)=>{
            return <div key={index}>{<PostCard  post={post}/>}</div>
        })}
        </div>:<p className="mt-10">No usages</p>}</div>: <div className="w-full h-[100vh]"> <Loading/></div>}
    </div>
}
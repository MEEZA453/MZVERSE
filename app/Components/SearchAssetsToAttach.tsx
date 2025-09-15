import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Loading from "./loading"
import { useEffect, useState } from "react"
import { attachAsset, getAssetsOfPost, getPostsOfAsset } from "../store/actions/attach"
import { useAuth } from "../Context/AuthContext"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { getAsset } from "node:sea"
import SearchedAssetsCard from "./SearchedAssetCard"
export default function SearchedAssetsToAttach({postId}){
    const router = useRouter()
 const {assetResult , loading} = useSelector((state : any)  => state.search)
 const {assetsOfPost , postsOfAsset} = useSelector((state : any)=> state.attach)
 console.log('assets of posts is ' ,assetsOfPost)
 console.log('posts  of assets  is ' ,postsOfAsset)

 const {token}  = useAuth()
 const dispatch = useDispatch<AppDispatch>()
console.log(assetResult)

useEffect(()=>{
      dispatch(getAssetsOfPost(postId , token))
},[dispatch , token])


    return <div>{loading ?<div className="-translate-x-2"><Loading/></div>:<div className="w-full">

        {assetResult?.results?.map((asset , index)=>{
            const isAttached  = assetsOfPost.some((f: any) => f._id === asset._id);

            return        <div key={index} className="w-full">
            <SearchedAssetsCard asset ={asset} isAttached = {isAttached} postId = {postId}/>
            </div>
        })}
        
    </div>}</div>
}
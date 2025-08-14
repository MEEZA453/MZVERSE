'use client'
import PostCard from "./PostCard";
import Loading from '../Components/loading'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
export default function PosterOfTheDay(){
    const dispatch = useDispatch<AppDispatch>()
    const {posts , loading} = useSelector((state : any)=> state.posts)
    const {token} = useAuth()
    useEffect(()=>{
     dispatch(getPostsAction())   
    } ,[dispatch ])
    return <div className="flex my-2 py-2 w-screen overflow-y-scroll ">
     {   !loading ? <div className='flex gap-2'>
        {posts?.map((post:any, index:number) => (
          <div key={index}>
  <PostCard post = {post}/>
  </div>
        ))}
      </div> : <Loading/>}
    </div>
}
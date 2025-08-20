'use client'
import PostCard from "./PostCard";
import Loading from '../Components/loading'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getHighlight } from "../store/actions/Highlight";
export default function PosterOfTheDay(){
    const dispatch = useDispatch<AppDispatch>()

    const {token} = useAuth()
      useEffect(() => {
     
       if (token) {
         dispatch(getHighlight(token));
       }
     }, [dispatch , token]);
   
     const {highlight , loading} = useSelector((state: any) => state.highlight)
     const reoderedHighlight = [...highlight].reverse()
    return <div className="flex my-2 py-2 hide-scrollbar w-screen overflow-y-scroll ">
      
     {   !loading ? <div className='flex gap-2 lg:gap-4'>
        {reoderedHighlight?.map((post:any, index:number) => (
          <div key={index}>
  <PostCard post = {post}/>
  </div>
        ))}
      </div> : <Loading/>}
    </div>
}
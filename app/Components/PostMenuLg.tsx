'use client'
import { MdDelete } from "react-icons/md";
import {useState , useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { deletePostAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
 import {motion} from 'framer-motion'
import { useRouter } from "next/navigation";
import { addToFavorites, removeFromFavorites } from "../store/actions/fav";
export default function PostMenuLg({ setIsMenu , postId , token  ,isAuthor , role}){
  const [highlighted , setHighlight] = useState(false)
  const [promoted , setPromoted] = useState(false)
const { favourites } = useSelector((state: any) => state.favourites);

// Check if the post is already in favorites
const isFavorited = favourites.some((item: any) => item._id === postId);

const [isMobile , setIsMobile] = useState(false)
useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])


const addToMoodBoard = () => {
  if (!token) return;

  if (isFavorited) {
    dispatch(removeFromFavorites(postId, token));
  } else {
    dispatch(addToFavorites(postId, token));
  }
};



const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deletePostAction(postId , token))
router.back()
}
    return  <div className="h-screen w-screen">
        <div className="h-screen w-screen fixed top-0 left-0 z-[700] " onClick  = {()=>setIsMenu(false)}></div>
      <div className="bg-[#0d0d0d]  absolute w-60 top-16 left-[2vw] h-fit  z-900 bottom-1.5 py-3   flex  flex-col items-center justify-center  rounded-[6px]  ">
  <button
      onClick={addToMoodBoard }
      className ="text-white text-[15px]  px-5 py-1  w-full lg:text-left gap-1"
    >
    {!isFavorited ? 'Add to moodboard':'Remove from moodboard'}
    </button>



{ (isAuthor || role === 'dev') && <button
      onClick={()=>handleDeleteClick()}
      className="text-red-500 w-full text-[15px] px-5 py-1  w-full lg:text-left  gap-1"
    >
      Delete post 
    </button>
    }

    </div>
      </div>
}
'use client'
import { MdDelete } from "react-icons/md";
import {useState , useEffect} from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deletePostAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
 import {motion} from 'framer-motion'
import { useRouter } from "next/navigation";
import { addToFavorites, removeFromFavorites } from "../store/actions/fav";
export default function PostMenu({ setIsMenu , postId , token  ,isAuthor}){
const [moodboard , setMoodboard ] = useState(true)
   const addToMoodBoard = ()=>{
    console.log('cliecked')
    setMoodboard(!moodboard )
  console.log(moodboard)
      if (!token) return;
   if (!token) return;
  
      if (moodboard) {
        dispatch(removeFromFavorites(postId, token));
      } else {
        dispatch(addToFavorites(postId, token));
      }

  }
const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deletePostAction(postId , token))
}
    return  <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen z-[999] fixed left-0 bottom-0 bg-black/50">
      <div onClick={()=>setIsMenu(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y : 160}} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y : 160}} animate = {{y : 0}}  className="bg-[#0d0d0d] fixed  z-200 bottom-1.5 py-4 -translate-x-1/2 left-1/2  flex  flex-col items-center justify-center  w-[96%] rounded-[6px]  ">
  <button
      onClick={addToMoodBoard }
      className ="text-white text-[14px]  px-3 py-1 flex items-center justify-center gap-1"
    >
    {moodboard ? 'Add to moodboard':'Remove from moodboard'}
    </button>
 {isAuthor&& <button
      onClick={()=>handleDeleteClick()}
      className="text-white text-[14px]  px-3 py-1 flex items-center justify-center gap-1"
    >
      Edit post
    </button>}
{ isAuthor && <button
      onClick={()=>handleDeleteClick()}
      className="text-red-500 w-full text-[14px] px-3 py-1 flex items-center justify-center gap-1"
    >
      Delete post 
    </button>
    }
    </motion.div>
      </motion.div>
}
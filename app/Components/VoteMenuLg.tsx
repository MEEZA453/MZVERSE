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
import { removeFromHighlight  ,   addToHighlight } from "../store/actions/Highlight";
import { addToPromotion, removeFromPromotion } from "../store/actions/Promotion";
export default function VoteMenuLg({ setVoteMenu , postId , token  ,isAuthor , role}){
  const [highlighted , setHighlight] = useState(false)
  const [promoted , setPromoted] = useState(false)
const { favourites } = useSelector((state: any) => state.favourites);

// Check if the post is already in favorites
const isFavorited = favourites.some((item: any) => item._id === postId);


const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deletePostAction(postId , token))
router.back()
}
    return  <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen z-[999] fixed left-0 bottom-0 flex items-center justify-center bg-black/50">
      <div onClick={()=>setVoteMenu(false)} className="w-screen h-screen absolute "></div>
      <motion.div  initial = {{y : 50, opacity : 0 }} transition = {{duration : 0.2 , ease : "easeInOut"} } exit={{y : 50, opacity : 0}} animate = {{y : 0 , opacity :1}}  className="bg-[#151515]   w-100  h-fit  z-200  py-4 gap-1  flex  flex-col items-center justify-center  rounded-[4px]  ">


 {/* {isAuthor&& <button
      onClick={()=>handleDeleteClick()}
      className="text-white text-[14px]  px-3 py-1 flex items-center justify-center gap-1"
    >
      Edit post
    </button>}

     */}
      <button

      className="  text-[15px] px-5 w-full   border-b border-[#2d2d2d] pb-1  gap-1"
    >
      Reply 
    </button>
    
{ (isAuthor || role === 'dev') && <button

      className="text-red-500  text-[15px] px-5   border-b border-[#2d2d2d] pb-1  w-full    gap-1"
    >
      Delete 
    </button>
    }
<button
      onClick={()=>setVoteMenu(false)}
      className="  text-[15px] px-5    w-full      gap-1"
    >
      Cancel 
    </button>
    </motion.div>
      </motion.div>
}
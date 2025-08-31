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
import { addToPromotion, removeFromPromotion } from "../store/actions/Promotion";
import { addToHighlight, removeFromHighlight } from "../store/actions/Highlight";
export default function PostMenu({ setIsMenu , postId , token  ,isAuthor , role}){
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

    const handleHighlight = ()=>{
    console.log('cliecked')
    setHighlight(!highlighted )

      if (!token) return;
   if (!token) return;
  
      if (highlighted) {
        dispatch(removeFromHighlight(postId, token));
      } else {
        dispatch(addToHighlight(postId, token));
      }

  }
      const handlePromote = ()=>{
    console.log('cliecked')
    setPromoted(!promoted  )

      if (!token) return;
   if (!token) return;
  
      if (promoted) {
        dispatch(removeFromPromotion(postId, token));
      } else {
        dispatch(addToPromotion(postId, token));
      }

  }

const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deletePostAction(postId , token))
router.back()
}
    return  <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen z-[999] fixed left-0 bottom-0 bg-black/50">
      <div onClick={()=>setIsMenu(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y : 160 }} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y : 160}} animate = {{y : 0}}  className="bg-[#0d0d0d] fixed lg:absolute lg:w-60 lg:top-16 lg:left-[2vw] lg:h-fit  z-200 bottom-8 py-3 max-sm:-translate-x-1/2 max-sm:left-1/2  flex  flex-col items-center justify-center  w-[96%] rounded-[6px]  ">
  <button
      onClick={addToMoodBoard }
      className ="text-white text-[14px]  px-5 py-1  w-full lg:text-left gap-1"
    >
    {!isFavorited ? 'Add to moodboard':'Remove from moodboard'}
    </button>

{ role === 'dev'&& <button
      onClick={handleHighlight }
      className ="text-white text-[14px]  px-5 py-1  w-full lg:text-left gap-1"
    >
    {!highlighted ? 'Add to highlight':'Remove from  highlight'}
    </button>}
{ role === 'dev'&& <button
      onClick={ handlePromote }
      className ="text-white text-[14px]  px-5 py-1  w-full lg:text-left gap-1"
    >
    {!promoted ? 'Add to promotion':'Remove from  promotion'}
    </button>}

{ (isAuthor || role === 'dev') && <button
      onClick={()=>handleDeleteClick()}
      className="text-red-500 w-full text-[14px] px-5 py-1  w-full lg:text-left  gap-1"
    >
      Delete post 
    </button>
    }

    </motion.div>
      </motion.div>
}
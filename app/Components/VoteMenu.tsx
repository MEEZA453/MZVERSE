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
export default function VoteMenu({ setVoteMenu , postId , token  ,isAuthor , role}){
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


  const [devMenu , setDevMenu]  = useState(false)
const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deletePostAction(postId , token))
router.back() 
}
    return  <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen z-[999] fixed left-0 bottom-0 bg-black/50">
      <div onClick={()=>setVoteMenu(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y : 160 }} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y : 160}} animate = {{y : 0}}  className="bg-[#151515] fixed  z-200  bottom-2 lg:bottom-4 py-4 -translate-x-1/2 left-1/2  flex  flex-col items-center justify-center lg:w-80 w-[96%] rounded-[6px]  ">


 {/* {isAuthor&& <button
      onClick={()=>handleDeleteClick()}
      className="text-white text-[14px]  px-3 py-1 flex items-center justify-center gap-1"
    >
      Edit post
    </button>}

     */}
      <button

      className="  text-[15px] px-5  pb-1 lg:text-left  gap-1"
    >
      Reply 
    </button>
    
{ (isAuthor || role === 'dev') && <button

      className="text-red-500 text-[15px] px-5  lg:text-left  gap-1"
    >
      Delete 
    </button>
    }

    </motion.div>
      </motion.div>
}
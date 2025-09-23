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
import { removeFromHighlight  ,   addToHighlight } from "../store/actions/Highlight";
import { addToPromotion, removeFromPromotion } from "../store/actions/Promotion";
import { deleteDesign } from "../store/actions/design";
import { useThemeContext } from "../Context/ThemeContext";
export default function ProductMenu({ setIsMenu , postId , token , currentData  }){
const [moodboard , setMoodboard ] = useState(true)
const [highlighted , setHighlight] = useState(false)
const [promoted , setPromoted] = useState(false)
const {isLightMode} = useThemeContext()


  const [devMenu , setDevMenu]  = useState(false)
const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const handleDeleteClick = ()=>{
    console.log('clicked',postId)
    dispatch(deleteDesign(postId ))
router.back()
}
const handleEditClick = ()=>{
  console.log('editing..')
  dispatch({ type: "SET_EDIT_PRODUCT", payload: currentData });
router.push("/createProduct");
}
    return  <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}}exit = {{opacity : 0}}  transition={{duration: 0.3 , }} className="h-screen w-screen z-[999] fixed left-0 bottom-0 bg-black/50">
      <div onClick={()=>setIsMenu(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y : 160}} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y : 160}} animate = {{y : 0}}  className={`${isLightMode ? 'bg-[#ededed]':'bg-[#0d0d0d]'} fixed  z-200 bottom-1.5 py-4 -translate-x-1/2 left-1/2  flex  flex-col items-center justify-center  w-[96%] rounded-[6px]  `}>


   
 <button
      onClick={handleEditClick}
      className=" text-[15px] px-5  pb-1 lg:text-left  gap-1"
    >
      Edit post
    </button>

    
 <button
      onClick={()=>handleDeleteClick()}
      className=" text-[15px] px-5 text-red-600 pb-1 lg:text-left  gap-1"
    >
      Delete 
    </button>


    </motion.div>
      </motion.div>
}
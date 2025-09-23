'use client'
import { useRouter } from "next/navigation"
import { FiEdit3 } from "react-icons/fi";
import { AiFillProduct, AiOutlinePlus } from "react-icons/ai";
import {motion , AnimatePresence} from 'framer-motion'
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { PiEye, PiEyeLight } from "react-icons/pi";
import { useThemeContext } from "../Context/ThemeContext";
export default function CreateMenu({setOpenCreate}){

const router = useRouter()
   const [isMobile , setIsMobile] = useState(false)
   const {isLightMode} = useThemeContext()
   useEffect(()=>{
   
       window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)
   
   },[])
         
      
      return <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen fixed left-0 bottom-0 bg-black/50">
      <div onClick={()=>setOpenCreate(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y  : 160}} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y :160}} animate = {{y : 0}}  className={`${isLightMode ? 'bg-[#ededed]':'bg-[#0d0d0d]'} fixed   z-[99999] bottom-4 py-4 -translate-x-1/2  left-1/2  flex  flex-col items-center   w-[96%] lg:w-120 rounded-[6px]   `}>
  <button
      onClick={()=>router.push('/createPost')}
      className={` text-white w-full flex items-center justify-between  px-3 pb-1.5  border-b ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'}  gap-`}
      >
  <div className=" gap-4 flex items-center w-full "><PiEyeLight size={17} /><h3  className="" >Share Visual</h3></div>
  <MdOutlineArrowForwardIos className='opacity-60' size={14}/>
    </button>
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white   px-3 pt-1.5 flex items-center justify-between   w-full gap-"
      >
 <div className=" gap-4 flex items-center  w-full"><AiOutlinePlus /><h3  >Create Supply</h3></div>
   <MdOutlineArrowForwardIos className='opacity-60' size={14}/>
    </button>
    </motion.div>
      </motion.div>
      
}
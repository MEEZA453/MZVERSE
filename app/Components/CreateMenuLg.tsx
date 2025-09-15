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
export default function CreateMenuLg({setOpenCreate}){

const router = useRouter()
   const [isMobile , setIsMobile] = useState(false)
   useEffect(()=>{
   
       window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)
   
   },[])
         
      
      return <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen z-[999] fixed left-0 bottom-0 flex items-center justify-center bg-black/50">
      <div onClick={()=>setOpenCreate(false)} className="w-screen h-screen absolute "></div>
      <motion.div  initial = {{y : 50, opacity : 0 }} transition = {{duration : 0.2 , ease : "easeInOut"} } exit={{y : 50, opacity : 0}} animate = {{y : 0 , opacity :1}}  className="bg-[#151515]   w-100  h-fit  z-200  py-4 gap-1  flex  flex-col items-center justify-center  rounded-[6px]  ">
  <button
      onClick={()=>router.push('/createPost')}
      className=" text-white w-full flex items-center justify-between  px-3 pb-1.5  border-b border-[#4d4d4d]  gap-"
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
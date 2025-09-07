import { useRouter } from "next/navigation"
import { FiEdit3 } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { PiCopy } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../Context/AuthContext";
import {motion} from 'framer-motion'
import { useEffect, useState } from "react";
export default function ProfileMenuLg({setProfileMenu}){

const {logout} = useAuth()
const router = useRouter()
const [isMobile , setIsMobile] = useState(false)
useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])
      
      return <motion.div   initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }}  exit = {{opacity : 0}} className="h-screen w-screen fixed top-0 z-[999] bg-black/70 flex items-center justify-center" >
      <motion.div initial = {{y : 50, opacity : 0 }} transition = {{duration : 0.2 , ease : "easeInOut"} } exit={{y : 50, opacity : 0}} animate = {{y : 0 , opacity :1}}  className="bg-[#151515]  w-100 items-center justify-center py-4  z-[99999]  flex   flex-col rounded-[6px]   ">
  {/* <button
      onClick={()=>router.push('/profile')}
      className=" text-white  w-full text-[14.5px] px-3 py-1 flex items-center justify-center gap-1"
    >
    Edit profile
    </button> */}
      {/* <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14.5px] px-3 w-full py-1 flex items-center justify-center gap-1"
    >
    Share profile 
    </button> */}
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14.5px] border-b border-[#4d4d4d] justify-center w-full px-3  pb-1 py-0.5 flex  gap-1"
    >
    Following list
    </button> 
     <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14.5px] border-b border-[#4d4d4d] w-full justify-center pb-1   px-3 py-0.5 flex  gap-1"
    >
    My followers
    </button>
      <button
      onClick={()=>router.push('/handle')}
      className="text-white text-[14.5px]  border-b border-[#4d4d4d] w-full justify-center pb-1   px-3 py-0.5 flex  gap-1"
    >
    Claim a new handle
    </button>
        <button

      className="text-white text-[14.5px]  border-b border-[#4d4d4d] w-full justify-center pb-1   px-3 py-0.5 flex  gap-1"
          onClick={()=> router.push('/request')}
    >
    Request for judge
    </button>
     <button
      onClick={()=> logout()}
      className="text-red-600 text-[14.5px]  px-3 py-0.5  w-full justify-center pb-1  border-b border-[#4d4d4d]  flex  gap-1"
    >

    Logout 
    </button>
         <button
      onClick={()=> setProfileMenu(false)}
      className=" text-[14.5px]  px-3 py-0.5  flex  gap-1"
    >

    Cancel 
    </button>
    </motion.div>
      </motion.div>
      
}


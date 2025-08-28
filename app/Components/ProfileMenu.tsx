import { useRouter } from "next/navigation"
import { FiEdit3 } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { PiCopy } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../Context/AuthContext";
import {motion} from 'framer-motion'
import { useEffect, useState } from "react";
export default function ProfileMenu({setProfileMenu}){

const {logout} = useAuth()
const router = useRouter()
const [isMobile , setIsMobile] = useState(false)
useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])
      
      return <motion.div    
      className="h-screen w-screen fixed lg:absolute z-[999] bottom-0 left-0 max-sm:bg-black/50">
      <div onClick={()=>setProfileMenu(false)} className="w-screen h-screen "></div>
      <motion.div  initial={ {y: 160 }}
  animate={{ y: 0}}
  exit={ {y: 160}}
  transition={ { duration: 0.3 }}  className="bg-[#0d0d0d] fixed lg:absolute lg:w-60 lg:top-22 lg:right-[26.1vw] lg:h-fit lg: z-[99999] bottom-1.5 py-4 max-sm:-translate-x-1/2 max-sm:left-1/2  flex  flex-col items-center justify-center  w-[96%] rounded-[6px]   ">
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
      className="text-white text-[14.5px]   w-full px-3 py-0.5  gap-1"
    >
    Following list
    </button> 
     <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14.5px]  w-full  px-3 py-0.5  gap-1"
    >
    My followers
    </button> <button
      onClick={()=> logout()}
      className="text-red-600 text-[14.5px]  px-3 py-0.5 flex  gap-1"
    >
    Logout 
    </button>
    </motion.div>
      </motion.div>
      
}


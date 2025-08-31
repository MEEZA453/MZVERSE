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
      
      return <div  >
      <div  className="bg-[#0d0d0d]  absolute w-50 top-19 right-[28.1vw]  py-3  z-[99999]  flex pl-5  flex-col rounded-[6px]   ">
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
      className="text-white text-[14.5px]   px-3 py-0.5 flex  gap-1"
    >
    Following list
    </button> 
     <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14.5px]   px-3 py-0.5 flex  gap-1"
    >
    My followers
    </button>
      <button
      onClick={()=>router.push('/handle')}
      className="text-white text-[14.5px]    px-3 py-0.5 flex  gap-1"
    >
    Claim a new handle
    </button>
        <button

      className="text-white text-[14.5px]    px-3 py-0.5 flex  gap-1"
    >
    Request for judge
    </button>
     <button
      onClick={()=> logout()}
      className="text-red-600 text-[14.5px]  px-3 py-0.5  flex  gap-1"
    >

    Logout 
    </button>
    </div>
      </div>
      
}


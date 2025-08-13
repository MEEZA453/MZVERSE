import { useRouter } from "next/navigation"
import { FiEdit3 } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { PiCopy } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../Context/AuthContext";

export default function ProfileMenu(){
    const router = useRouter()
    const  {logout} = useAuth()
    return  <div className="bg-[#1d1d1d] absolute  z-[9999] top-7 right-12 rounded-[2px]  h-fit w-40">
  <button
      onClick={()=>router.push('/profile')}
      className=" text-white border-b border-[#4d4d4d] w-full text-[14px] px-3 py-1 flex items-center justify-left gap-1"
    >
     <FiEdit3 color="white" size={19}/>  Edit profile
    </button>
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14px]   border-b border-[#4d4d4d] px-3 w-full py-1 flex items-center justify-left gap-1"
    >
     <IoIosShareAlt color="white" size={19}/> Share profile 
    </button>
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14px]  border-b border-[#4d4d4d] w-full  px-3 py-1 flex items-center justify-left gap-1"
    >
     <PiCopy color="white" size={19}/> Copy ID
    </button>  <button
      onClick={()=> logout}
      className="text-red-600 text-[14px]  px-3 py-1 flex items-center justify-left gap-1"
    >
     <CiLogout color="red" size={19}/> Logout 
    </button>
    </div>
}
import { useRouter } from "next/navigation"
import { FiEdit3 } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import {motion , AnimatePresence} from 'framer-motion'
import { useEffect, useState } from "react";
export default function CreateMenu({setOpenCreate}){

const router = useRouter()
   const [isMobile , setIsMobile] = useState(false)
   useEffect(()=>{
   
       window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)
   
   },[])
         
      
      return <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen fixed left-0 bottom-0 bg-black/50">
      <div onClick={()=>setOpenCreate(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y : isMobile ? 160 : 0}} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y : isMobile ?160:0}} animate = {{y : 0}}  className="bg-[#1d1d1d] fixed lg:absolute lg:w-60 lg:top-13 lg:right-[4vw] lg:h-fit z-[99999] bottom-1.5 py-4 max-sm:-translate-x-1/2 max-sm:left-1/2  flex  flex-col items-center justify-center  w-[96%] rounded-[6px] lg:rounded-[3px]  ">
  <button
      onClick={()=>router.push('/createPost')}
      className=" text-white w-full  px-3 py-2    gap-1"
      >
  <div className=" gap-1 flex items-center justify-center w-full"><h6  className="" >Share your vision</h6><FiEdit3/></div>
  <p style={{fontSize : '13px' , opacity : 0.80}} className="">Show your work. Inspire minds.</p>
    </button>
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white   px-3 py-1  items-center justify-left gap-1"
      >
 <div className=" gap-1 flex items-center justify-center w-full"><h6  >Sell assets</h6><AiFillProduct/></div>
  <p style={{fontSize : '13px' , opacity : 0.80}} className="">Sell assets. Fuel your passion.</p>
    </button>
    </motion.div>
      </motion.div>
      
}
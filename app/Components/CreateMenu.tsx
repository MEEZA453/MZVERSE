import { useRouter } from "next/navigation"
import { FiEdit3 } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import {motion , AnimatePresence} from 'framer-motion'
export default function CreateMenu({setOpenCreate}){

const router = useRouter()
   
      
      return <motion.div  initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }} className="h-screen w-screen absolute top-0 left-0 bg-black/50">
      <div onClick={()=>setOpenCreate(false)} className="w-screen h-screen "></div>
      <motion.div  initial = {{y : 160}} transition = {{duration : 0.3 , ease : "easeInOut"} } exit={{y : 160}} animate = {{y : 0}}  className="bg-[#0d0d0d] absolute  z-[99999] top-[80dvh] py-6 flex  flex-col items-center justify-center  w-screen  ">
  <button
      onClick={()=>router.push('/createPost')}
      className=" text-white w-full  px-3 py-2  border-b border-[#2d2d2d]  gap-1"
      >
  <div className=" gap-1 flex items-center justify-center w-full"><h5 >Share your work</h5><FiEdit3/></div>
  <p style={{fontSize : '13px' , opacity : 0.80}} className="">Post your design other artiest can judge according <br/> to selected field of judgement</p>
    </button>
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white   px-3 py-1  items-center justify-left gap-1"
      >
 <div className=" gap-1 flex items-center justify-center w-full"><h5 >Post product</h5><AiFillProduct/></div>
  <p style={{fontSize : '13px' , opacity : 0.80}} className="">Sell or post your assets, earn money for free.</p>
    </button>
    </motion.div>
      </motion.div>
      
}
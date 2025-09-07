import ButtonLoaderWhite from "./ButtonLoaderWhite";
import {useState ,  useEffect} from 'react'
import { useSelector , useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {motion} from 'framer-motion'
export default function Request (){
    const  [loading , setLoading] = useState(false)
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     console.log('submitted')   
    }
    return <motion.div   initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.3 , }}    exit = {{opacity : 0}}   className="bg-black/60 w-screen h-screen fixed top-0 z-[999] flex justify-center items-center">
        <motion.form  initial={ {y: 180 }}
  animate={{ y: 0}}
  exit={ {y: 180}}
  transition={ { duration: 0.3 , ease : 'easeInOut' }} onSubmit={(e)=>handleSubmit(e)} className="h-80 w-[90%] lg:w-120 bg-[#dadada] px-3 py-2 relative">
            <input className="bg-white w-full rounded-xl h-40" type="text" placeholder="your message.."/>
            <button  type='submit' className='bg-black text-[14px] px-3 py-1 rounded-[3px] mt-2 flex items-center justify-center h-7 w-full'>{loading ? <ButtonLoaderWhite/> : 'Submit'}</button>
                <button  type='button' className='bg-black text-[14px] px-3 py-1 rounded-[3px] mt-2 flex items-center justify-center h-7 w-full'>Cancel</button>
        </motion.form>
    </motion.div>
}
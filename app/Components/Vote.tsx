    'use client'
    // import {useDispatch } from 'react-redux'
    import {useState , useEffect} from 'react';
    import { MdHowToVote } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import {motion } from 'framer-motion'
import ButtonLoaderWhite from '../Components/ButtonLoaderWhite'
import { votePostAction } from '../store/actions/post';
import { useNotification } from '../Context/Notification';
import { useThemeContext } from '../Context/ThemeContext';
    export default function Vote ({fieldOfVote, existingVote , postId , token}:{fieldOfVote:[string],existingVote : object , postId : string , token : string}){
        console.log(postId)
    const [isOpen , setIsOpen]  = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const [loading , setLoading] = useState(false)
    const {setNotification} = useNotification()
    const {isLightMode} = useThemeContext()
const [isMobile, setIsMobile] = useState(
  typeof window !== "undefined" ? window.innerWidth <= 640 : false
);


useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])



  const [votes, setVotes] = useState<Record<string, number>>({});

  const handleChange = (vote:string, value:number) => {
  setVotes(prev => ({
    ...prev,
    [vote]: value/10
  }));
};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
if(Object.keys(votes).length === fieldOfVote.length){setLoading(true)
    console.log('submitting' , postId , votes , token);
    dispatch(votePostAction(postId, votes, token));
    setNotification('voteSubmitted')
    setLoading(false)}else{
        return
    }
};
    return <div className='w-screen relative lg:w-[30vw] flex items-center  justify-center mt-6'><div  onClick={()=>setIsOpen(true)} className={` duration-400   flex items-center justify-center w-[98%]  z-100 bottom-5  ${isOpen ?` bg-[#dadada] rounded   h-[240px] py-8  `: ` rounded-[2px] h-6.5  bg-black `}`}>
    
    <div>{isOpen ?<motion.form initial={{opacity : 0 }}
    animate = {{opacity : 1}}
    transition = {{duration :0.5 , delay : 0.5}}
    style={{opacity : isOpen ? 1 :0}} onSubmit={(e)=>handleSubmit(e)} className='flex  w-screen lg:px-6 px-4 lg:w-[30vw] flex-col gap-2'>
          <button onClick={(e) => {
  e.stopPropagation();
  setIsOpen(false);
}}><RxCross2
          className=' close absolute right-3 top-2 text-black'/></button>

{fieldOfVote?.map((vote , i)=>{

return  <div key={i} className='flex  flex-col'>
    <div className='w-full flex justify-between'>   <h3  className='text-black leading-[-10px]'>
        {vote}
            </h3>
            <h3 className='text-black'>{votes[vote]?votes[vote]:'5.0'}</h3>
            </div>
         
<input  min={0}
onChange={(e) => handleChange(vote, Number(e.target.value))}
            max={100}
            className='w-full  h-2 bg-black' type='range'/>
        </div>
})}

{/* <input type='text' placeholder='Comment..' style={{color: 'black' , opacity : 1, borderRadius : '6px'}}className='w-full px-2  mt-2 rounded-[10px] bg-white h-20 text-white'/> */}
    <button style={{ opacity: Object.keys(votes).length < fieldOfVote.length ? 0.5 : 1  , color: 'white'}} type='submit' className='bg-black text-[14px] px-3 py-1 rounded-[3px] mt-2 flex items-center justify-center h-7 w-full'>{loading ? <ButtonLoaderWhite/> : 'Submit'}</button>
    </motion.form> :<motion.button initial={{opacity : 0 }}
    animate = {{opacity : 1}}
    transition = {{duration :0.5 , delay : 0.5}} style={{color : isLightMode ? 'white': 'black'}} className='text-white w-full text-center'>Vote now</motion.button>}
    <div className='w-full flex justify-end'>

    </div>

    </div>
        </div></div>
    }
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
    export default function Vote ({fieldOfVote, existingVote , postId , token}:{fieldOfVote:[string],existingVote : object , postId : string , token : string}){
    const [isOpen , setIsOpen]  = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const [loading , setLoading] = useState(false)
const [ isMobile , setIsMobile ] = useState(false)

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
setLoading(true)
    console.log('submitting' , postId , votes , token);
    dispatch(votePostAction(postId, votes, token));
    setLoading(false)
};
    return <div  onClick={()=>setIsOpen(true)} className={` duration-500 ease-in-out bg-[#dadada] flex items-center justify-center fixed z-100 bottom-5   ${isOpen ?`  rounded $ ${isMobile ? ' -translate-x-1/2 h-80 left-1/2 w-[95%]':'w-100 h-80 right-5'}`: `${isMobile ? 'w-[95%] rounded-[3px] h-7 -translate-x-1/2 left-1/2':'w-13 h-13  rounded-[30px] right-0 '}  `}`}>
    
    <div>{isOpen ?<motion.form initial={{opacity : 0 }}
    animate = {{opacity : 1}}
    transition = {{duration :0.5 , delay : 0.5}}
    style={{opacity : isOpen ? 1 :0}} onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-2'>
          <button onClick={(e) => {
  e.stopPropagation();
  setIsOpen(false);
}}><RxCross2
          className=' close absolute right-2 top-2 text-black'/></button>

{fieldOfVote?.map((vote , i)=>{

return  <div key={i} className='flex gap-0.5 flex-col'>
    <div className='w-full flex justify-between'>   <h3  className='text-black leading-[-10px]'>
        {vote}
            </h3>
            <h3 className='text-black'>{votes[vote]?votes[vote]:'5.0'}</h3>
            </div>
         
<input  min={0}
onChange={(e) => handleChange(vote, Number(e.target.value))}
            max={100}
            className='w-90 h-1.5 bg-black' type='range'/>
        </div>
})}

<input type='text' placeholder='Comment..' style={{color: 'black' , opacity : 1, borderRadius : '6px'}}className='w-full px-2  mt-2 rounded-[10px] bg-white h-20 text-white'/>
    <button type='submit' className='bg-black text-[14px] px-3 py-1 rounded-[3px] mt-2 flex items-center justify-center h-7 w-full'>{loading ? <ButtonLoaderWhite/> : 'Submit'}</button>
    </motion.form> :<button className='text-black'>{isMobile ? 'Vote now' : <MdHowToVote size = {21}color='black'/>}</button>}
    <div className='w-full flex justify-end'>

    </div>

    </div>
        </div>
    }
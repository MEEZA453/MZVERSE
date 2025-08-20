'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import { fetchVotesByPostAction, getPostByIdAction } from '../../store/actions/post'
import { AppDispatch, RootState } from '../../store/store'
import MasterNavber from '../../Components/MasterNavber'
import Loading from '../../Components/loading'
import Image from 'next/image'
import ProductImages from '../../Components/ProductImages'
import Vote from '../../Components/Vote'
import { useAuth } from '../../Context/AuthContext'
import { getVotesByPost } from '../../api'
import { HiOutlineDotsVertical } from "react-icons/hi";
import PostMenu from '../../Components/PostMenu'
import ImageShower from '../../Components/ImageShower'
import {AnimatePresence, motion} from 'framer-motion'
import { GoHeartFill } from 'react-icons/go'
import { PiHeartLight } from 'react-icons/pi'
import { addToFavorites, removeFromFavorites } from '../../store/actions/fav'
import { useNotification } from '../../Context/Notification'
import Notification from '../../Components/Notification'

type AveragesType = {
  aesthetics: number;
  composition: number;
  creativity: number;
  emotion: number;
};
const defaultAverages: AveragesType = {
  aesthetics: 0,
  composition: 0,
  creativity: 0,
  emotion: 0,
};
export default function Post() {
    const dispatch = useDispatch<AppDispatch>()
    const [openIndex , setOpenIndex] = useState(0)
    const [currentIndex ,setCurrentIndex] = useState(0)
    const [totalAvg , setTotalAvg] = useState(0)
    const [isMenu , setIsMenu]  = useState(false)
    const postId = usePathname().split('/')[2]
    const {user ,token , role} = useAuth()
    const router  = useRouter()
    const [red , setRed ] = useState(false)
    const {setNotification , notification} = useNotification()
    const [isAuthor , setAuthor] = useState(false)
    const [isMobile  ,setIsMobile] = useState(false)
    const { post, loading , votes } = useSelector((state: any) => state.posts)
    useEffect(() => {
      console.log('calling API for postId:', postId)
        dispatch(getPostByIdAction(postId))
        dispatch(fetchVotesByPostAction(postId))
    }, [dispatch, postId])
    

const averages = post?.voteFields?.reduce((acc, category) => {
  const total = votes.reduce((sum, vote) => sum + vote[category], 0);
  acc[category] = parseFloat((total / votes.length).toFixed(2));
  return acc;
}, {});

console.log(averages)
useEffect(() => {
  if (averages) {
    const values = Object.values(averages).filter(v => typeof v === "number");
    if (values.length > 0) {
      const totalAverage = values.reduce((sum, val) => sum + val, 0) / values.length;
      setTotalAvg(parseFloat(totalAverage.toFixed(1)));
    } else {
      setTotalAvg(0); // or keep previous value
    }
  }
}, [averages]);

useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])


useEffect(()=>{
user?._id === post?.createdBy?._id ? setAuthor(true): setAuthor(false)
},[user,post])

const existingVote = post?.votes?.find(v => v?.user?._id === user?._id);

    return (
        <div className='hide-scrollbar'>
           
            {post?.createdBy?.handle === user?.handle ?<div>

        
            </div>:null}

          <Notification/>
            <MasterNavber/>
            {!loading ?<div className='lg:flex hide-scrollbar lg:h-screen lg:overflow-hidden'>
              <button className='absolute z-[999]  top-14 left-5 text-white' onClick={()=> {setIsMenu(true)}}><HiOutlineDotsVertical/></button>
              
        <AnimatePresence>{  isMenu ?  <PostMenu role={role} isAuthor = {isAuthor} setIsMenu = {setIsMenu} token={token?token:''} postId = {postId}/>:null} </AnimatePresence> 
           
        {/* <ProductImages images={post?.images}/> */}
<ImageShower images = {post?.images}/>
    
     <div onClick={()=>setIsMenu(false)} className='w-full  mb-20 lg:mt-20 '>
  
       { votes.length > 0 && <div className='w-full '>

{post?.voteFields?.map((field : any ,index : number)=>{
    return <div key={index} className='score px-2 mb-1'>
              
                <div className=''>
                <div className='overall w-full h-6 flex items-center justify-between  relative'>
                    <h3   className='z-10 ml-2'>{field}:</h3>
                    <h3 >{averages[field]}</h3>
                    <motion.div     initial={{width : 0}} animate = {{width : `${(averages[field]*10)-5}%`}} transition={{duration : 1 , ease : 'linear'}} className='ber h-full bg-[#1d1d1d] absolute top-0'></motion.div>
                </div>
                </div>
            </div>
            


})}

             <div className='score w-full h-6 flex items-center px-2 justify-between  relative'>
                    <h3   className='z-10 text-black ml-2'>Score:</h3>
                    <h3 >{totalAvg}</h3>
                    <motion.div     initial={{width : 0}} animate = {{width : `${70-5}%`}} transition={{duration : 1 , ease : 'linear'}} className='ber h-full bg-[#dadada] absolute top-0'></motion.div>
                </div>
        </div>}
<Vote fieldOfVote={post?.voteFields} existingVote = {existingVote} postId={post?._id} token={user?.token} />
{votes.length > 0 && <div className='tabs  mt-6'>
    <div className='flex px-3 gap-12'>
{['Creators' , 'Judges'].map((el , i)=>{
    return <button className='text-[14px]' key={i} style={{opacity :currentIndex === i ? 1 : 0.66}}  onClick={()=> setCurrentIndex(i)}>{el}</button>
})}
</div>
<div className='w-full border-t mt-[2px]  border-[#4d4d4d] h-1.5 caro'>
    <div style={{transform : !isMobile ?`translate(${currentIndex*174}px)`:`translate(${currentIndex*103}px)` }} className='bg-white duration-300 translate-x-[13px] w-12 h-[3px] rounded-full
    '></div>
    </div>

</div>}


{votes.length <1 ? <p className='text-center mt-10'>No vote available </p>: <div className='votes mt-4 border-b border-[#4d4d4d] relative w-screen lg:w-[30vw] max-h-100 h-[50vh] overflow-x-hidden overflow-y-scroll hide-scrollbar'>
<div  style={{transform : isMobile ? `translate(-${currentIndex*100}vw)`: `translate(-${currentIndex*30}vw)`}} className='h-50  duration-300 w-[200vw] lg:w-[60vw]  flex'>
    <div className='max-h-100 h-full w-screen lg:w-[30vw] community-votes  '>
    <div className='see-votes  px-2 mt-5'>
    <div className='gap-35 lg:gap-50 mb-4 flex'>
        <p>Origin</p>
        <p>Passion</p>
    </div>
    <div>
   {votes.map((vote , i)=>{
    return  <div  onClick={()=> setOpenIndex(i)} key={i} className={`vote rounded px-2 pt-2 duration-500  ${openIndex === i ? 'bg-[#1d1d1d] h-40': 'h-10' }`}>
  <div className='w-full pt-1 overview flex  lg:pr-8 justify-between'>
<div className='vote flex  items-center gap-12 lg:gap-20.5'>
    <div className='profile w-30  flex items-center gap-1'>
        <Image onClick={()=> router.push(`/${vote.user.handle}`)} height = {100} width = {100} alt  = 'profile pic' src={vote?.user?.profile} className = 'h-8 w-8 rounded-full object-cover'/>
        <h3 >@{vote?.user?.handle}</h3>
    </div>
    <h3 >Designer</h3>
</div>
<h6>  {(
        post?.voteFields?.reduce((sum, field) => sum + (vote[field] || 0), 0) / post?.voteFields?.length
      ).toFixed(1)} </h6>
</div>



<div style={{opacity : openIndex === i ? 1 : 0}} className='details duration-300 delay-200 mt-2 px-10 w-full '>
{post?.voteFields?.map((el ,i)=>{
    return <div key={i} className='justify-between w-full flex'>
        <p className='mb-1'>{el}:</p>
        <p>{vote[el]}</p>
    </div>
})}

  <div className='w-full flex justify-between'><h3>Overall</h3><h3>  {(
        post?.voteFields?.reduce((sum, field) => sum + (vote[field] || 0), 0) / post?.voteFields?.length
      ).toFixed(1)}</h3></div>
</div>
  
 </div>
   })}
</div>
</div>
    </div>
    <div className={`h-50 ${isMobile ? 'w-screen':'w-[30vw]'}`}> <p className='mt-10  text-center'>No vote available</p></div>

</div>
</div>}

<div className='other-detais  px-2 mt-10'>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h3 >madeby:</h3><h6>{post?.createdBy?.handle}</h6></div>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h3 >posted:</h3><h6>{post?.createdAt}</h6></div>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h3 >typeof:</h3><h6>{post?.category}</h6></div>

</div>

</div>




            
            </div>: <Loading/>}
        </div>
    )
}

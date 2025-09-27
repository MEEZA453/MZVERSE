'use client'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { fetchVotesByPostAction, getPostByIdAction } from '../store/actions/post'
import { AppDispatch, RootState } from '../store/store'
import MasterNavber from './MasterNavber'
import Loading from './loading'
import Image from 'next/image'
import ProductImages from './ProductImages'
import Vote from './Vote'
import { useAuth } from '../Context/AuthContext'
import { getVotesByPost } from '../api'
import { HiOutlineDotsVertical } from "react-icons/hi";
import PostMenu from './PostMenu'
import { BsFillLightningChargeFill } from "react-icons/bs";
import ImageShower from './ImageShower'
import {AnimatePresence, motion} from 'framer-motion'
import { GoHeartFill } from 'react-icons/go'
import { PiBookmarkSimpleLight, PiHeartLight } from 'react-icons/pi'
import { addToFavorites, removeFromFavorites } from '../store/actions/fav'
import { useNotification } from '../Context/Notification'
import Notification from './Notification'
import VoteMenu from './VoteMenu'
import VoteMenuLg from './VoteMenuLg'
import PostMenuLg from './PostMenuLg'
import { IoIosArrowBack } from 'react-icons/io'
import SearchAssets from './SearchAssets'
import Attachments from './Attachments'
import AttachmentsMenu from './AttachmentsMenu'
import { getAssetsOfPost } from '../store/actions/attach'
import { useThemeContext } from '../Context/ThemeContext'
import { VscHeart } from 'react-icons/vsc'
import { IoBookmarksOutline, IoBookmarksSharp } from 'react-icons/io5'
import AnimatedNumber from './AnimateNumber'

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
export default function Post({catchedPost , catchedVotes}) {
  console.log('look i')
    const dispatch = useDispatch<AppDispatch>()
    const [openIndex , setOpenIndex] = useState(0)
    const [isVoteMenu , setVoteMenu] = useState(false)
    const [currentIndex ,setCurrentIndex] = useState(0)
    const [totalAvg , setTotalAvg] = useState(0)
    const [isMenu , setIsMenu]  = useState(false)
    const {user ,token , role} = useAuth()
    const [attachmentsMenu ,setAttachmentsMenu] = useState(false)
    const router  = useRouter()
    const {isLightMode}  = useThemeContext()
    const [searchAssets , setSearchAssets] = useState(false)
    const [red , setRed ] = useState(false)
    const [post , setPost ] = useState(null);
    const [votes , setVotes ] = useState(null);
    const {setNotification , notification} = useNotification()
    const [isAuthor , setAuthor] = useState(false)
    const [isMobile  ,setIsMobile] = useState(false)
    const [opacity , setOpacity]  = useState(0)
    // const {rdxPost, rdxVotes, loading} = useSelector((state : any)=>state.posts)
    const searchParams = useSearchParams();
     const pid = searchParams.get('pid')
    const postId = post?._id || pid
  
const scrollRef = useRef<HTMLDivElement>(null)
useEffect(()=>{
if(catchedPost || catchedVotes){
  setPost(catchedPost)
  setVotes(catchedVotes)
// }else{
//   dispatch(getPostByIdAction(postId, token))
//     dispatch(fetchVotesByPostAction(postId))
//     if(rdxPost || rdxVotes){
//       setPost(rdxPost);
//       setVotes(rdxVotes);
//     }
}
},[catchedPost, catchedVotes])

// console.log('catched post is:', catchedPost)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const scrollY = scrollRef.current.scrollTop
      const maxScroll = 300
      const newOpacity = Math.min(scrollY / maxScroll, 0.6)
      setOpacity(newOpacity)
    }

    const container = scrollRef.current
    container?.addEventListener("scroll", handleScroll)

    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])


        const {assetsOfPost} = useSelector((state: any)=>state.attach)
    
        useEffect(()=>{
              dispatch(getAssetsOfPost(postId , token))
        },[dispatch, token, postId])

const averages = post?.voteFields?.length && votes?.length
  ? post.voteFields.reduce((acc, field) => {
      const total = votes.reduce((sum, vote) => sum + (vote[field] || 0), 0);
      acc[field] = parseFloat((total / votes.length).toFixed(2));
      return acc;
    }, {} as Record<string, number>)
  : {};


useEffect(() => {
  if (averages && Object.keys(averages).length > 0) {
    const delay = 200; // 1.1s in ms (matches AnimatedNumber duration)
    const fieldsCount = Object.keys(averages).length;
    
    const timer = setTimeout(() => {
      const values = Object.values(averages).filter(v => typeof v === "number");
      if (values.length > 0) {
        const totalAverage = values.reduce((sum, val) => sum + val, 0) / values.length;
        setTotalAvg(parseFloat(totalAverage.toFixed(1)));
      } else {
        setTotalAvg(0);
      }
    }, delay); 

    return () => clearTimeout(timer); 
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
        <div style={{backgroundColor : isLightMode ?'white':'black'}}  ref={scrollRef} className='fixed  top-0 left-0 z-[9999] hide-scrollbar w-screen h-screen overflow-y-auto '>
           
          

          <Notification/>
            {/* <MasterNavber/> */}
            { post ?<div className='lg:flex hide-scrollbar lg:h-screen  lg:overflow-hidden'>
                {post?.createdBy?.handle === user?.handle ?<div>

        
            </div>:null}
         

                  <AnimatePresence>{attachmentsMenu&& <AttachmentsMenu assetsOfPost = {assetsOfPost} setAttachmentsMenu = {setAttachmentsMenu} isMyPost={post?.isMyPost} postId = {post?._id} token= {token}/>}</AnimatePresence>

              <AnimatePresence>{searchAssets &&  <SearchAssets postId={post?._id} setSearchAssets = {setSearchAssets} />} </AnimatePresence>
        <AnimatePresence>{  isMenu ? isMobile ? <PostMenu currentData={post} setAttachmentsMenu = {setAttachmentsMenu} setSearchAssets={setSearchAssets} role={role} isAuthor = {isAuthor} setIsMenu = {setIsMenu} token={token?token:''} postId = {postId}/>:<PostMenuLg setAttachmentsMenu = {setAttachmentsMenu} setSearchAssets={setSearchAssets}  role={role} isAuthor = {isAuthor} setIsMenu = {setIsMenu} token={token?token:''} postId = {postId} />:null} </AnimatePresence> 
                   <AnimatePresence>{  isVoteMenu ? isMobile ?  <VoteMenu role={role} isAuthor = {isAuthor} setVoteMenu = {setVoteMenu} token={token?token:''} postId = {postId}/> : <VoteMenuLg role={role} isAuthor = {isAuthor} setVoteMenu = {setVoteMenu} token={token?token:''} postId = {postId}/>:null} </AnimatePresence> 
        {/* <ProductImages images={post?.images}/> */}
        <section className=' sticky top-0'>

<ImageShower  setIsMenu={setIsMenu}  name ={post?.name} amount = {post?.amount} isMobile={isMobile} images = {post?.images}/>
        </section>
        <div       style={{ opacity }} className={`h-full absolute pointer-events-none top-0 z-[99] w-full bg-black`}></div>
          <div className={`${isLightMode ? 'bg-white absolute  border-[#dadada]':'bg-black border-[#4d4d4d]'} border-b  h-9 z-[100] w-screen px-2 absolute top-0 flex justify-between items-center`}>
             <div className='flex items-center gap-5'>
                            <button onClick={()=> router.back()}>
                       <IoIosArrowBack  color={isLightMode ? 'black': 'white'} size={17} />
                       
                       </button>
                        {/* <button 
      className="text-white" 
      onClick={() => setIsMenu(true)}
    >
      <IoBookmarksOutline size={16} color={isLightMode ? 'black': 'white'}/>
    </button> */}
      
                      </div>
                        <button 
      className="text-white" 
      onClick={() => setIsMenu(true)}
    >
      <HiOutlineDotsVertical  color={isLightMode ? 'black': 'white'}/>
    </button>
       </div>
{  assetsOfPost?.length > 0 &&  <Attachments assetsOfPost = {assetsOfPost} setAttachmentsMenu={setAttachmentsMenu} postId={post?._id} token={token}/>}
     <div  onClick={()=>setIsMenu(false)} className={`w-full h-fit lg:border-l -translate-y-24 sticky top-0 z-[200]  rounded-t-[10px]  lg:border-[#4d4d4d]  ${isLightMode ? 'bg-white border-t border-[#dadada]':'bg-black'} lg:h-screen  lg:w-[30vw] mb-4 lg:pt-20`}>
      <div className='flex h-9    mb-2 items-center justify-between px-2 w-full'>
        <h5   className="px-0 " style={{color : isLightMode ?'black': 'white'}}>{post?.name} </h5>
       <div className="flex items-center">
 <div className="flex items-center">
  <h3>Voted by</h3>
  {votes.slice(0, 3).map((vote, i) => (
    <div key={i} className={i !== 0 ? "-ml-2" : ""}>
      <Image
        onClick={() => router.push(`/${vote?.user?.handle}`)}
        height={100}
        width={100}
        alt="profile pic"
        src={vote?.user?.profile || "/image.png"}
        className={`h-6 w-6 rounded-full object-cover border-2 ${isLightMode?'border-white':'border-black'}`}
      />
    </div>
  ))}
  <div  className={`h-6 w-6 rounded-full  flex items-center justify-center border-2  -ml-2 font-[inter-light] ${isLightMode?'border-white bg-black text-white':'border-black bg-white text-black'}`}>+</div>
</div>
</div>
</div>
       { votes.length > 0 && <div className='w-full px-1'>

{post?.voteFields?.map((field : any ,index : number)=>{
    return <div key={index} className='score px-1  mb-1'>
              
                <div className=''>
                <div className={`overall b border-b ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'} w-full h-5 pr-1 flex items-center justify-between  relative`}>
                    <h3   className='z-10 ml-2'>{field}:</h3>
                    <h3 >{averages[field]}  </h3>
                    {/* <motion.div    
                     initial={{width : 0}} animate = {{width : `${(averages[field]*10-10)}%`}}  transition={{duration : 0}}
                     className={`'ber h-full ${isLightMode ? 'bg-[#e2e2e2]':'bg-[#1d1d1d]'} absolute top-0'`}></motion.div> */}

                </div>
                </div>
            </div>
            


})}

             <div  className={`score ${isLightMode ?'bg-[#f4f4f4]':'bg-[#1d1d1d]'}  w-full h-6 flex items-center pr-2 mt-4 justify-between  relative`}>
                    <h3  style={{  fontWeight : '200'}}  className={`z-10 ml-2 mix-blend-difference`}>Score:</h3>
                    <h3 className="">
    {<AnimatedNumber value ={totalAvg}/>}/10
</h3>
                    <motion.div     initial={{width : 0}} animate = {{width : `${totalAvg*10-13}%`} } transition={{delay : 0.060 , duration : 1.5}  }  className={`ber h-full ${isLightMode ? 'bg-black ': 'bg-[#dadada]'} absolute top-0`}></motion.div>
                </div>
        </div>}
<Vote fieldOfVote={post?.voteFields} existingVote = {existingVote} postId={post?._id} token={user?.token} />
{votes.length > 0 && <div className='tabs  mt-6'>
    <div className={`flex relative border-b  ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'}  pb-1 px-3 gap-12`}>
{['Creators' , 'Judges'].map((el , i)=>{
    return <button className='text-[14px]' key={i} style={{opacity :currentIndex === i ? 1 : 0.66}}  onClick={()=> setCurrentIndex(i)}>{el}</button>
})}
{/* <div className='bg-[white/10 ]pointer-events-none h-full z-[200] w-20 absolute top-0 left-0'></div> */}
</div>
{/* <div className='w-full border-t mt-[2px]  border-[#4d4d4d] h-1.5 caro'>
    <div style={{transform : !isMobile ?`translate(${currentIndex*174}px)`:`translate(${currentIndex*103}px)` }} className='bg-white duration-300 translate-x-[13px] w-12 h-[3px] rounded-full
    '></div>
    </div> */}

</div>}


{votes.length <1 ? <p className='text-center mt-10'>No vote available </p>: <div className={`votes mt-4 border-b ${isLightMode ? 'border-[#dadada]':'border-[#4d4d4d]'}  relative w-screen lg:w-[30vw] max-h-100 h-[50vh] overflow-x-hidden overflow-y-scroll hide-scrollbar`}>
<div  style={{transform : isMobile ? `translate(-${currentIndex*100}vw)`: `translate(-${currentIndex*30}vw)`}} className='h-50  duration-300 w-[200vw] lg:w-[60vw]  flex'>
    <div className='max-h-100 h-full w-screen lg:w-[30vw] community-votes  '>
    <div className='see-votes  px-2 mt-5'>
    <div className='gap-35 lg:gap-43 mb-4 flex'>
        <p>Origin</p>
        <p>Passion</p>
    </div>
    <div>
   {votes.map((vote , i)=>{
    return <div  key={i}>{ vote?.user && <div  onClick={()=> setOpenIndex(i)} className={`vote rounded relative px-2 duration-500  ${openIndex === i ? isLightMode ? 'bg-[#ededed] h-36': 'bg-[#1d1d1d] h-36': 'h-10' }`}>
      

  <div className='w-full pt-2  mt-2 overview flex pr-2  justify-between items-center'>
<div className='vote flex  items-center gap-12 lg:gap-20.5'>
    <div className='profile w-30  flex items-center gap-1'>
        <Image onClick={()=> router.push(`/${vote.user.handle}`)} height = {100} width = {100} alt  = 'profile pic' src={vote?.user?.profile || '/image.png'} className = 'h-8 w-8 rounded-full object-cover'/>
        <h3 >@{vote?.user?.handle || 'unknowuser'}</h3>
    </div>
    <h3 >Designer</h3>
</div>
{ openIndex === i ?   <button onClick={()=>setVoteMenu(true)} style={{lineHeight : 0}} className='absolute  right-2 top-2'>...</button>:<h3  >  {(
        post?.voteFields?.reduce((sum, field) => sum + (vote[field] || 0), 0) / post?.voteFields?.length
      ).toFixed(1)} </h3>}
</div>



<div style={{opacity : openIndex === i ? 1 : 0}} className='details duration-300 delay-200 px-10 w-full '>
{post?.voteFields?.map((el ,i)=>{
    return <div key={i} className='justify-between w-full flex'>
        <p className='mb-0.5'>{el}:</p>
        <p>{vote[el]}</p>
    </div>
})}

  <div className='w-full flex justify-between'><h3>Overall</h3><h3>  {(
        post?.voteFields?.reduce((sum, field) => sum + (vote[field] || 0), 0) / post?.voteFields?.length
      ).toFixed(1)}</h3></div>
</div>
  
 </div>}</div>
   })}
</div>
</div>
    </div>
    <div className={`h-50 ${isMobile ? 'w-screen':'w-[30vw]'}`}> <p className='mt-10  text-center'>No vote available</p></div>

</div>
</div>}

<div className='other-detais  px-2 mt-10'>
    <div className={`w-full px-2 border-b-[0.5] py-0.5 ${isLightMode ?'border-[#dadada]':'border-[#4d4d4d]'} flex justify-between`}><h3 >madeby:</h3><h6>{post?.createdBy?.handle}</h6></div>
    <div className={`w-full px-2 border-b-[0.5] py-0.5 ${isLightMode ?'border-[#dadada]':'border-[#4d4d4d]'} flex justify-between`}><h3 >posted:</h3><h6>{post?.createdAt}</h6></div>
    <div className={`w-full px-2 border-b-[0.5] py-0.5 ${isLightMode ?'border-[#dadada]':'border-[#4d4d4d]'} flex justify-between`}><h3 >typeof:</h3><h6>{post?.category}</h6></div>

</div>

</div>




            
            </div>: <Loading/>}
        </div>
    )
}
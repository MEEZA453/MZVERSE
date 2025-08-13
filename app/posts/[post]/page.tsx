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
export default function Post() {
    const dispatch = useDispatch<AppDispatch>()
    const { post, loading , votes } = useSelector((state: any) => state.posts)
    const [openIndex , setOpenIndex] = useState(0)
    const [currentIndex ,setCurrentIndex] = useState(0)
    const [isMenu , setIsMenu]  = useState(false)
    const postId = usePathname().split('/')[2]
    const {user ,token} = useAuth()
    const router  = useRouter()

    useEffect(() => {
        console.log('calling API for postId:', postId)
        dispatch(getPostByIdAction(postId))
        dispatch(fetchVotesByPostAction(postId))
    }, [dispatch, postId])
    

const existingVote = post?.votes?.find(v => v.user._id === user?._id);

    return (
        <div>
            {post?.createdBy?.handle === user?.handle ?<div>

            <button className='top-16 left-3 z-100   lg:left-10 absolute' onClick={()=> setIsMenu(true)}><HiOutlineDotsVertical color='white' /></button>
         {  isMenu ?  <PostMenu token={token?token:''} postId = {postId}/>:null}
            </div>:null}
            <MasterNavber/>
            {!loading ?<div className='lg:flex'>
<Vote fieldOfVote={post?.voteFields} existingVote = {existingVote} postId={post?._id} token={user?.token}/>
        {/* <ProductImages images={post?.images}/> */}
{window.innerWidth >640 ? <ProductImages images = {post?.images}/>:<ImageShower images = {post?.images}/>}
    
     <div onClick={()=>setIsMenu(false)} className='w-full mb-20 '>
          <h6  className='mb-3 px-2'>Score:</h6>
        <div className='w-full '>

{post?.voteFields?.map((field : any ,index : number)=>{
    return <div key={index} className='score px-2 mb-1'>
              
                <div className=''>
                <div className='overall w-full h-6 flex items-center justify-between  relative'>
                    <h3   className='z-10 ml-2'>{field}:</h3>
                    <h3 >45%</h3>
                    <div className='ber w-[56%] h-full bg-[#1d1d1d] absolute top-0'></div>
                </div>
                </div>
            </div>
            
})}

            <div className='score'>
                
                      <div className=''>
                <div className='overall px-2 w-full h-6 flex items-center justify-between  relative'>
                    <h3  style={{color : 'black'}} className='z-10 ml-2'>Overall</h3>
                    <h3 >45%</h3>
                    <div className='ber w-[56%] h-full bg-white absolute top-0'></div>
                </div>
                </div>
            </div>
        </div>
<div className='tabs  mt-6'>
    <div className='flex px-3 gap-7'>
{['Community members' , 'Others'].map((el , i)=>{
    return <h6 key={i} style={{opacity :currentIndex === i ? 1 : 0.66}} typeof='button' onClick={()=> setCurrentIndex(i)}>{el}</h6>
})}
</div>
<div className='w-full border-t  border-[#4d4d4d] h-1.5 caro'>
    <div style={{transform : `translate(${currentIndex*174}px)` }} className='bg-white duration-300 w-20 h-full
    '></div>
    </div>

</div>


<div className='votes mt-4 border-b border-[#4d4d4d] relative w-screen lg:w-[30vw] max-h-100 h-[50vh] overflow-x-hidden overflow-y-scroll'>
<div  style={{transform : `translate(-${currentIndex*30}vw)`}} className='h-50  duration-300 w-[200vw] lg:w-[60vw]  flex'>
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
        <Image onClick={()=> router.push(`/${vote.user.handle}`)} height = {100} width = {100} alt  = 'profile pic' src={vote.user.profile || '/image.png'} className = 'h-8 w-8 rounded-full object-cover'/>
        <h3 >@{vote.user.handle}</h3>
    </div>
    <h3 >Designer</h3>
</div>
<h6>8</h6>
</div>

<div style={{opacity : openIndex === i ? 1 : 0}} className='details duration-300 delay-200 mt-2 px-10 w-full '>

<div className='justify-between w-full flex'>
        <p className='mb-1'>Creativity:</p>
        <p>{vote.creativity}</p>
    </div>
<div className='justify-between w-full flex'>
        <p className='mb-1'>Aesthetics:</p>
        <p>{vote.aesthetics}</p>
    </div>
<div className='justify-between w-full flex'>
        <p className='mb-1'>Composition:</p>
        <p>{vote.composition}</p>
    </div>
<div className='justify-between w-full flex'>
        <p className='mb-1'>Emotion:</p>
        <p>{vote.emotion}</p>
    </div>
  <div className='w-full flex justify-between'><h3>Overall</h3><h3>{8.8}</h3></div>
</div>
  
 </div>
   })}
</div>
</div>
    </div>
    <div className='h-50 w-[30vw] bg-[#353535]'></div>

</div>
</div>

<div className='other-detais  px-2 mt-10'>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h6>madeby:</h6><h6>{post?.createdBy?.handle}</h6></div>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h6>posted:</h6><h6>{post?.createdAt}</h6></div>
    <div className='w-full px-2 border-b-[0.5] py-0.5 border-[#4d4d4d] flex justify-between'><h6>typeof:</h6><h6>{post?.category}</h6></div>

</div>

</div>




            
            </div>: <Loading/>}
        </div>
    )
}

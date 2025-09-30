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
import RelatedPosts from './ReletedPosts'
import RelatedToCatagoty from './RelatedToCatatory'
import DynamicOverlay from './DynamicOverlay'
import Header from './Header'
import HighlightInfoOfPost from './HighlightInfoOfPost'
import ScoreBoard from './ScoreBoard'
import ListOfVotes from './ListOfVotes'
import PostMeta from './PostMeta'
import DynamicPanelWrapper from './DynamicPanelWrapper'

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
interface PostProps {
  catchedPost?: any
  catchedVotes?: any
}

export default function Post({ catchedPost, catchedVotes }: PostProps) {
    const dispatch = useDispatch<AppDispatch>()
  
    const [isVoteMenu , setVoteMenu] = useState(false)

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
    const {rdxPost, rdxVotes, loading} = useSelector((state : any)=>state.posts)
    const [panelY, setPanelY] = useState(40);
    console.log(panelY)  
    console.log(rdxPost)
    console.log(post)
    const searchParams = useSearchParams();
     const pid = searchParams.get('pid')
         const postInPath = usePathname().split('/')[2]
    const postId = pid || postInPath 
  
const scrollRef = useRef<HTMLDivElement>(null)
useEffect(() => {
  if (catchedPost || catchedVotes) {
    setPost(catchedPost)
    setVotes(catchedVotes)
  } else {
    console.log('api called')
    dispatch(getPostByIdAction(postId, token))
    dispatch(fetchVotesByPostAction(postId))
  }
}, [catchedPost, catchedVotes, postId, token, dispatch])

// watch redux store updates
useEffect(() => {
  if (rdxPost) setPost(rdxPost)
  if (rdxVotes) setVotes(rdxVotes)
}, [rdxPost, rdxVotes])


// console.log('catched post is:', catchedPost)

  const {assetsOfPost} = useSelector((state: any)=>state.attach)
        useEffect(()=>{
              dispatch(getAssetsOfPost(postId , token))
        },[dispatch, token, postId])

 
const validVotes = votes?.filter(vote => vote.user) || [];

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

       <DynamicOverlay  scrollRef={scrollRef}/>
        </section>
       <Header isLightMode={isLightMode} setIsMenu={setIsMenu}/> 
        <ImageShower style={{ height: `${panelY+10}vh`, minHeight : '40vh' ,  transition: 'height 0.2s ease' }}  setIsMenu={setIsMenu}  name ={post?.name} amount = {post?.amount} isMobile={isMobile} images = {post?.images}/>
      <DynamicPanelWrapper
        initialStep={2}
  onTranslateYChange={(y) => setPanelY(y)} // <--- crucial
      >
     <aside id='main' onClick={()=>setIsMenu(false)} className={`w-full h-fit lg:border-l -translate-y-4 sticky top-0 z-[100]  lg:mt-24 rounded-t-[10px] lg:rounded-t-none   ${isLightMode ? 'bg-white border-t border-[#dadada]':'bg-black'} lg:h-screen  lg:w-[30vw] `}>
<Attachments  assetsOfPost={assetsOfPost} setAttachmentsMenu={setAttachmentsMenu} postId={post?._id} token={token}/>

<HighlightInfoOfPost isLightMode={isLightMode} postName={post?.name} validVotes={validVotes}/>
<ScoreBoard isLightMode={isLightMode} post={post} validVotes={validVotes}/>
<Vote fieldOfVote={post?.voteFields} existingVote = {existingVote} postId={post?._id} token={user?.token} />
<ListOfVotes setVoteMenu={setVoteMenu} isMobile={isMobile} isLightMode={isLightMode} validVotes={validVotes} post={post} />
<PostMeta isLightMode={isLightMode} post= {post}/>
<RelatedPosts postId = {postId} handle={post?.createdBy?.handle} token={token} />
<RelatedToCatagoty catagory={post?.category} postId={postId} />
</aside>
          
        </DynamicPanelWrapper>


            
            </div>: <Loading/>}
        </div>
    )
}
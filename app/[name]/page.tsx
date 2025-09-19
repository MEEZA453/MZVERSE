'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Notification from '../Components/Notification'
import { AppDispatch } from '../store/store'
import  Loading from '../Components/loading'
import {useAuth } from '../Context/AuthContext'
import { useDispatch  ,useSelector } from 'react-redux'
import { IoMenuOutline } from "react-icons/io5";
import Image from 'next/image'
// import { getFavorites } from '../store/actions/fav'
import { getUserByHandle } from '../store/actions/profile'
import { MdOutlineAttachFile } from "react-icons/md";
import Favourites from '../Components/Favourites'
import { current } from '@reduxjs/toolkit'
import { FiInstagram } from 'react-icons/fi'
import ProfileMenu from '../Components/ProfileMenu'
import Store from '../Components/Store'
import Crafts from '../Components/Crafts'
import { AnimatePresence } from 'framer-motion'
import { followUser, getFollowingByHandle } from '../store/actions/follow'
import { unfollowUser } from '../store/actions/follow'
import HighlightControl from '../Components/HighlightControl'
import Promotion from '../Components/Promotion'
import ProfileMenuLg from '../Components/ProfileMenuLg'
import { getNotifications } from '../store/actions/notification'
import { VscMail } from 'react-icons/vsc'
import FollowersList from '../Components/FollowersList'
import FollowingList from '../Components/FollowingList'
export default function Account() {
const dispatch = useDispatch<AppDispatch>();
const {profileLink ,  authorId , handle , role , token} = useAuth()
const pathname = usePathname();
const userHandle = pathname.split('/').pop();
const [profileMenu , setProfileMenu] = useState(false) 
  const [activeIndex, setActiveIndex] = useState(2)

const [isMobile , setIsMobile ] = useState(false)
const [followerWindow , setFollowerWindow] = useState(false)
const [followingWindow , setFollowingWindow] = useState(false)
const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter()

useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])

  //  useEffect(() => {
  //   if (token) {
  //     dispatch(getFavorites(token));
  //   }

    const { items } = useSelector((state: any) => state.notification);
     useEffect(() => {
    if (token) {
      dispatch(getNotifications(token));
    }
  }, [dispatch, token]);

    const hasUnread = items.some((n) => !n.isRead);

useEffect(() => {
  if (userHandle && token) {
    
    dispatch(getUserByHandle(userHandle, token));
  }
}, [userHandle, token , dispatch]);

  
  const { profile, loading } = useSelector((state: any) => state.profile);
  console.log(profile)
const { following} = useSelector((state: any) => state.follow);

// Compute if current viewed user is followed
const viewedUserId = profile?.user?._id; // ID of the user being viewed


// Fetch following list for logged-in user
useEffect(() => {
  if (handle && token) {
    dispatch(getFollowingByHandle(handle));
  }
}, [handle, token , dispatch]);

// Handle follow/unfollow click
useEffect(() => {
  if (viewedUserId) {
    setIsFollowing(following.some((f: any) => f._id === viewedUserId));
  }
}, [viewedUserId, following]);

const handleFollowClick = () => {
  if (!viewedUserId) return;

  if (isFollowing) {
    setIsFollowing(false); // instant update
    dispatch(unfollowUser(viewedUserId, token));
  } else {
    setIsFollowing(true); // instant update
    dispatch(followUser(profile?.user, token));
  }
};
const handleShareClick =  async () => {
      if (!profile?.user?.handle) {
        alert("Profile link not available yet");
        return;
      }

      const profileLink = window.location.origin + '/' + profile?.user?.handle;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `${profile?.user?.name}'s Profile`,
            text: `Check out this profile!`,
            url: profileLink,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(profileLink);
          alert('Profile link copied to clipboard!');
        } catch (err) {
          alert('Failed to copy link.');
        }
      }
    }
const buttonsOfAuthor = [
  {
    name: 'Edit profile',
    origin: () => window.location.href = window.location.origin + '/profile'
  },
  {
    name: 'Share profile',
    origin: async () => {
      if (!profile?.user?.handle) {
        alert("Profile link not available yet");
        return;
      }

      const profileLink = window.location.origin + '/' + profile?.user?.handle;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `${profile?.user?.name}'s Profile`,
            text: `Check out this profile!`,
            url: profileLink,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(profileLink);
          alert('Profile link copied to clipboard!');
        } catch (err) {
          alert('Failed to copy link.');
        }
      }
    }
  }
];



    const buttonsOfNonAuthor= [{name : 'Follow', func : handleFollowClick},
    {name : 'Performance', origin : ()=> window.location.href = window.location.origin + '/'+ 'statistic'}
  ]

  const tabs = ['Store' , 'Moodboard' , 'Crafts' ]
  const isDev = true

const isProfileLoaded = profile && profile.user && profile.user.handle === userHandle;
    if(role === 'dev'){
    tabs.push('Highlight')
    tabs.push('promotion')
  }
  return (
    <div className='w-screen  overflow-hidden'>
  {!isProfileLoaded || loading ? <Loading/> : <div> 
      {/* <Notification/> */}
 <AnimatePresence>{ profileMenu ? isMobile ? <ProfileMenu setFollowingWindow ={setFollowingWindow} setFollowerWindow ={setFollowerWindow} role = {profile?.user?.role} setProfileMenu = {setProfileMenu}/>: <ProfileMenuLg setFollowingWindow ={setFollowingWindow} setFollowerWindow ={setFollowerWindow} role = {profile?.user?.role}  setProfileMenu = {setProfileMenu}/>:null}</AnimatePresence>

{ !isMobile && <div style={{opacity : followerWindow || followingWindow ? 1 : 0}} className='h-screen duration-300 w-screen z-[900] fixed top-0 pointer-events-none bg-black/60'></div>}
{ followerWindow &&  <FollowersList setFollowerWindow={setFollowerWindow} handle ={profile?.user?.handle}/>}
{ followingWindow &&  <FollowingList setFollowingWindow={setFollowingWindow} handle ={profile?.user?.handle}/>}

      <div className='profile relative flex  relative flex-col h-90   gap-3 mt-10 items-center justify-center w-screen'>
              <div className='absolute  flex-col gap-4 flex justify-between px-2 lg:right-[38vw] top-1 right-4 '>
{profile?.isUser&&<button onClick={()=>setProfileMenu(!profileMenu)} className='text-[20px] '>...</button>}
<button onClick={()=>profile?.user?.instagram} className='ml-0.5'><FiInstagram/></button>

             <button className=" relative text-white m duration-300"onClick={()=> router.push('/notification') }><VscMail size={20}/>
               {hasUnread && (
          <span className="absolute top-[2px] right-0 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
        )}
             </button>
      </div>
     
        <Image height = {300} width = {300}
          className='h-24 w-24 rounded-full bg-[#dadada] object-cover'
          src={profile?.user?.profile || '/image.png'}
          alt ='profile' 
        />
        <div className='flex items-center flex-col gap-0.5'>
          <h6>{profile?.user?.name}</h6>
      <p   style={{lineHeight : -0.3}}>@{profile?.user?.handle}</p>

        </div>
        <p  style={{fontSize : '13px', lineHeight : -1}}>{profile?.user?.bio}</p>
 
        { profile?.isUser?<div className='flex gap-1 mt-2 items-center justify-center px-5 w-screen'>
          { buttonsOfAuthor.map((tab , index)=>{
            return     <button  key={index} onClick={() => tab.origin()} className={`border  flex items-center justify-center   rounded text-[14px] lg:w-60 w-full py-0.5`}>{tab.name}</button>
          })}
     
        </div>:<div className='flex gap-1 mt-2 items-center justify-center px-5 w-screen'>
         <button   onClick={handleFollowClick} className={`border  flex items-center justify-center  ${!isFollowing ? 'bg-white text-black': 'text-white'}  rounded text-[14px] lg:w-60 w-full py-0.5`}>{!isFollowing ? 'Follow' : 'Unfollow'}</button>
           <button   onClick={handleShareClick} className={`border  flex items-center justify-center text-white  rounded text-[14px] lg:w-60 w-full py-0.5`}>Share profile</button>
        </div>}

       <div className='flex gap-2 mt-10  overflow-x-scroll hide-scrollbar px-3'>
        {tabs.map((tab  , i)=>{
          return <button onClick={()=>setActiveIndex(i)} className={`px-2 py-0.5 ${activeIndex === i ? 'bg-white text-black':'bg-[#2d2d2d] text-white'} flex items-center justify-center rounded-full text-[13px]`} key={i}>{tab}</button>
        })}
       </div>

        {/* Slider */}
    
      </div>

{ !loading ? <div className={`${isDev ? 'w-[500vw]':'w-[300vw] '} flex duration-500`}style={{transform :`translate(${-activeIndex*100}vw)`}}>

 <Store/>
 <Favourites/>
<Crafts/>
{isDev&&<HighlightControl/>}
  {isDev&&<Promotion/>}

 

</div>: <Loading/> }
</div>}

    </div>
  )
}

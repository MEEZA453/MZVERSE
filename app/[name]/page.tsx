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
import { getProductById  , getUserByHandle} from '../store/actions/auth'
import { MdOutlineAttachFile } from "react-icons/md";
import Favourites from '../Components/Favourites'
import { current } from '@reduxjs/toolkit'
import { FiInstagram } from 'react-icons/fi'
import ProfileMenu from '../Components/ProfileMenu'
import Store from '../Components/Store'
import Crafts from '../Components/Crafts'

export default function Account() {
const dispatch = useDispatch<AppDispatch>();
const {logout} = useAuth()
const pathname = usePathname();
const userHandle = pathname.split('/').pop();
const [token , setToken] = useState('')
const [profileMenu , setProfileMenu] = useState(false) 
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('profile')
      if (profile) {
        const parsedUser = JSON.parse(profile)
        setToken(parsedUser.token)
      }
    }
  }, [])

  
  //  useEffect(() => {
  //   if (token) {
  //     dispatch(getFavorites(token));
  //   }
  // }, [dispatch, token]);



useEffect(()=>{
  if (userHandle) dispatch(getUserByHandle(userHandle));
  }, [userHandle]);



const { user , loading } = useSelector((state: any) => state.auth);

console.log(user);

  const [activeIndex, setActiveIndex] = useState(1)
  const buttons = [{name : 'Edit profile', origin : ()=> window.location.href = window.location.origin + '/'+ 'profile'},
    {name : 'Performance', origin : ()=> window.location.href = window.location.origin + '/'+ 'statistic'}
  ]
  const tabs = ['Store' , 'Moodboard' , 'Crafts']

  return (
    <div className='w-screen overflow-hidden'>
      <Notification/>

{loading ? <Loading/> : <div> 
      <div className='profile relative flex  relative flex-col h-90 border-b  border-[#4d4d4d]  gap-3 mt-10 items-center justify-center w-screen'>
              <div className='absolute  flex-col gap-4 flex justify-between px-2 lg:right-[38vw] top-1 right-4 '>
<button onClick={()=>setProfileMenu(!profileMenu)} className='text-[20px]'>...</button>
<button onClick={()=>user?.instagram}><FiInstagram/></button>
      </div>
      { profileMenu ?<ProfileMenu/>:null}
        <Image height = {300} width = {300}
          className='h-24 w-24 rounded-full bg-[#dadada] object-cover'
          src={user?.profile || '/image.png'}
          alt ='profile' 
        />
        <div className='flex items-center flex-col gap-0.5'>
          <h6>{user?.name}</h6>
      <p   style={{lineHeight : -0.3}}>@{user?.handle}</p>

        </div>
        <p  style={{fontSize : '13px', lineHeight : -1}}>{user?.bio}</p>
 
        <div className='flex gap-1 mt-2 items-center justify-center px-5 w-screen'>
          {buttons.map((tab , index)=>{
            return     <button  key={index} onClick={() => tab.origin()} className={`border  flex items-center justify-center  ${index === 1 ? 'bg-white text-black': 'text-white'}  rounded text-[14px] lg:w-60 w-full py-0.5`}>{tab.name}</button>
          })}
     
        </div>

       <div className='flex gap-2 mt-10'>
        {tabs.map((tab  , i)=>{
          return <button onClick={()=>setActiveIndex(i)} className={`px-2 py-0.5 ${activeIndex === i ? 'bg-white text-black':'bg-[#2d2d2d] text-white'} flex items-center justify-center rounded-full text-[13px]`} key={i}>{tab}</button>
        })}
       </div>

        {/* Slider */}
    
      </div>

{ !loading ? <div className='w-[300vw] flex duration-500' style={{transform :`translate(${-activeIndex*100}vw)`}}>

 <Store/>
 <Favourites/>
<Crafts/>
 

</div>: <Loading/> }
</div>}

    </div>
  )
}

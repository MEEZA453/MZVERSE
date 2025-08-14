'use client'
import MasterNavber from "./Components/MasterNavber";
import InteractiveGrid from "./Components/InteractiveGrid"
import Notification from "./Components/Notification";
import JoinCommunityInput from "./Components/JoinCommunity";
import Login from "./Components/Login";
import {useEffect, useState} from 'react'
import { useShowInput } from "./Context/ShowInputContext";
import { useNotification } from "./Context/Notification";
import { useAuth } from "./Context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home(){
  const {isLoggedIn} = useAuth()
  const router = useRouter();
  const {setNotification} = useNotification()
const {showLoginInput , showSignupInput ,setShowLoginInput , setShowSignupInput}  = useShowInput()
useEffect(()=>{
setNotification('joinCommunity')
},[])
const handleClick = ()=>{
    window.location.href = isLoggedIn ?  window.location.origin +'/feed':window.location.origin +'/signup';
}
  return <div>
    <Notification/>
    {showSignupInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<JoinCommunityInput setShowSignupInput={setShowSignupInput}/>
</div>: null}
      <div className="bg-black/60 h-screen w-screen  px-3 z-[10] absolute flex flex-col gap-2 items-center max-sm:items-start justify-center ">
      <h1 >A Design achive for visual thinking.</h1>
      <button className='bg-white text-black text-[16px] rounded-[2px] px-2 py-1' onClick={handleClick}>Join now</button>
      </div>
 {showLoginInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<Login setShowLoginInput={setShowLoginInput}/>
</div>: null}
    <MasterNavber setShowLoginInput = {setShowLoginInput} setShowSignupInput = {setShowSignupInput}/>
    <InteractiveGrid/>

      </div>
}
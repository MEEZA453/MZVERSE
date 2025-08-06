'use client'
import MasterNavber from "./Components/MasterNavber";
import InteractiveGrid from "./Components/InteractiveGrid"
import Notification from "./Components/Notification";
import JoinCommunityInput from "./Components/JoinCommunity";
import Login from "./Components/Login";
import {useEffect, useState} from 'react'
import { useShowInput } from "./Context/ShowInputContext";
import { useNotification } from "./Context/Notification";
export default function Home(){
  const {setNotification} = useNotification()
const {showLoginInput , showSignupInput ,setShowLoginInput , setShowSignupInput}  = useShowInput()
useEffect(()=>{
setNotification('joinCommunity')
},[])
  return <div>
    <Notification/>
    {showSignupInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<JoinCommunityInput setShowSignupInput={setShowSignupInput}/>
</div>: null}
 {showLoginInput ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999]">
<Login setShowLoginInput={setShowLoginInput}/>
</div>: null}
    <MasterNavber setShowLoginInput = {setShowLoginInput} setShowSignupInput = {setShowSignupInput}/>
    <InteractiveGrid/>

      </div>
}